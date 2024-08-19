import{_ as s,c as n,o as a,N as e}from"./chunks/framework.255dec5c.js";const l="/personalBlogs/assets/1724057222261.ff734d04.png",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/Three.js 性能优化和实践建议.md"}'),p={name:"blogs/Three.js 性能优化和实践建议.md"},o=e(`<p>Three.js 是一个功能强大的 3D 引擎，用于创建 WebGL 应用。尽管它功能强大，但在复杂的 3D 场景中保持高性能是一个挑战。本文将分享一些在使用 Three.js 时的性能优化提示，帮助你提高应用的运行效率。</p><ol><li>使用 <code>stats.js</code> 监视性能</li></ol><hr><p>在进行任何优化之前，首先要监视应用的性能。<code>stats.js</code> 是一个简单而有效的工具，可以帮助你实时监视帧率（FPS）、每帧渲染所需时间（MS）和内存使用情况（MB）。</p><p>然后，可以在 Three.js 项目中使用它：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import Stats from &#39;three/examples/jsm/libs/stats.module.js&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const stats = new Stats();</span></span>
<span class="line"><span style="color:#A6ACCD;">stats.showPanel(0); // 显示面板 0: fps, 1: ms, 2: mb, 3+: custom</span></span>
<span class="line"><span style="color:#A6ACCD;">document.body.appendChild(stats.dom);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const tick = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  stats.begin();</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 监视的代码放在这里 或者可以使用stats.update()</span></span>
<span class="line"><span style="color:#A6ACCD;">  stats.end();</span></span>
<span class="line"><span style="color:#A6ACCD;">  requestAnimationFrame(tick);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">requestAnimationFrame(tick);</span></span></code></pre></div><p><strong>FPS</strong>：在最后一秒内渲染的帧数。数值越高越好。</p><p><strong>MS</strong>：渲染一帧所需的毫秒数。数值越低越好。</p><p><strong>MB</strong>：分配的内存大小（以兆字节为单位）。需要在 Chrome 中使用 <code>--enable-precise-memory-info</code> 启动。</p><p><strong>CUSTOM</strong>：用户自定义面板支持。</p><p><img src="`+l+`" alt="1724057222261"></p><ol start="2"><li>优化几何体和材质</li></ol><hr><p>复杂的几何体和高分辨率的材质会显著影响渲染性能。以下是一些优化建议：</p><p><strong>降低几何体细节</strong></p><p>使用 <code>THREE.LOD</code>（Level of Detail）类来根据摄像机距离动态切换几何体细节。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import * as THREE from &#39;three&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建场景和相机</span></span>
<span class="line"><span style="color:#A6ACCD;">const scene = new THREE.Scene();</span></span>
<span class="line"><span style="color:#A6ACCD;">const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);</span></span>
<span class="line"><span style="color:#A6ACCD;">camera.position.z = 10;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建渲染器</span></span>
<span class="line"><span style="color:#A6ACCD;">const renderer = new THREE.WebGLRenderer({</span></span>
<span class="line"><span style="color:#A6ACCD;">  antialias: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  powerPreference: &#39;high-performance&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">renderer.setSize(window.innerWidth, window.innerHeight);</span></span>
<span class="line"><span style="color:#A6ACCD;">renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));</span></span>
<span class="line"><span style="color:#A6ACCD;">document.body.appendChild(renderer.domElement);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建不同细节级别的几何体</span></span>
<span class="line"><span style="color:#A6ACCD;">const highDetailGeometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);</span></span>
<span class="line"><span style="color:#A6ACCD;">const mediumDetailGeometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);</span></span>
<span class="line"><span style="color:#A6ACCD;">const lowDetailGeometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用 LOD 动态切换几何体</span></span>
<span class="line"><span style="color:#A6ACCD;">const lod = new THREE.LOD();</span></span>
<span class="line"><span style="color:#A6ACCD;">lod.addLevel(new THREE.Mesh(highDetailGeometry, material), 0);</span></span>
<span class="line"><span style="color:#A6ACCD;">lod.addLevel(new THREE.Mesh(mediumDetailGeometry, material), 5);</span></span>
<span class="line"><span style="color:#A6ACCD;">lod.addLevel(new THREE.Mesh(lowDetailGeometry, material), 10);</span></span>
<span class="line"><span style="color:#A6ACCD;">scene.add(lod);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 动画循环</span></span>
<span class="line"><span style="color:#A6ACCD;">const animate = function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">  requestAnimationFrame(animate);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 旋转 LOD</span></span>
<span class="line"><span style="color:#A6ACCD;">  lod.rotation.x += 0.01;</span></span>
<span class="line"><span style="color:#A6ACCD;">  lod.rotation.y += 0.01;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 更新摄像机位置</span></span>
<span class="line"><span style="color:#A6ACCD;">  camera.position.x = Math.sin(Date.now() * 0.001) * 20;</span></span>
<span class="line"><span style="color:#A6ACCD;">  camera.position.z = Math.cos(Date.now() * 0.001) * 20;</span></span>
<span class="line"><span style="color:#A6ACCD;">  camera.lookAt(scene.position);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 渲染场景和相机</span></span>
<span class="line"><span style="color:#A6ACCD;">  renderer.render(scene, camera);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">animate();</span></span></code></pre></div><p><strong>使用压缩纹理</strong></p><p>使用压缩纹理格式（如 DDS、KTX2）来减少内存占用和加载时间。这里以 <code>KTX2</code> 为例。</p><p>首先，安装 <code>three/examples/jsm/loaders/KTX2Loader.js</code> 和 <code>Basisu</code> 解码器，然后，在你的项目中使用 <code>KTX2Loader</code> 加载压缩纹理：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { KTX2Loader } from &#39;three/examples/jsm/loaders/KTX2Loader.js&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { MeshStandardMaterial } from &#39;three&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建 KTX2Loader</span></span>
<span class="line"><span style="color:#A6ACCD;">const ktx2Loader = new KTX2Loader()</span></span>
<span class="line"><span style="color:#A6ACCD;">  .setTranscoderPath(&#39;path/to/basisu/transcoder/&#39;) // 设置 Basisu 解码器路径</span></span>
<span class="line"><span style="color:#A6ACCD;">  .detectSupport(renderer);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 加载 KTX2 压缩纹理</span></span>
<span class="line"><span style="color:#A6ACCD;">ktx2Loader.load(&#39;path/to/texture.ktx2&#39;, (texture) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const material = new MeshStandardMaterial({ map: texture });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  const geometry = new THREE.BoxGeometry(1, 1, 1);</span></span>
<span class="line"><span style="color:#A6ACCD;">  const mesh = new THREE.Mesh(geometry, material);</span></span>
<span class="line"><span style="color:#A6ACCD;">  scene.add(mesh);</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><p><strong>合并几何体</strong></p><p>将多个几何体合并为一个几何体，以减少绘制调用（draw call）的次数。使用 <code>BufferGeometryUtils</code> 合并几何体。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { BufferGeometryUtils } from &#39;three/examples/jsm/utils/BufferGeometryUtils.js&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建多个几何体</span></span>
<span class="line"><span style="color:#A6ACCD;">const geometries = [];</span></span>
<span class="line"><span style="color:#A6ACCD;">for (let i = 0; i &lt; 50; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  geometry.translate(</span></span>
<span class="line"><span style="color:#A6ACCD;">    (Math.random() - 0.5) * 10,</span></span>
<span class="line"><span style="color:#A6ACCD;">    (Math.random() - 0.5) * 10,</span></span>
<span class="line"><span style="color:#A6ACCD;">    (Math.random() - 0.5) * 10</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  geometries.push(geometry);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 合并几何体</span></span>
<span class="line"><span style="color:#A6ACCD;">const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);</span></span>
<span class="line"><span style="color:#A6ACCD;">const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });</span></span>
<span class="line"><span style="color:#A6ACCD;">const mesh = new THREE.Mesh(mergedGeometry, material);</span></span>
<span class="line"><span style="color:#A6ACCD;">scene.add(mesh);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 动画循环</span></span>
<span class="line"><span style="color:#A6ACCD;">const animate = function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">  requestAnimationFrame(animate);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 旋转合并后的几何体</span></span>
<span class="line"><span style="color:#A6ACCD;">  mesh.rotation.x += 0.01;</span></span>
<span class="line"><span style="color:#A6ACCD;">  mesh.rotation.y += 0.01;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 渲染场景和相机</span></span>
<span class="line"><span style="color:#A6ACCD;">  renderer.render(scene, camera);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">animate();</span></span></code></pre></div><ol start="3"><li>优化灯光和阴影</li></ol><hr><p>灯光和阴影计算开销较大，特别是多光源和动态阴影。以下是一些优化建议：</p><ul><li><strong>减少光源数量</strong>：尽量减少场景中的光源数量，选择性能开销较小的光源如 AmbientLight 和 DirectionalLight。</li><li><strong>优化阴影贴图</strong>：降低阴影贴图的分辨率，并限制阴影相机的视野范围，以减少计算开销。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 优化阴影贴图</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.mapSize.width = 1024; // 默认值是 512</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.mapSize.height = 1024; // 默认值是 512</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 限制阴影相机的视野范围</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.top = 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.right = 6;</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.left = -6;</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.bottom = -3;</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.near = 0.1;</span></span>
<span class="line"><span style="color:#A6ACCD;">directionalLight.shadow.camera.far = 10;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 可选：使用相机助手查看阴影相机的范围</span></span>
<span class="line"><span style="color:#A6ACCD;">const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);</span></span>
<span class="line"><span style="color:#A6ACCD;">scene.add(cameraHelper);</span></span></code></pre></div><ul><li><strong>静态光照贴图</strong>：对于静态场景，可以预先计算光照和阴影，生成光照贴图。这里我们使用 <code>Lightmap</code>，一个 Three.js 的扩展，可以帮助实现静态光照贴图。</li></ul><p>首先，安装 <code>three-lightmap</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install three-lightmap</span></span></code></pre></div><p>然后，在你的项目中使用 <code>three-lightmap</code> 来生成静态光照贴图：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { Lightmap } from &#39;three-lightmap&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建静态光照贴图</span></span>
<span class="line"><span style="color:#A6ACCD;">const lightmap = new Lightmap(scene, renderer, {</span></span>
<span class="line"><span style="color:#A6ACCD;">  mapSize: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">  samples: 4,</span></span>
<span class="line"><span style="color:#A6ACCD;">  bake: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  exposure: 0.7,</span></span>
<span class="line"><span style="color:#A6ACCD;">  softEdges: 0.01,</span></span>
<span class="line"><span style="color:#A6ACCD;">  aoOnly: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">  aoStrength: 0.6</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 在几何体上启用静态光照贴图</span></span>
<span class="line"><span style="color:#A6ACCD;">cube.material.lightMap = lightmap.generate(cube.geometry);</span></span>
<span class="line"><span style="color:#A6ACCD;">plane.material.lightMap = lightmap.generate(plane.geometry);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 运行一次性光照贴图烘焙过程</span></span>
<span class="line"><span style="color:#A6ACCD;">lightmap.bake();</span></span></code></pre></div><ol start="4"><li>纹理贴图</li></ol><hr><p>纹理贴图非常消耗 GPU 内存，以下是一些优化建议：</p><ul><li><strong>调整尺寸</strong>：调整纹理贴图的分辨率可以通过图像编辑工具（如 Photoshop、GIMP）或编程工具（如 Sharp for Node.js）来实现。在加载纹理时，可以使用 Three.js 内置的 <code>THREE.TextureLoader</code> 来加载已经调整好尺寸的纹理。</li><li><strong>使用正确格式</strong>：确保使用合适的文件格式（如 .jpg 或 .png）。可以使用在线工具如 <a href="https://link.zhihu.com/?target=https%3A//link.juejin.cn/%3Ftarget%3Dhttps%253A%252F%252Ftinypng.com%252F" target="_blank" rel="noreferrer">TinyPNG</a> 来压缩纹理文件，减小文件大小，同时保持较高的视觉质量。</li><li><strong>保持分辨率为 2 的幂次方</strong>：确保纹理尺寸为 2 的幂次方（如 256x256, 512x512, 1024x1024）。如果纹理的尺寸不是 2 的幂次方，Three.js 会自动调整它们，但这会影响性能。</li></ul><ol start="5"><li>使用对象池</li></ol><hr><p>在动画或游戏应用中，经常需要频繁创建和销毁对象。使用对象池可以有效减少内存分配和垃圾回收频繁的开销。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class ObjectPool {</span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(createFunc, size) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.createFunc = createFunc;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.pool = [];</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (let i = 0; i &lt; size; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.pool.push(this.createFunc());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  get() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.pool.length ? this.pool.pop() : this.createFunc();</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  release(obj) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.pool.push(obj);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ol start="6"><li>渲染器优化</li></ol><hr><p>以下是一些针对渲染器的优化建议：</p><ul><li><strong>限制像素比</strong>：一些设备有非常高的像素比，但渲染的像素越多，消耗的性能越大。将渲染器的像素比限制为 2：renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));</li><li><strong>配置偏好</strong>：指定 <code>powerPreference</code> 属性来提示用户代理适当的 GPU 配置：const renderer = new THREE.WebGLRenderer({powerPreference: &#39;high-performance&#39;});</li><li><strong>抗锯齿</strong>：只有在有明显锯齿且不会显著影响性能时才启用抗锯齿。 / 创建渲染器时启用抗锯齿 const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector(&#39;#canvas&#39;), antialias: true, // 启用抗锯齿 powerPreference: &#39;high-performance&#39; // 提示浏览器选择高性能的 GPU });</li></ul><ol start="7"><li>相机优化</li></ol><hr><p>通过缩小相机的视野范围（FOV）以及调整相机的 <code>near</code> 和 <code>far</code> 属性，可以显著减少渲染的对象数量，从而提高渲染性能。下面是具体的实现代码和逻辑说明。</p><p><strong>缩小相机的视野范围</strong></p><p>通过减少相机的视野角度（FOV），可以让屏幕中显示的对象更少，从而减少需要渲染的三角形数量。</p><p><strong>调整相机的近端面和远端面</strong></p><p>调整相机的 <code>near</code> 和 <code>far</code> 属性，可以确保只渲染特定范围内的对象，避免渲染不必要的远距离对象。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 调整相机的视野角度和近端面、远端面</span></span>
<span class="line"><span style="color:#A6ACCD;">const fov = 50; // 缩小视野角度（默认值通常为75）</span></span>
<span class="line"><span style="color:#A6ACCD;">const aspect = window.innerWidth / window.innerHeight;</span></span>
<span class="line"><span style="color:#A6ACCD;">const near = 1; // 将 near 属性从 0.1 增大到 1</span></span>
<span class="line"><span style="color:#A6ACCD;">const far = 50; // 将 far 属性从 100 缩小到 50</span></span>
<span class="line"><span style="color:#A6ACCD;">const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);</span></span>
<span class="line"><span style="color:#A6ACCD;">camera.position.z = 10;</span></span></code></pre></div><ol start="8"><li>清除不必要的对象</li></ol><hr><p>当场景中不再需要某个对象时，及时清除它：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 创建示例对象</span></span>
<span class="line"><span style="color:#A6ACCD;">const geometry = new THREE.BoxGeometry();</span></span>
<span class="line"><span style="color:#A6ACCD;">const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });</span></span>
<span class="line"><span style="color:#A6ACCD;">const cube = new THREE.Mesh(geometry, material);</span></span>
<span class="line"><span style="color:#A6ACCD;">scene.add(cube);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 在某个时刻移除对象</span></span>
<span class="line"><span style="color:#A6ACCD;">function removeObject(object) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 移除对象</span></span>
<span class="line"><span style="color:#A6ACCD;">  scene.remove(object);</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 释放几何体资源</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (object.geometry) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    object.geometry.dispose();</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 释放材质资源</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (object.material) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (Array.isArray(object.material)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 如果材质是数组，遍历并释放每个材质</span></span>
<span class="line"><span style="color:#A6ACCD;">      object.material.forEach((material) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        material.dispose();</span></span>
<span class="line"><span style="color:#A6ACCD;">      });</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 单一材质，直接释放</span></span>
<span class="line"><span style="color:#A6ACCD;">      object.material.dispose();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 释放纹理资源</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (object.material.map) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    object.material.map.dispose();</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// 在某个时刻调用函数移除对象</span></span>
<span class="line"><span style="color:#A6ACCD;">removeObject(cube);</span></span></code></pre></div><ol start="9"><li>后期处理和着色器优化</li></ol><hr><p><strong>限制后期处理通道</strong></p><p>每个后期处理过程都会增加渲染负担，尽量减少不必要的后期处理步骤。</p><p><strong>着色器优化</strong></p><ul><li><strong>指定精度</strong>：强制材质中着色器的精度：js复制代码 const shaderMaterial = new THREE.ShaderMaterial({precision: &#39;lowp&#39;});</li><li><strong>保持代码简单</strong>：尽量保持着色器代码简单，避免复杂的逻辑和多层嵌套。</li><li><strong>使用贴图纹理</strong>：尽量使用纹理来代替复杂的计算，例如噪声生成。</li><li><strong>使用 defines</strong>：对于不会改变的值，使用 <code>defines</code> 而不是 <code>uniform</code>： js 复制代码 const shaderMaterial = new THREE.ShaderMaterial({ defines: {uDisplacementStrength: 1.5}, });</li></ul><p>性能优化是一个持续的过程，需要根据具体的应用场景进行调整。以上提示可以帮助你在使用 Three.js 构建 3D 应用时提高性能。希望本文对你有所帮助！</p>`,65),t=[o];function c(r,i,C,A,y,d){return a(),n("div",null,t)}const h=s(p,[["render",c]]);export{m as __pageData,h as default};
