# Three.js 场景清理与资源释放

在使用Three.js创建复杂的3D场景时，随着应用的运行，内存中可能会积累大量的渲染资源，如网格、纹理、着色器等。为了保持应用的性能和防止内存泄漏，合理地清理和释放这些资源是非常重要的。本文将介绍如何使用Three.js清理场景和释放相关资源。

#### 场景清理的重要性

* **防止内存泄漏** ：在JavaScript中，如果不正确地管理资源，很容易产生内存泄漏。
* **提高性能** ：释放不再使用的资源可以减少内存占用，提高应用性能。
* **资源重用** ：清理后的场景可以重新用于新的渲染任务，避免重复加载资源。

#### 清理Three.js场景的步骤

 **1. 取消动画循环** ：
使用 `cancelAnimationFrame`取消所有正在进行的动画循环。

 **2. 清除场景中的所有对象** ：
遍历场景中的所有子对象，释放它们的几何体、材质和纹理。

 **3. 释放光照资源** ：
如果场景中包含光源，释放其相关资源，包括阴影贴图和摄像机。

 **4. 释放背景和环境贴图** ：
如果场景设置了背景或环境贴图，同样需要释放这些纹理资源。

 **5. 释放渲染器资源** ：
调用渲染器的 `dispose`方法，并强制渲染器丢失WebGL上下文。

 **6. 清理事件监听器** ：
移除所有附加到DOM上的事件监听器，防止内存泄漏。

 **7. 清理其他资源** ：
包括控制器、Tween动画、Websocket连接等。

```js
/**
 * 清除Three.js中的场景、渲染器和其他相关资源
 *
 * @param scene 要清除的场景对象
 * @param renderer 要清除的渲染器对象
 * @returns 返回一个Promise，表示清除操作是否成功
 */
function clearThreeData(scene, renderer) {
  return new Promise((resolve, reject) => {
    console.log(scene, renderer);

    // 清除循环
    cancelAnimationFrame(window.loopId);
    window.loopId = null;
    // 清除scene、renderer、TWEEN
    scene.traverse((child) => {
      if (child.material && child.material instanceof Array) {
        // 如果材质是数组，遍历销毁每个材质
        child.material.forEach((material) => {
          if (material.map) {
            material.map.dispose(); // 释放纹理
          }
          material.dispose(); // 释放材质
        });
      } else if (child.material) {
        child.material.dispose();
        if (child.material.map) {
          child.material.map.dispose();
        }
      }
      if (child.geometry) {
        child.geometry.dispose();
        child.geometry.attributes = null; // 这些属性包括position, normal, uv等等
      }

      // 销毁光照
      if (child.isLight) {
        if (child.shadow) {
          if (child.shadow.map) {
            child.shadow.map.dispose(); // 释放阴影贴图
          }
          child.shadow.camera = null; // 清除阴影摄像机引用
        }
        child.dispose(); // 如果存在 dispose 方法，调用它
      }
      child = null;
    });
    // 销毁背景纹理
    if (scene.background) {
      if (
        scene.background instanceof THREE.Texture ||
        scene.background instanceof THREE.CubeTexture
      ) {
        scene.background.dispose(); // 释放背景纹理
      }
      scene.background = null; // 清空 background 属性
    }

    // 销毁环境贴图
    if (scene.environment) {
      if (
        scene.environment instanceof THREE.Texture ||
        scene.environment instanceof THREE.DataTexture
      ) {
        scene.environment.dispose(); // 释放环境纹理
      }
      scene.environment = null; // 清空 environment 属性
    }
    let gl = renderer.domElement.getContext("webgl");
    gl && gl.getExtension("WEBGL_lose_context").loseContext();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement = null;
    renderer.content = null;
    scene.clear();
    scene = null;
    renderer = null;
    if (window.orbit) {
      window.orbit.dispose();
      window.orbit = null;
    }
    if (window.TWEEN) {
      const tweens = window.TWEEN.getAll();
      tweens.forEach((tween) => {
        tween.stop();
      });
      window.TWEEN.removeAll();
      window.TWEEN = null;
    }
    // 清除点击事件
    if (window.threeClickEvent) {
      document.removeEventListener("click", window.threeClickEvent);
      window.threeClickEvent = null;
    }
    // 清除移动事件
    if (window.threeMoveEvent) {
      document.removeEventListener("mousemove", window.threeMoveEvent);
      window.threeMoveEvent = null;
    }
    // 移除resize事件
    if (window.threeResizeEvent) {
      window.removeEventListener("resize", window.threeResizeEvent);
      window.threeResizeEvent = null;
    }
    // 关闭socket连接
    if (window.socket) {
      window.socket.close();
      window.socket = null;
    }

    resolve(true);
  });
}
```

#### 使用案例

使用 `clearThreeData`函数清理Three.js场景和资源：

```js
const myScene = new THREE.Scene();
const myRenderer = new THREE.WebGLRenderer();

// ... 场景设置和渲染代码 ...

// 当需要清理场景时调用
clearThreeData(myScene, myRenderer)
  .then(() => {
    console.log("场景和资源清理完成！");
  })
  .catch((error) => {
    console.error("清理过程中发生错误：", error);
  });
```


#### 结语

通过 `clearThreeData`函数，我们可以有效地清理Three.js场景中的资源，确保应用的内存使用得到合理管理。在开发大型多场景切换项目或长期运行的Three.js应用时，这一实践对于维护应用的稳定性和性能至关重要。
