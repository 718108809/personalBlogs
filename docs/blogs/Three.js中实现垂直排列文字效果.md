### Three.js中实现垂直排列文字效果

在Three.js中，除了创建常规的3D模型外，还可以使用其文本渲染功能来创建具有视觉效果的文字。本文将介绍如何实现垂直排列的文字效果，这种效果在制作滚动字幕、排行榜或任何需要纵向展示文字的场景中非常有用。

#### 创建垂直排列文字的步骤

**1. 使用TextGeometry创建文字几何体：**
TextGeometry是Three.js中用于创建基于文本的几何体的类。通过指定字体和其他属性，可以生成3D文字。

**2. 加载字体文件：**
使用Three.js的FontLoader加载字体文件，这是创建TextGeometry的前提。

**3. 设置文字属性：**
定义文字的大小、颜色、对齐方式等属性。

**4. 创建文字网格：**
使用TextGeometry和材质创建文字的网格（Mesh），使其成为3D场景中的对象。

**5. 垂直排列文字：**
通过调整每个文字网格的Y坐标，实现垂直排列的效果。

**6. 使用Promise管理异步加载：**
由于字体文件加载是异步的，使用Promise来处理加载完成后的逻辑。

#### 代码实现

以下是实现垂直排列文字效果的示例代码：

```js
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
/**
 * 创建垂直排列的文字
 *
 * @param param0 参数对象
 * @param param0.textArray 文字数组
 * @param param0.fontUrl 字体文件路径，默认为"./assets/three/fonts/FZYaoTi_Regular.json"
 * @param param0.textAttr 文字属性对象
 * @param param0.startY 起始Y坐标，默认为0
 * @param param0.spacing 文字间距，默认为6
 * @param param0.color 文字颜色，默认为"#666"
 * @returns 返回Promise对象，resolve参数为THREE.Group对象，包含所有文字网格
 */
function createVerticalText({
  textArray,
  fontUrl = "./assets/three/fonts/FZYaoTi_Regular.json",
  textAttr,
  startY = 0,
  spacing = 6,
  color = "#666",
}) {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    const textGroup = new THREE.Group();
    loader.load(fontUrl, function (font) {
      textArray.forEach((text, index) => {
        const textGeometry = new TextGeometry(text, {
          font: font,
          ...textAttr,
        });
        const textMesh = new THREE.Mesh(
          textGeometry,
          new THREE.MeshBasicMaterial({ color: color })
        );
        // 设置每个文字的位置，使其上下排列
        textMesh.position.y = startY - index * spacing;
        // 添加文字到场景
        textGroup.add(textMesh);
      });
      resolve(textGroup);
    });
  });
}
```


#### 使用案例

使用 `createVerticalText`函数创建垂直排列的文字，并将其添加到Three.js场景中：

```js
const textOption = {
  textArray: ["欢迎", "ONE", "TWO", "THREE"],
  fontUrl: "./assets/three/fonts/FZYaoTi_Regular.json",
  textAttr: {
    size: 1,
    height: 0.1,
  },
  startY: 50,
  spacing: 10,
  color: "#000",
};

createVerticalText(textOption).then((textGroup) => {
  scene.add(textGroup);
});
```
