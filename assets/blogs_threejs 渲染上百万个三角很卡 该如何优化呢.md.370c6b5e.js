import{_ as s,c as a,o as n,N as e}from"./chunks/framework.255dec5c.js";const y=JSON.parse('{"title":"threejs 渲染上百万个三角很卡 该如何优化呢","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/threejs 渲染上百万个三角很卡 该如何优化呢.md"}'),l={name:"blogs/threejs 渲染上百万个三角很卡 该如何优化呢.md"},p=e(`<h1 id="threejs-渲染上百万个三角很卡-该如何优化呢" tabindex="-1">threejs 渲染上百万个三角很卡 该如何优化呢 <a class="header-anchor" href="#threejs-渲染上百万个三角很卡-该如何优化呢" aria-label="Permalink to &quot;threejs 渲染上百万个三角很卡 该如何优化呢&quot;">​</a></h1><p>如果你在使用 Three.js 创建 3D 场景时遇到了性能瓶颈，不用担心！以下是一些常见的优化方案，可以帮助你提高场景性能。</p><h2 id="模型优化" tabindex="-1">模型优化 <a class="header-anchor" href="#模型优化" aria-label="Permalink to &quot;模型优化&quot;">​</a></h2><h3 id="_1-合并几何体" tabindex="-1">1. 合并几何体 <a class="header-anchor" href="#_1-合并几何体" aria-label="Permalink to &quot;1. 合并几何体&quot;">​</a></h3><p>一种常见的模型<a href="https://zhida.zhihu.com/search?q=%E4%BC%98%E5%8C%96%E6%8A%80%E6%9C%AF&amp;zhida_source=entity&amp;is_preview=1" target="_blank" rel="noreferrer">优化技术</a>是将多个几何体合并为一个几何体。这样可以减少渲染调用次数，从而提高性能。你可以使用<code>BufferGeometryUtils</code>库中的<code>mergeBufferGeometries</code>方法将多个几何体合并。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { BufferGeometryUtils } from &#39;three&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([geometry1, geometry2, geometry3]);</span></span></code></pre></div><h3 id="_2-减少几何体面数" tabindex="-1">2. 减少几何体面数 <a class="header-anchor" href="#_2-减少几何体面数" aria-label="Permalink to &quot;2. 减少几何体面数&quot;">​</a></h3><p>另一种常见的模型优化技术是减少几何体的面数。你可以使用 3D 建模软件或者 Three.js 中的<code>SimplifyModifier</code>来减少几何体的面数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { SimplifyModifier } from &#39;three/examples/jsm/modifiers/SimplifyModifier&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const modifier = new SimplifyModifier();</span></span>
<span class="line"><span style="color:#A6ACCD;">const simplifiedGeometry = modifier.modify(geometry, 0.5); // 50% 的面数</span></span></code></pre></div><h2 id="代码优化" tabindex="-1">代码优化 <a class="header-anchor" href="#代码优化" aria-label="Permalink to &quot;代码优化&quot;">​</a></h2><h3 id="_1-使用-webgl-渲染模式" tabindex="-1">1. 使用 WebGL 渲染模式 <a class="header-anchor" href="#_1-使用-webgl-渲染模式" aria-label="Permalink to &quot;1. 使用 WebGL 渲染模式&quot;">​</a></h3><p>默认情况下，Three.js 使用 WebGL <a href="https://zhida.zhihu.com/search?q=%E6%B8%B2%E6%9F%93%E6%A8%A1%E5%BC%8F&amp;zhida_source=entity&amp;is_preview=1" target="_blank" rel="noreferrer">渲染模式</a>来渲染场景。但是，有时候你可能会意外地使用了 Canvas 渲染模式。确保你的代码使用了 WebGL 渲染模式，可以有效地提高性能。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const renderer = new THREE.WebGLRenderer();</span></span></code></pre></div><h3 id="_2-批量渲染" tabindex="-1">2. 批量渲染 <a class="header-anchor" href="#_2-批量渲染" aria-label="Permalink to &quot;2. 批量渲染&quot;">​</a></h3><p>批量渲染是一种将多个物体一起渲染的技术，可以减少渲染调用次数。你可以使用<code>InstancedMesh</code>来实现批量渲染。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { InstancedMesh } from &#39;three&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const mesh = new InstancedMesh(geometry, material, count);</span></span></code></pre></div><h3 id="_3-使用-lod-细节层次" tabindex="-1">3. 使用 LOD（细节层次） <a class="header-anchor" href="#_3-使用-lod-细节层次" aria-label="Permalink to &quot;3. 使用 LOD（细节层次）&quot;">​</a></h3><p>使用 LOD（<a href="https://zhida.zhihu.com/search?q=%E7%BB%86%E8%8A%82%E5%B1%82%E6%AC%A1&amp;zhida_source=entity&amp;is_preview=1" target="_blank" rel="noreferrer">细节层次</a>）可以根据物体在场景中的距离来选择不同的模型细节级别。你可以使用<code>LOD</code>对象来实现 LOD 功能。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { LOD } from &#39;three&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const lod = new LOD();</span></span>
<span class="line"><span style="color:#A6ACCD;">lod.addLevel(mesh1, distance1);</span></span>
<span class="line"><span style="color:#A6ACCD;">lod.addLevel(mesh2, distance2);</span></span></code></pre></div><h3 id="_4-渲染模糊处理【像素比】" tabindex="-1">4. <strong>渲染模糊处理【像素比】</strong> <a class="header-anchor" href="#_4-渲染模糊处理【像素比】" aria-label="Permalink to &quot;4. **渲染模糊处理【像素比】**&quot;">​</a></h3><p>图像中的一个像素的宽度与高度之比，而<a href="https://zhida.zhihu.com/search?q=%E5%B8%A7%E7%BA%B5%E6%A8%AA%E6%AF%94&amp;zhida_source=entity&amp;is_preview=1" target="_blank" rel="noreferrer">帧纵横比</a>则是指图像的一帧的宽度与高度之比 js 中获取屏幕像素比：window.devicePixeRatio</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))</span></span></code></pre></div><h3 id="_5-屏幕适配" tabindex="-1">5. <strong>屏幕适配</strong> <a class="header-anchor" href="#_5-屏幕适配" aria-label="Permalink to &quot;5. **屏幕适配**&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">*@language js</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const sizes = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    width: window.rWidth,</span></span>
<span class="line"><span style="color:#A6ACCD;">    height: window.innerHeight</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">window.addEventListener(&#39;resize&#39;, () =&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 更新画布尺寸</span></span>
<span class="line"><span style="color:#A6ACCD;">    sizes.width = window.innerWidth;</span></span>
<span class="line"><span style="color:#A6ACCD;">    sizes.height = window.innerHeight;</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 更新相机参数</span></span>
<span class="line"><span style="color:#A6ACCD;">    camera.aspect = sizes.width / sizes.height;</span></span>
<span class="line"><span style="color:#A6ACCD;">    camera.updateProjectionMatrix();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 更新渲染尺寸</span></span>
<span class="line"><span style="color:#A6ACCD;">    renderer.setSize(sizes.width, sizes.height)</span></span>
<span class="line"><span style="color:#A6ACCD;">    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h3 id="_6-画布样式常见优化" tabindex="-1">6. <strong>画布样式常见优化</strong> <a class="header-anchor" href="#_6-画布样式常见优化" aria-label="Permalink to &quot;6. **画布样式常见优化**&quot;">​</a></h3><ul><li>threeJS 画布去除边框和轮廓</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">*@language css</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    margin: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    padding: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">* @language css</span></span>
<span class="line"><span style="color:#A6ACCD;">* @element canvas</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">.webgl</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    position: fixed;</span></span>
<span class="line"><span style="color:#A6ACCD;">    top: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    left: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    outline: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>删除任何【所有】滚动</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">* @language css</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">html,</span></span>
<span class="line"><span style="color:#A6ACCD;">body</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_7-全屏处理" tabindex="-1">7. <strong>全屏处理</strong> <a class="header-anchor" href="#_7-全屏处理" aria-label="Permalink to &quot;7. **全屏处理**&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 添加双击事件并判断是否全屏显示</span></span>
<span class="line"><span style="color:#A6ACCD;">window.addEventListener(&#39;dblclick&#39;, () =&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if(!fullscreenElement)</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if(canvas.requestFullscreen)</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            canvas.requestFullscreen()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        else if(canvas.webkitRequestFullscreen)</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            canvas.webkitRequestFullscreen()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    else</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if(document.exitFullscreen)</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            document.exitFullscreen()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        else if(document.webkitExitFullscreen)</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            document.webkitExitFullscreen()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h2 id="结论" tabindex="-1">结论 <a class="header-anchor" href="#结论" aria-label="Permalink to &quot;结论&quot;">​</a></h2><p>以上是一些常见的 <a href="https://zhida.zhihu.com/search?q=Three.js&amp;zhida_source=entity&amp;is_preview=1" target="_blank" rel="noreferrer">Three.js</a> 优化方案。当然，这里只是介绍了一些基础的技术，你还可以通过其他方式来进一步提高场景性能。希望这篇文章能帮助你更好地优化你的 Three.js 场景！</p>`,33),o=[p];function t(c,i,r,C,A,d){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{y as __pageData,m as default};
