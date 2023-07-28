import{_ as s,c as n,o as a,N as l}from"./chunks/framework.255dec5c.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/NProgress是什么.md"}'),p={name:"blogs/NProgress是什么.md"},o=l(`<p>NProgress是一个开源的进度条库，用于跟踪Web应用程序和API的加载进度。NProgress允许您在网页上显示一个进度条，其颜色和长度可以自定义，以便更好地显示加载进度。</p><p>NProgress的工作原理是在后台运行一个进度条计算器，它会不断更新进度条的进度。当应用程序或API完成加载时，进度条将自动更新为100%，表示加载完成。</p><p>NProgress适用于各种Web应用程序，包括Web服务、RESTful API和Vue.js应用程序。它支持Windows、Linux和Mac OS X等操作系统。</p><p>NProgress的GitHub地址为<a href="https://github.com/NoumanEelbuy/NProgress%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E5%9C%A8%E8%AF%A5%E9%A1%B9%E7%9B%AE%E7%9A%84GitHub%E4%BB%93%E5%BA%93%E4%B8%AD%E6%89%BE%E5%88%B0%E6%9C%80%E6%96%B0%E7%9A%84NProgress%E7%89%88%E6%9C%AC%E5%92%8C%E6%96%87%E6%A1%A3%E3%80%82" target="_blank" rel="noreferrer">https://github.com/NoumanEelbuy/NProgress，您可以在该项目的GitHub仓库中找到最新的NProgress版本和文档。</a></p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// npm</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">save nprogress</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//Yarn</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn add nprogress</span></span></code></pre></div><p>直接引入js、css或者通过cdn引入</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nprogress.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nprogress.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">/&gt;</span></span></code></pre></div><h2 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h2><p>方法调用start和done</p><p><code>start()</code>开启NProgress进度条 <code>done()</code>关闭NProgress进度条</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 使用方法</span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// — 显示进度条</span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">done</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// — 结束进度条</span></span></code></pre></div><p>通过调用 .set(n)来设置进度，n是0-1的数字</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0.0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// Sorta same as .start()</span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0.4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// — 设置百分比</span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1.0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// Sorta same as .done()</span></span></code></pre></div><p>使用<code>inc(n)</code>设置递增进度条，递增时永远不会到达100%，其中n为自设的递增值，如果不传入n，则将以随机量递增 ，这个方法永远不会让进度条达到100%</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">inc</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0.4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// — 增加一点点</span></span></code></pre></div><p>这将获得当前状态值并加0.4，直到状态为0.994</p><h4 id="获取状态值" tabindex="-1">获取状态值 <a class="header-anchor" href="#获取状态值" aria-label="Permalink to &quot;获取状态值&quot;">​</a></h4><p>使用<code>status()</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console.log(NProgress.status());</span></span></code></pre></div><h2 id="进度条配置" tabindex="-1">进度条配置 <a class="header-anchor" href="#进度条配置" aria-label="Permalink to &quot;进度条配置&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1. 通过 minimum 来修改最小百分比</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ minimum: 0.1 });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">2. 通过 ease(一个 CSS 中的 easing 值) 调整动画设置和速度 speed （毫秒ms）</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">​\`\`\`js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ ease: ‘ease’, speed: 500 });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">css缓动可取值：</span></span>
<span class="line"><span style="color:#A6ACCD;">- linear 动画从开始到结束保持相同的速度。</span></span>
<span class="line"><span style="color:#A6ACCD;">- ease 默认值。动画有一个缓慢的开始，然后加速，在结束之前又变慢。</span></span>
<span class="line"><span style="color:#A6ACCD;">- ease-in 动画有一个缓慢的开始。</span></span>
<span class="line"><span style="color:#A6ACCD;">- ease-out 动画有一个缓慢的结束。</span></span>
<span class="line"><span style="color:#A6ACCD;">- ease-in-out 动画有一个缓慢的开始和一个缓慢的结束。</span></span>
<span class="line"><span style="color:#A6ACCD;">- cubic-bezier(n,n,n,n) 在三次贝塞尔（cubic-bezier）函数中定义自己的值。</span></span>
<span class="line"><span style="color:#A6ACCD;">可以是从 0 到 1 之间的数字值。</span></span>
<span class="line"><span style="color:#A6ACCD;">- initial 设置该属性为它的默认值。请参阅 initial。</span></span>
<span class="line"><span style="color:#A6ACCD;">- inherit 从父元素继承该属性。请参阅 inherit。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">​\`\`\`js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">3. 关闭进度条步进，设置 trickle 为 false。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">​\`\`\`js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ trickle: false });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">4. 调整 trickleRate (每次步进增长多少) 和 trickleSpeed (步进间隔，单位毫秒ms)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">​\`\`\`js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">5. 禁用进度环，设置 showSpinner 为 false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">​\`\`\`js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ showSpinner: false });</span></span></code></pre></div><p>父容器：parent</p><p>指定此选项可更改父容器。（默认值：body)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">NProgress.configure({ parent: &#39;#container&#39; });</span></span></code></pre></div><p>进度条颜色改变</p><p>在使用start()函数前，改变样式的颜色：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">注意都要 增加 !important; 否则无效</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#nprogress .bar {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  background: #29d !important;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 22px !important;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>在vue中使用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// router/index.js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import { createWebHistory, createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import NProgress from &#39;nprogress&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import &#39;nprogress/nprogress.css&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress.configure({ showSpinner: false })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">router.beforeEach((to, from, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  NProgress.start()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  next()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">router.afterEach(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  NProgress.done()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>发送请求时中使用：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> axios </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">axios</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> NProgress </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nprogress</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nprogress/nprogress.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 进度条设置</span></span>
<span class="line"><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">configure</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">easing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ease-in-out</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">speed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">300</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">trickleSpeed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">300</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//创建axios的一个实例</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> instance </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//请求拦截器</span></span>
<span class="line"><span style="color:#A6ACCD;">instance</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">interceptors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//响应拦截器</span></span>
<span class="line"><span style="color:#A6ACCD;">instance</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">interceptors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//响应成功</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">done</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">NProgress</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">done</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> instance</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>以上两种使用情景仅展示<code>NProgress</code>用法，<a href="https://so.csdn.net/so/search?q=%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">路由配置</a>和<code>axios</code>请求封装不做展示</p><p><a href="https://ricostacruz.com/nprogress/" target="_blank" rel="noreferrer">NProgress官网</a>和<a href="https://github.com/rstacruz/nprogress#" target="_blank" rel="noreferrer">Github地址</a></p>`,35),e=[o];function t(c,r,i,y,C,D){return a(),n("div",null,e)}const g=s(p,[["render",t]]);export{F as __pageData,g as default};
