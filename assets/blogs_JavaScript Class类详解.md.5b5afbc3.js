import{_ as s,c as n,o as a,N as l}from"./chunks/framework.255dec5c.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/JavaScript Class类详解.md"}'),p={name:"blogs/JavaScript Class类详解.md"},e=l(`<blockquote><p>ECMAScript 6 提供了更接近传统语言的写法，新引入的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noreferrer">class</a>关键字具有正式定义类的能力。类（class）是ECMAScript中新的基础性语法糖结构，虽然ECMAScript 6类表面上看起来可以支持正式的面向对象编程，但实际上它背后使用的仍然是原型和构造函数的概念，让对象原型的写法更加清晰、更像面向对象编程的语法。</p></blockquote><h2 id="一、类的定义" tabindex="-1">一、类的定义 <a class="header-anchor" href="#一、类的定义" aria-label="Permalink to &quot;一、类的定义&quot;">​</a></h2><p>定义类也有两种主要方式：类声明和类表达式。这两种方式都使用class关键字加大括号：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 类声明</span></span>
<span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 类表达式</span></span>
<span class="line"><span style="color:#A6ACCD;">const TestPerson = class {}</span></span></code></pre></div><p>注意：<strong>函数声明</strong>和<strong>类声明</strong>之间的一个重要区别在于，函数声明会<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting" target="_blank" rel="noreferrer">提升</a>，类声明不会。需要先声明类，然后再访问它，否则就会出现<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError" target="_blank" rel="noreferrer">ReferenceError</a>，如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const test = new Person(); // ReferenceError: Person is not defined</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Person {}</span></span></code></pre></div><p>另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Block/Scripting" target="_blank" rel="noreferrer">块作用域</a>限制：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    function FunctionDeclaration () {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    class ClassDeclaration {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 使用var 声明</span></span>
<span class="line"><span style="color:#A6ACCD;">    var VarClass = class {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 使用let/const 声明</span></span>
<span class="line"><span style="color:#A6ACCD;">    let LetClass = class {}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(FunctionDeclaration) // FunctionDeclaration () {}</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(ClassDeclaration) // ReferenceError: ClassDeclaration is not defined</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(VarClass) // class {}</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(LetClass) // ReferenceError: letClass is not defined</span></span></code></pre></div><p>class 类完全可以看成构造函数的另一种写法，这种写法可以让对象的原型属性和函数更加清晰。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(typeof Person) // function</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(Person === Person.prototype.constructor) // true</span></span></code></pre></div><p>上面代码表明，类的数据类型就是函数，类本身就指向构造函数。</p><h2 id="二、类构造函数" tabindex="-1">二、类构造函数 <a class="header-anchor" href="#二、类构造函数" aria-label="Permalink to &quot;二、类构造函数&quot;">​</a></h2><p>constructor 方法是一个特殊的方法，这种方法用于创建和初始化一个由 <code>class</code>创建的对象。通过 new 关键字生成对象实例时，自动会调用该方法。一个类只能拥有一个名为constructor构造函数，不能出现多个，如果定义了多个constructor构造函数，则将抛出 一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError" target="_blank" rel="noreferrer">SyntaxError</a>错误。如果没有定义constructor构造函数，class 会默认添加一个空的constructor构造函数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 等于</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>使用new操作符实例化Person的操作等于使用new调用其构造函数。唯一可感知的不同之处就是，JavaScript解释器知道使用new和类意味着应该使用constructor函数进行实例化。</p><p>类必须使用 <code>new</code>调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 <code>new</code>也可以执行。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Person() // TypeError: Class constructor Test1 cannot be invoked without &#39;new&#39;</span></span></code></pre></div><p>使用new调用类的构造函数会执行如下操作。</p><ol><li>在内存中创建一个新对象；</li><li>这个新对象内部的[[Prototype]]指针被赋值为构造函数的prototype属性；</li><li>构造函数内部的this被赋值为这个新对象（即this指向新对象）；</li><li>执行构造函数内部的代码（给新对象添加属性）；</li><li>如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象；</li></ol><p>一起来看看下面例子：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Test1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;Test1 初始化&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Test2 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.test = &#39;通过初始化构造函数设置值&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 构造函数返回指定对象</span></span>
<span class="line"><span style="color:#A6ACCD;">const dataObj = { n: &#39;自定义实例对象&#39; }</span></span>
<span class="line"><span style="color:#A6ACCD;">class Test3 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.test = &#39;通过初始化构造函数设置值&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        return dataObj</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person();</span></span>
<span class="line"><span style="color:#A6ACCD;">const b = new Test1(); // Test1 初始化</span></span>
<span class="line"><span style="color:#A6ACCD;">const c = new Test2();</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(c.test) // 通过初始化构造函数设置值</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const d = new Test3();</span></span>
<span class="line"><span style="color:#A6ACCD;">d instanceof Test3; // false</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(d) // { n: &#39;自定义实例对象&#39; }</span></span></code></pre></div><p>类实例化时传入的参数会用作构造函数的参数。如果不需要参数，则类名后面的括号也是可选的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(args.length)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Test1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (test) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(arguments.length)</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.test = test || &#39;默认值&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 不传值 可以省略()</span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person // 0</span></span>
<span class="line"><span style="color:#A6ACCD;">const b = new Person(&#39;1&#39;, &#39;2&#39;) // 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const c = new Test1() // 0</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(c.test) // 默认值</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const d = new Test1(&#39;传入值&#39;) // 1</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(d.test) // 传入值</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const d = new Test1(&#39;1&#39;, &#39;2&#39;, &#39;3&#39;) // 3</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(d.test) // 1</span></span></code></pre></div><p>与立即调用函数表达式相似，类也可以立即实例化：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const a = new class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = text</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}(&#39;立即实例化类&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 立即实例化类</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(a); // Person</span></span></code></pre></div><h2 id="三、类的实例-、原型及类成员" tabindex="-1">三、类的实例 、原型及类成员 <a class="header-anchor" href="#三、类的实例-、原型及类成员" aria-label="Permalink to &quot;三、类的实例 、原型及类成员&quot;">​</a></h2><p>类的语法可以非常方便地定义应该存在于实例上的成员、应该存在于原型上的成员，以及应该存在于类本身的成员。</p><p>实例的属性除非显式定义在其本身（即定义在 <code>this</code>对象上），否则都是定义在原型上。</p><p>每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (x, y) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = new Number(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.x = x</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.y = y</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getText = () =&gt; {console.log(this.text)}</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    toString () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`\${this.x}, \${this.y}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const test1 = new Person(&#39;x&#39;, &#39;y&#39;), test2 = new Person(&#39;x2&#39;, &#39;y2&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test1.getText()) // Number {1}</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test2.getText()) // Number {1}</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test1.x, test1.y) // x  y</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test2.x, test2.y) // x2  y2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// console.log(test1.text === test2.text)  // false</span></span>
<span class="line"><span style="color:#A6ACCD;">// console.log(test1.getText === test2.getText)  // false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">test1.text = &#39;测试&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test1.getText()) // 测试</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test2.getText()) // Number {1}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">test1.toString() // x, y</span></span>
<span class="line"><span style="color:#A6ACCD;">test2.toString() // x2, y2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">test1.hasOwnProperty(&#39;x&#39;); // true</span></span>
<span class="line"><span style="color:#A6ACCD;">test1.hasOwnProperty(&#39;y&#39;); // true</span></span>
<span class="line"><span style="color:#A6ACCD;">test1.hasOwnProperty(&#39;getText&#39;); // true</span></span>
<span class="line"><span style="color:#A6ACCD;">test1.hasOwnProperty(&#39;toString&#39;); // false</span></span>
<span class="line"><span style="color:#A6ACCD;">test1.__proto__.hasOwnProperty(&#39;toString&#39;); // true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 类的实例共享同一个原型对象</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test1.__proto__ === test2.__proto__) // true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 也可以使用ES6提供的 Object.getPrototypeOf 来获取prototype </span></span>
<span class="line"><span style="color:#A6ACCD;">const test1Prototype = Object.getPrototypeOf(test1)</span></span>
<span class="line"><span style="color:#A6ACCD;">test1Prototype.myName = &#39;共享字段&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// test2 中也是能获取到</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(test2.myName) // 共享字段</span></span></code></pre></div><p>x、y、text和getText都是实例对象test1自身的属性，所以hasOwnProperty()方法返回true，而toString()是原型对象的属性（因为定义在Person类），所以hasOwnProperty()方法返回false，这些都与 ES5 的行为保持一致。</p><p>类的所有实例共享同一个原型对象。这也意味着，可以通过实例的 <code>__proto__</code>属性或Object.getPrototypeOf方法获取原型为“类”添加方法，这将会出现共享情况，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。</p><p>类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const symbolKey = Symbol(&#39;test&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    stringKey () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;stringKey&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    [symbolKey] () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;symbolKey&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    [&#39;calculation&#39; + &#39;1&#39;] () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;calculation&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.stringKey() // stringKey</span></span>
<span class="line"><span style="color:#A6ACCD;">a[symbolKey]() // symbolKey</span></span>
<span class="line"><span style="color:#A6ACCD;">a.calculation1() // calculation</span></span></code></pre></div><h3 id="getter-与-setter" tabindex="-1">getter 与 setter <a class="header-anchor" href="#getter-与-setter" aria-label="Permalink to &quot;getter 与 setter&quot;">​</a></h3><p>在 class 内部可以使用 get 与 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (test) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.test = test || &#39;默认值&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    get prop () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.test</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    set prop (value) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`setter prop value: \${value}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.test = value</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const p = new Person(&#39;1&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">p.prop // 1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">p.prop = &#39;2&#39; // setter prop value: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">p.prop // 2</span></span></code></pre></div><p>set函数和get函数是设置在属性的 Descriptor 对象上的,可以通过 Object.getOwnPrototyDescriptor 来获取指定属性的指定描述对象。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, &#39;prop&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;get&#39; in descriptor // true</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;set&#39; in descriptor // true</span></span></code></pre></div><h3 id="generator-方法" tabindex="-1">Generator 方法 <a class="header-anchor" href="#generator-方法" aria-label="Permalink to &quot;Generator 方法&quot;">​</a></h3><p>如果某个方法之前加上星号（<code>*</code>），就表示该方法是一个 Generator 函数:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.args = args;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  * generatorFun () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (let arg of this.args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      yield arg;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person(1,2,3,4);</span></span>
<span class="line"><span style="color:#A6ACCD;">const generatorNext = a.generatorFun().next</span></span>
<span class="line"><span style="color:#A6ACCD;">generatorNext() // {value: 1, done: false}</span></span>
<span class="line"><span style="color:#A6ACCD;">generatorNext() // {value: 2, done: false}</span></span>
<span class="line"><span style="color:#A6ACCD;">generatorNext() // {value: 3, done: false}</span></span>
<span class="line"><span style="color:#A6ACCD;">generatorNext() // {value: 4, done: false}</span></span>
<span class="line"><span style="color:#A6ACCD;">generatorNext() // {value: undefined, done: true}</span></span></code></pre></div><h3 id="this-指向" tabindex="-1">this 指向 <a class="header-anchor" href="#this-指向" aria-label="Permalink to &quot;this 指向&quot;">​</a></h3><p>类的方法内部如果含有 <code>this</code>，它默认指向类的实例。但是某些情况是指向当前执行环境；</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = &#39;1&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getText () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.getText() // 1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const {getText} = a</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// this 指向为undefined class 默认严格模式</span></span>
<span class="line"><span style="color:#A6ACCD;">getText() // TypeError: Cannot read properties of undefined (reading &#39;text&#39;)</span></span></code></pre></div><p>上面找不到 this 问题，<code>this</code>会指向该方法运行时所在的环境，因为 class 内部是严格模式，所以 this 实际指向的是 <code>undefined</code>。有两个方法解决当前问题：</p><p>第一、构造方法中绑定 <code>this</code>:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = &#39;1&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getText = this.getText.bind(this)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getText () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>第二、使用箭头函数:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = &#39;1&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getText = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>箭头函数内部的 <code>this</code>总是指向定义时所在的对象。</p><p>第三、使用proxy 在获取方法的时候自动绑定this:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function classProxy (target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const map = new Map()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 读取拦截配置, 只需要配置 get</span></span>
<span class="line"><span style="color:#A6ACCD;">    const hanlder = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        get(target, key) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            const val = Reflect.get(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 要获取的是函数执行, 如果不是函数就直接返回 val</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (typeof val !== &#39;function&#39;) return val</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            if (!map.has(val)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                // 使用 bind改变运行函数的 this为拦截的实例对象</span></span>
<span class="line"><span style="color:#A6ACCD;">                map.set(val, val.bind(target))</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">            return map.get(val)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    const proxy = new Proxy(target, hanlder)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = text</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getText () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.text)</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.text</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const person = classProxy(new Person(&#39;test&#39;))</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const { getText } = person</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">getText() // test</span></span></code></pre></div><h2 id="四、静态方法、静态属性及静态代码块" tabindex="-1">四、静态方法、静态属性及静态代码块 <a class="header-anchor" href="#四、静态方法、静态属性及静态代码块" aria-label="Permalink to &quot;四、静态方法、静态属性及静态代码块&quot;">​</a></h2><p>静态方法、静态属性及静态代码块(<a href="https://github.com/tc39/proposal-class-static-block" target="_blank" rel="noreferrer">proposal-class-static-block</a>)都是使用 <code>static</code>关键字定义的属性、方法或块只能 class 自己用，不能通过实例继承。</p><p>静态方法中的this 指向的是 当前类，而不是指向实例对象。静态属性是当前类自身的属性。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticProp = &#39;Person静态属性&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 通过 类名 获取</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`output: \${Person.staticProp}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        // 也可以通过 构造函数的属性</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.constructor.staticFun1()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticFun1 () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.staticFun2()</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`output: 静态方法staticFun1,获取Person静态属性 ==&gt; \${Person.staticProp}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticFun2 () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`output: 静态方法staticFun2,获取静态属性 ==&gt; \${this.staticProp}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Person.staticProp // 静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Person.staticFun1() </span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态方法staticFun2,获取静态属性 Person静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态方法staticFun1,获取Person静态属性 ==&gt; Person静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person() // output: Person静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;">a.staticProp // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">a.staticFun1 // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">a.staticFun2 // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">// 通过其原型构造函数还是能获取到 这些静态属性及方法 不推荐使用</span></span>
<span class="line"><span style="color:#A6ACCD;">// a.__proto__.constructor.staticProp</span></span>
<span class="line"><span style="color:#A6ACCD;">// a.__proto__.constructor.staticFun1()</span></span></code></pre></div><h3 id="静态代码块" tabindex="-1">静态代码块： <a class="header-anchor" href="#静态代码块" aria-label="Permalink to &quot;静态代码块：&quot;">​</a></h3><p>是在 Class 内创建了一个块状作用域，这个作用域内拥有访问 Class 内部私有变量的特权，在这个代码块内部，可以通过 <code>this</code> 访问 Class 所有成员变量，包括 <code>#</code> 私有变量，且这个块状作用域仅在引擎调用时初始化执行一次 ，决解以前初始化静态类属性需要设置一个静态变量初始化逻辑。</p><p>注意： <code>static</code> 变量或代码块都按顺序执行，父类优先执行，一个类中允许多个静态代码块存在。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticProp = &#39;静态属性&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticPropArr = []</span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticPropObj = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    static getStatic (name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`获取：\${name}\`, name &amp;&amp; this[name])</span></span>
<span class="line"><span style="color:#A6ACCD;">        return name &amp;&amp; this[name]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static resetData (name, data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        name &amp;&amp; (this[name] = data)</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(\`重置：\${name}\`, name &amp;&amp; this[name])</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;静态代码块执行&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getStatic(&#39;staticProp&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getStatic(&#39;staticPropArr&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getStatic(&#39;staticPropObj&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        this.resetData(&#39;staticProp&#39;, &#39;重置静态属性&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.resetData(&#39;staticPropArr&#39;, [&#39;重置静态数组&#39;]);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.resetData(&#39;staticPropObj&#39;, { text: &#39;重置静态对象&#39; });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        this.staticPropObj.staticBlock1 = &#39;代码块中直接设置&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.staticPropObj)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">* 静态代码块执行</span></span>
<span class="line"><span style="color:#A6ACCD;">  获取：staticProp 静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;">  获取：staticPropArr []</span></span>
<span class="line"><span style="color:#A6ACCD;">  获取：staticPropObj {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  重置：staticProp 重置静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;">  重置：staticPropArr [&#39;重置静态数组&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">  重置：staticPropObj {text: &#39;重置静态对象&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">  {text: &#39;重置静态对象&#39;, staticBlock1: &#39;代码块中直接设置&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">*/</span></span></code></pre></div><p>上面代码中可以看出，<code>static</code> 关键字后面不跟变量，而是直接跟一个代码块，就是 class static block 语法的特征，在这个代码块内部，可以通过 <code>this</code> 访问 Class 所有成员变量，包括 <code>#</code> 私有变量。</p><p>在这里提前使用一下私有变量，理论上 class 私有变量外部是访问不了的，但是有了静态代码块( *<em><strong><a href="https://link.zhihu.com/?target=https%3A//github.com/tc39/proposal-class-static-block" target="_blank" rel="noreferrer">class-static-block</a></strong></em> *)之后，我们可以将私有属性暴露给外部变量：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">let privateValue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">  #value</span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(x) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.#value = x</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  static {</span></span>
<span class="line"><span style="color:#A6ACCD;">    privateValue = (obj) =&gt; obj.#x;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export function getPrivateValue (obj) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return privateValue(obj)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 在另一个文件中 </span></span>
<span class="line"><span style="color:#A6ACCD;">import { Person, getPrivateValue } from &#39;xxx&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person(&#39;私有变量&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">getPrivateValue(a) // 私有变量</span></span></code></pre></div><p>其实class-static-block本质上并没有增加新功能，我们完全可以用普通静态变量代替，只是写起来很不自然，所以这个特性可以理解为对缺陷的补充，或者是语法完善，个人认为现在越来越像java。</p><h2 id="五、私有属性和私有方法" tabindex="-1">五、私有属性和私有方法 <a class="header-anchor" href="#五、私有属性和私有方法" aria-label="Permalink to &quot;五、私有属性和私有方法&quot;">​</a></h2><p>私有属性和私有方法，是只能在类的内部访问的方法和属性，外部不能访问，不可以直接通过 Class 实例来引用，其定义方式只需要在方法或属性前面添加 <code>#</code>。</p><p>私有属性：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #privateVar1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #privateVar2 = &#39;默认值&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.#privateVar1 = text || &#39;--&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this.#privateVar1)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getPrivateData1 (key) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 这里是获取不了的</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;传入key来获取私有变量：&#39;, this[key])</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;获取私有变量&#39;, this.#privateVar2, this.#privateVar1)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticGetPrivateData (person, key) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;静态方法获取私有变量：&#39;, person.#privateVar2, person.#privateVar1)                   </span></span>
<span class="line"><span style="color:#A6ACCD;">        // 下面是获取不到</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;静态方法传入key来获取私有变量：&#39;, person[key]) </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person() // 不传 默认 --</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: --</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.getPrivateData1(&#39;#privateVar1&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 传入key来获取私有变量：undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 获取私有变量：  默认值  --</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用静态方法</span></span>
<span class="line"><span style="color:#A6ACCD;">Person.staticGetPrivateData(a, &#39;#privateVar1&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态方法获取私有变量：  默认值  --</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态方法传入key来获取私有变量：undefined</span></span></code></pre></div><p>从上面代码中我们可以看到，私有变量是只能内部读取或写入，不能通过动态key读取（外部调用就会报错）</p><p>注意：在class 中 公共属性 test 与 #test 是两个完全不同的值；</p><p>私有方法：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #private;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.#private = &#39;私有变量&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.#methods() // 调用私有方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #methods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;私有方法#methods:&#39;, this.#private)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static #staticMethods (person) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (person) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;静态私有方法#staticMethods person获取值&#39;, person.#private)</span></span>
<span class="line"><span style="color:#A6ACCD;">            person.#methods()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    init1 () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.#methods()</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;使用this&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        Person.#staticMethods(this)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    init2 (person) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (person) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;使用传入实例&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            Person.#staticMethods(person)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Person()</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 私有方法#methods: 私有变量</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// a.#methods()  SyntaxError</span></span>
<span class="line"><span style="color:#A6ACCD;">// a[&#39;#methods&#39;]()  TypeError: a.#methods is not a function</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.init1()</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 私有方法#methods: 私有变量</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 使用this</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态私有方法#staticMethods person获取值 私有变量</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 私有方法#methods: 私有变量</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.init2(a)</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 使用传入实例</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 静态私有方法#staticMethods person获取值 私有变量</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: 私有方法#methods: 私有变量</span></span></code></pre></div><p>从上面代码中我们可以看到，私有方法只能内部调用，在外部调用就会报错。</p><h2 id="六、继承-extends" tabindex="-1">六、继承 extends <a class="header-anchor" href="#六、继承-extends" aria-label="Permalink to &quot;六、继承 extends&quot;">​</a></h2><p>使用 extends 关键字，让子类继承父类的属性和方法。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    num = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    text = &#39;person&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getNum = () =&gt; console.log(this.num, this)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    addNum () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(++this.num, this)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 继承</span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        super()</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.getText()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    getText = () =&gt; console.log(this.text, this)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Child() // output: person  Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(a instanceof Child) // output: true</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(a instanceof Person) // output: true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.getText() // output: person Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;">a.getNum() // output: 1 Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;">a.addNum() // output: 2 Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;">a.getNum() // output: 2 Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.text // person</span></span>
<span class="line"><span style="color:#A6ACCD;">a.num // 2</span></span></code></pre></div><p>从上面代码中，我们可以看出Child 类 继承了 Person 的属性及方法，在Child 中也是可以调用Person的方法及属性，注意 this 的值会反映调用相应方法的实例或者类。子类中（Child）如果设置了 constructor 方法 就必须调用 super() ，否则就会出现新建实例时报错，如果没有 constructor 构造函数，在实例化继承类时会调用 super() ，而且会传入所有传给继承类的参数（后面会详细讲解）。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticText = &#39;staticText&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #private = &#39;private&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticMethods1 (person) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;staticMethods1&#39;, this)</span></span>
<span class="line"><span style="color:#A6ACCD;">        person.#privateMethods()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #privateMethods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;#privateMethods&#39;, this)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用表达式格式 也是可以使用 extends 继承</span></span>
<span class="line"><span style="color:#A6ACCD;">const Child = class extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;methods&#39;, Child.staticText)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Child()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">a.methods() // output: methods staticText</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Child.staticMethods1(a)</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: staticMethods1  class Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: #privateMethods Child {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Person.staticMethods1(a)</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: staticMethods1  class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;">// output: #privateMethods Child {}</span></span></code></pre></div><p>使用表达式格式 也是可以使用 extends 继承，类 的静态方法与属性是可以继承的，其私有属性及方法是不能继承的，可以从继承的共有方法与静态方法 中获取其私有属性或调用其私有方法。</p><p><strong>super</strong> 关键字可以作函数使用，也可以作对象使用，但是其只能在继承类中使用，且只能在继承类的constructor 构造函数、实例方法和静态方法中使用。作为函数时是在 继承类的constructor 构造函数中使用，根据要求如果继承类中定义了constructor构造函数就必须要调用super方法(调用父类的constructor)，否则就会报错。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 如果不调用 super() 就会报错</span></span>
<span class="line"><span style="color:#A6ACCD;">        // ReferenceError: Must call super constructor in derived class before accessing &#39;this&#39; or returning from derived constructor  </span></span>
<span class="line"><span style="color:#A6ACCD;">        super() // 调用父级的constructor</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this) // Child {}  </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>注意： constructor() 中必须super() 顶部首段执行代码，否则也是一样报错；</p><p>在使用 super() 时应该注意下面几个问题：</p><ol><li><p>super只能在继承类构造函数和静态方法中使用。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () { </span></span>
<span class="line"><span style="color:#A6ACCD;">        // 在非继承类 的constructor 中使用super 会报错</span></span>
<span class="line"><span style="color:#A6ACCD;">        super() //  SyntaxError: &#39;super&#39; keyword unexpected here</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    methods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(super.text) // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticMethods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(super.text) // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div></li><li><p>不能单独引用super关键字，要么用它调用构造函数，要么用它引用静态方法。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        super // SyntaxError: &#39;super&#39; keyword unexpected here</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    methods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(super) // SyntaxError: &#39;super&#39; keyword unexpected here</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    static staticMethods () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(super) // SyntaxError: &#39;super&#39; keyword unexpected here</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div></li><li><p>调用super()会调用父类构造函数，并将返回的实例赋值给this</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        super()</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(this instanceof Person) // output: true</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">new Child()</span></span></code></pre></div></li><li><p>super() 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = text</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        super(text)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 这里注意 其text 会设置到Child 中</span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Child(&#39;设置 text&#39;) // Child { text: &#39;设置 text&#39; }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(a.text) // output: 设置 text</span></span></code></pre></div></li><li><p>如果没有定义类构造函数，在实例化继承类时会调用super()，而且会传入所有传给继承类的参数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor (text) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.text = text</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child extends Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Child(&#39;设置 text&#39;); // Child { text: &#39;设置 text&#39; }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 上面提到过 会默认 生成 constructor (...arge) {super(...arge)}</span></span></code></pre></div></li><li><p>在类构造函数中，不能在调用super()之前引用this，文章上面已经有案例及说明。</p></li><li><p>如果在继承类中显式定义了构造函数，则要么必须在其中调用super()，要么必须在其中返回一个对象。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods () {}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child1 extends Person {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child2 extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        super()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Child3 extends Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const a = new Child1() // Child1 {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const b = new Child2() // Child2 {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const c = new Child3() // {} 指向 实例函数 返回的对象</span></span></code></pre></div><p>关于JS Class 相关就介绍到这里，当然还有 Class的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes#mix-ins_%E6%B7%B7%E5%85%A5" target="_blank" rel="noreferrer">mix-ins</a> 混入及其他class相关知识，这边就不详细介绍了，有兴趣的同学可以自己去了解一下。</p><p>文章内容参考了 <a href="https://book.douban.com/subject/35175321/" target="_blank" rel="noreferrer">《JavaScript高级程序设计》(第4版) https://book.douban.com/subject/35175321/</a></p></li></ol>`,85),o=[e];function t(c,r,C,i,A,y){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{d as __pageData,u as default};
