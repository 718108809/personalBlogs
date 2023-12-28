# 关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用

首先来看下 `THREE.WebGLRenderer`可以设置的参数如下：

```javascript
var renderer = new THREE.WebGLRenderer({ //创建渲染器对象
    // canvas: document.getElementById('can3d'), //渲染器绘制其输出的画布，
    alpha: false, // 画布是否包含alpha（透明度）缓冲区。默认值为false。
    premultipliedAlpha: true, //渲染器是否会假设颜色具有 预乘alpha。默认为true。
    antialias: true, //是否执行抗锯齿。默认值为false。
    preserveDrawingBuffer: true, //是否保留缓冲区直到手动清除或覆盖。默认值为false。
    depth: true, //绘图缓冲区是否具有至少16位的 深度缓冲区。默认为true。
    autoClear: true, //定义渲染器是否应在渲染帧之前自动清除其输出。
    //以上为基础配置选项。
    //以下为高级进阶调渲染后期
    gammaFactor: 0.5, //伽马基础值
    gammaInput: true, //如果设置，那么它期望所有纹理和颜色都是预乘伽马。默认值为false。
    gammaOutput: true, //如果设置，那么它期望所有纹理和颜色需要以预乘伽马输出。默认值为false。
    shadowMap: null, //如果使用，它包含阴影贴图的引用。
    physicalCorrectLights: true, //是否使用物理上正确的照明模式。默认值为false。
    toneMapping: 0.5, //曝光值
    toneMappingExposure: 1, //色调映射的曝光级别。默认值为1。
    renderLists: [], //在内部用于处理场景对象渲染的排序
    sortObjects: true //定义渲染器是否应对对象进行排序。默认为true。
})
```

遇到的问题：加载完模型，效果看起来太白了，在设置模型渲染的曝光值 `toneMapping`时不起作用
![1701052154530](image/关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用/1701052154530.png)
在查阅许多资料后都没能有效的解决此问题，于是就在不经意间发现一个 `ReinhardToneMapping`属性，巧妙地利用编辑工具代码提示的功能有效的解决的问题。
![1701052168968](image/关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用/1701052168968.png)
设置模型的曝光值需要这样写：

```javascript
renderer.toneMapping = THREE.ReinhardToneMapping //曝光值 默认为2 值为整型 [1 - 2]
```

如果需要调整曝光值可以这样写：

```javascript
THREE.ReinhardToneMapping = 1
renderer.toneMapping = THREE.ReinhardToneMapping
```

代码：

```javascript
var container = document.getElementById('threed') //获取渲染容器
var renderer = new THREE.WebGLRenderer({ antialias: true }) //创建渲染器对象
renderer.domElement.id = 'can3d'
renderer.setSize(width, height) //渲染大小
renderer.toneMapping = THREE.ReinhardToneMapping //曝光值
container.appendChild(renderer.domElement) //将模型添加到指定容器内
```

调整后的效果，高亮的地方是暗下来了，但整个模型也暗了，这时调整模型的灯光、环境光就可以了，好吧！效果看起来依然很丑，但是 是有效果的，需要自己根据需求慢慢调试。
![1701052180825](image/关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用/1701052180825.png)
