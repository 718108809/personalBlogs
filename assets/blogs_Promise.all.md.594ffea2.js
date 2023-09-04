import{_ as s,c as n,o as a,N as e}from"./chunks/framework.255dec5c.js";const l="/personalBlogs/assets/1692350752127.7a75b706.png",p="/personalBlogs/assets/1692350772235.d528e6ca.png",D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/Promise.all.md"}'),o={name:"blogs/Promise.all.md"},t=e('<p>Hello，大家好！</p><p><img src="'+l+`" alt="1692350752127"></p><p>Javascrript 中 Promise 是一个非常强大的 api，帮助我们处理异步操作。</p><p>Promise.all 作为能够聚合一些列 promises 将异步操作带到了一个新的高度。</p><p>换句话说，我们可以说 Promise.all 帮助我们进行并发操作。</p><h2 id="预备知识" tabindex="-1"><strong>预备知识：</strong> <a class="header-anchor" href="#预备知识" aria-label="Permalink to &quot;**预备知识：**&quot;">​</a></h2><p>我们必须首先了解 Javascript 中 <strong>「Promise」</strong> 是什么？</p><h2 id="什么是-promise-all" tabindex="-1"><strong>什么是 Promise.all</strong> <a class="header-anchor" href="#什么是-promise-all" aria-label="Permalink to &quot;**什么是 Promise.all**&quot;">​</a></h2><p>Promise.all 实际上是一个函数，它接受一个 promises 数组并返回一个 Promise。然后当所有的 promises 都完成时会得到 resolve 或者当其中一个被拒绝时会得到 rejected。</p><p>例如：假设有十个 promises（执行网络请求或数据库操作），必须知道所有的 promises 何时得到解决，或者必须等到所有的 promises 得到解决。所以，我们可以将十个 promises 传入 Promise.all 中，然后当十个 promises 都被完成或当十个 promises 中任何一个发生错误 Promise.all 会得到一个 resolved 或者 rejected.</p><p><strong>「让我们看看代码：」</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Promise.all([Promise1, Promise2, Promise3])</span></span>
<span class="line"><span style="color:#A6ACCD;"> .then(result) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">   console.log(result)</span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span>
<span class="line"><span style="color:#A6ACCD;"> .catch(error =&gt; console.log(\`Error in promises \${error}\`))</span></span></code></pre></div><p>可以看到，我们像 Promise.all 传入了一个数组，当数组中的三个 promises 都完成时，Promise.all 才能完成并输出 <code>console</code> 中内容。</p><p><strong>「让我看看例子：」</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// A simple promise that resolves after a given time</span></span>
<span class="line"><span style="color:#A6ACCD;">const timeOut = (t) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      resolve(\`Completed in \${t}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, t)</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// Resolving a normal promise.</span></span>
<span class="line"><span style="color:#A6ACCD;">timeOut(1000)</span></span>
<span class="line"><span style="color:#A6ACCD;"> .then(result =&gt; console.log(result)) // Completed in 1000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// Promise.all</span></span>
<span class="line"><span style="color:#A6ACCD;">Promise.all([timeOut(1000), timeOut(2000)])</span></span>
<span class="line"><span style="color:#A6ACCD;"> .then(result =&gt; console.log(result)) // [&quot;Completed in 1000&quot;, &quot;Completed in 2000&quot;]</span></span></code></pre></div><p>上述例子中，Promise.all 在 2000ms 后完成，并且在控制台输出了一个数组。</p><p>有趣的是 Promise.all 接受的数组参数中的 promises 是按照顺序执行的，数组中的第一个 promise 会首先执行，第二个 promise 将会第二个执行，以此类推。</p><p><strong>「看看其他的例子：」</strong></p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// A simple promise that resolves after a given time</span></span>
<span class="line"><span style="color:#A6ACCD;">const timeOut = (t) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      resolve(\`Completed in \${t}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, t)</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const durations = [1000, 2000, 3000]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const promises = []</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">durations.map((duration) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // In the below line, two things happen.</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 1. We are calling the async function (timeout()). So at this point the async function has started and enters the &#39;pending&#39; state.</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 2. We are pushing the pending promise to an array.</span></span>
<span class="line"><span style="color:#A6ACCD;">  promises.push(timeOut(duration)) </span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(promises) // [ Promise { &quot;pending&quot; }, Promise { &quot;pending&quot; }, Promise { &quot;pending&quot; } ]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// We are passing an array of pending promises to Promise.all</span></span>
<span class="line"><span style="color:#A6ACCD;">// Promise.all will wait till all the promises get resolves and then the same gets resolved.</span></span>
<span class="line"><span style="color:#A6ACCD;">Promise.all(promises)</span></span>
<span class="line"><span style="color:#A6ACCD;">.then(response =&gt; console.log(response)) // [&quot;Completed in 1000&quot;, &quot;Completed in 2000&quot;, &quot;Completed in 3000&quot;]</span></span></code></pre></div><p>从上面的例子可以很明显的看出，Promise.all 一直能到所有的 promises 都完成为止。</p><p>让我们看看如果一个 promise 没完成会发生什么：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// A simple promise that resolves after a given time</span></span>
<span class="line"><span style="color:#A6ACCD;">const timeOut = (t) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (t === 2000) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        reject(\`Rejected in \${t}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolve(\`Completed in \${t}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, t)</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const durations = [1000, 2000, 3000]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const promises = []</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">durations.map((duration) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  promises.push(timeOut(duration)) </span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// We are passing an array of pending promises to Promise.all</span></span>
<span class="line"><span style="color:#A6ACCD;">Promise.all(promises)</span></span>
<span class="line"><span style="color:#A6ACCD;">.then(response =&gt; console.log(response)) // Promise.all cannot be resolved, as one of the promises passed got rejected.</span></span>
<span class="line"><span style="color:#A6ACCD;">.catch(error =&gt; console.log(\`Error in executing \${error}\`)) // Promise.all throws an error.</span></span></code></pre></div><p>我们可以看到，如果 promises 中一个失败了的话，那么所有其他的 promises 也会失败，然后 Promise.all 会得到 rejected。</p><p>在某些情况下，我们需要所有的 promises 即使在某个失败了，我们也能稍后处理失败的 promises。</p><p>让我们看看如何处理它：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const durations = [1000, 2000, 3000]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">promises = durations.map((duration) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return timeOut(duration).catch(e =&gt; e) // Handling the error for each promise.</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Promise.all(promises)</span></span>
<span class="line"><span style="color:#A6ACCD;">  .then(response =&gt; console.log(response)) // [&quot;Completed in 1000&quot;, &quot;Rejected in 2000&quot;, &quot;Completed in 3000&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">  .catch(error =&gt; console.log(\`Error in executing \${error}\`))</span></span></code></pre></div><h2 id="promise-all-应用实例" tabindex="-1"><strong>Promise.all 应用实例</strong> <a class="header-anchor" href="#promise-all-应用实例" aria-label="Permalink to &quot;**Promise.all 应用实例**&quot;">​</a></h2><p>加入要执行大量的异步操作，如向上千万的用户发送营销电子邮件。</p><p>简单的伪代码如下：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">for (let i=0;i&lt;50000; i += 1) {</span></span>
<span class="line"><span style="color:#A6ACCD;"> sendMailForUser(user[i]) // Async operation to send a email</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>上述的例子很简单，但是效果却不是很好。如此运行代码，会使得在某个时间点，堆栈变得沉重。Javascript 将有大量的 HTTP 链接，这可能会导致服务器宕机。</p><p>很简单的完成上述任务，我们可以分批次执行，先发送给 500 个用户，然后等待完成后在执行后续操作。</p><p>让我们看看代码：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Async function to send mail to a list of users.</span></span>
<span class="line"><span style="color:#A6ACCD;">const sendMailForUsers = async (users) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const usersLength = users.length</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let i = 0; i &lt; usersLength; i += 100) { </span></span>
<span class="line"><span style="color:#A6ACCD;">    const requests = users.slice(i, i + 100).map((user) =&gt; { // The batch size is 100. We are processing in a set of 100 users.</span></span>
<span class="line"><span style="color:#A6ACCD;">      return triggerMailForUser(user) // Async function to send the mail.</span></span>
<span class="line"><span style="color:#A6ACCD;">       .catch(e =&gt; console.log(\`Error in sending email for \${user} - \${e}\`)) // Catch the error if something goes wrong. So that it won&#39;t block the loop.</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    // requests will have 100 or less pending promises. </span></span>
<span class="line"><span style="color:#A6ACCD;">    // Promise.all will wait till all the promises got resolves and then take the next 100.</span></span>
<span class="line"><span style="color:#A6ACCD;">    await Promise.all(requests)</span></span>
<span class="line"><span style="color:#A6ACCD;">     .catch(e =&gt; console.log(\`Error in sending email for the batch \${i} - \${e}\`)) // Catch the error.</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sendMailForUsers(userLists)</span></span></code></pre></div><p>另一种应用场景是：当我们不得不构建一个从多个第三方获取信息并汇总来自这些 API 的响应的 API 时，Promise.all 是一个完美的方法去解决这个问题。让我们看看如何实现：</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Function to fetch Github info of a user.</span></span>
<span class="line"><span style="color:#A6ACCD;">const fetchGithubInfo = async (url) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(\`Fetching \${url}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">  const githubInfo = await axios(url) // API call to get user info from Github.</span></span>
<span class="line"><span style="color:#A6ACCD;">  return {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: githubInfo.data.name,</span></span>
<span class="line"><span style="color:#A6ACCD;">    bio: githubInfo.data.bio,</span></span>
<span class="line"><span style="color:#A6ACCD;">    repos: githubInfo.data.public_repos</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// Iterates all users and returns their Github info.</span></span>
<span class="line"><span style="color:#A6ACCD;">const fetchUserInfo = async (names) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const requests = names.map((name) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const url = \`https://api.github.com/users/\${name}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    return fetchGithubInfo(url) // Async function that fetches the user info.</span></span>
<span class="line"><span style="color:#A6ACCD;">     .then((a) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return a // Returns the user info.</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Promise.all(requests) // Waiting for all the requests to get resolved.</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">fetchUserInfo([&#39;sindresorhus&#39;, &#39;yyx990803&#39;, &#39;gaearon&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;"> .then(a =&gt; console.log(JSON.stringify(a)))</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/*</span></span>
<span class="line"><span style="color:#A6ACCD;">Output:</span></span>
<span class="line"><span style="color:#A6ACCD;">[{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;Sindre Sorhus&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;bio&quot;: &quot;Full-Time Open-Sourcerer ·· Maker ·· Into Swift and Node.js &quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;repos&quot;: 996</span></span>
<span class="line"><span style="color:#A6ACCD;">}, {</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;Evan You&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;bio&quot;: &quot;Creator of @vuejs, previously @meteor &amp; @google&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;repos&quot;: 151</span></span>
<span class="line"><span style="color:#A6ACCD;">}, {</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;Dan Abramov&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;bio&quot;: &quot;Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;repos&quot;: 232</span></span>
<span class="line"><span style="color:#A6ACCD;">}]</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span></code></pre></div><h2 id="结束语" tabindex="-1"><strong>结束语</strong> <a class="header-anchor" href="#结束语" aria-label="Permalink to &quot;**结束语**&quot;">​</a></h2><p>Promise.all 是将一组 promises 聚合的最佳实现方式。这是在 javascript 中实现并发的一种方法。</p><p>希望你能喜欢这片文章！</p><p>那么，拜拜了，下次见。886</p><p><img src="`+p+'" alt="1692350772235"></p>',41),r=[t];function i(c,C,A,u,m,y){return a(),n("div",null,r)}const d=s(o,[["render",i]]);export{D as __pageData,d as default};
