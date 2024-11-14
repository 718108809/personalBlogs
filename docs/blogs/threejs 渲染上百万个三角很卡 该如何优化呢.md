# threejs 渲染上百万个三角很卡 该如何优化呢

如果你在使用 Three.js 创建 3D 场景时遇到了性能瓶颈，不用担心！以下是一些常见的优化方案，可以帮助你提高场景性能。

模型优化
--------------------------------------------------------------------------------------------------------------

### 1. 合并几何体

一种常见的模型[优化技术](https://zhida.zhihu.com/search?q=%E4%BC%98%E5%8C%96%E6%8A%80%E6%9C%AF&zhida_source=entity&is_preview=1)是将多个几何体合并为一个几何体。这样可以减少渲染调用次数，从而提高性能。你可以使用`BufferGeometryUtils`库中的`mergeBufferGeometries`方法将多个几何体合并。

```
import { BufferGeometryUtils } from 'three';

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([geometry1, geometry2, geometry3]);

```

### 2. 减少几何体面数

另一种常见的模型优化技术是减少几何体的面数。你可以使用 3D 建模软件或者 Three.js 中的`SimplifyModifier`来减少几何体的面数。

```
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';

const modifier = new SimplifyModifier();
const simplifiedGeometry = modifier.modify(geometry, 0.5); // 50% 的面数

```

代码优化
----

### 1. 使用 WebGL 渲染模式

默认情况下，Three.js 使用 WebGL [渲染模式](https://zhida.zhihu.com/search?q=%E6%B8%B2%E6%9F%93%E6%A8%A1%E5%BC%8F&zhida_source=entity&is_preview=1)来渲染场景。但是，有时候你可能会意外地使用了 Canvas 渲染模式。确保你的代码使用了 WebGL 渲染模式，可以有效地提高性能。

```
const renderer = new THREE.WebGLRenderer();

```

### 2. 批量渲染

批量渲染是一种将多个物体一起渲染的技术，可以减少渲染调用次数。你可以使用`InstancedMesh`来实现批量渲染。

```
import { InstancedMesh } from 'three';

const mesh = new InstancedMesh(geometry, material, count);

```

### 3. 使用 LOD（细节层次）

使用 LOD（[细节层次](https://zhida.zhihu.com/search?q=%E7%BB%86%E8%8A%82%E5%B1%82%E6%AC%A1&zhida_source=entity&is_preview=1)）可以根据物体在场景中的距离来选择不同的模型细节级别。你可以使用`LOD`对象来实现 LOD 功能。

```
import { LOD } from 'three';

const lod = new LOD();
lod.addLevel(mesh1, distance1);
lod.addLevel(mesh2, distance2);

```

### 4. **渲染模糊处理【像素比】**

图像中的一个像素的宽度与高度之比，而[帧纵横比](https://zhida.zhihu.com/search?q=%E5%B8%A7%E7%BA%B5%E6%A8%AA%E6%AF%94&zhida_source=entity&is_preview=1)则是指图像的一帧的宽度与高度之比 js 中获取屏幕像素比：window.devicePixeRatio  

```
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

```

### 5. **屏幕适配**

```
/**
*@language js
*/

const sizes = {
    width: window.rWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // 更新画布尺寸
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // 更新相机参数
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // 更新渲染尺寸
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

```

### 6. **画布样式常见优化**

*   threeJS 画布去除边框和轮廓

```
/**
*@language css
*/
*
{
    margin: 0;
    padding: 0;
}
/**
* @language css
* @element canvas
*/
.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}

```

*   删除任何【所有】滚动

```
/**
* @language css
*/
html,
body
{
    overflow: hidden;
}

```

### 7. **全屏处理**

```
// 添加双击事件并判断是否全屏显示
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

```

结论
--

以上是一些常见的 [Three.js](https://zhida.zhihu.com/search?q=Three.js&zhida_source=entity&is_preview=1) 优化方案。当然，这里只是介绍了一些基础的技术，你还可以通过其他方式来进一步提高场景性能。希望这篇文章能帮助你更好地优化你的 Three.js 场景！
