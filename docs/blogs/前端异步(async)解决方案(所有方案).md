# 前端异步(async)解决方案(所有方案)

javascript是一门单线程语言,即一次只能完成一个任务,若有多个任务要执行,则必须排队按照队列来执行(前一个任务完成,再执行下一个任务)。

这种模式执行简单，但随着日后的需求，事务，请求增多，这种单线程模式执行效率必定低下。只要有一个任务执行消耗了很长时间，在这个时间里后面的任务就无法执行。常见的浏览器无响应(假死)，往往就是因为某一段Javascript代码长时间运行(比如死循环)，导致整个页面卡在这个地方，其他任务无法执行。(**弊端**)

为了解决这个问题，javascript语言将任务执行模式分成同步和异步:

**同步模式**：就是上面所说的一种执行模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的。

**异步模式**：就是每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

“异步模式”非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，”异步模式”甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。(**异步模式的重要性**)

![1699579483463](image/前端异步(async)解决方案(所有方案)/1699579483463.png)

下面就带来几种前端异步解决方案:

##### 一.传统方案

**1.回调函数(callback):**

异步编程的基本方法。

首先需要声明，回调函数只是一种实现，并不是异步模式特有的实现。回调函数同样可以运用到同步（阻塞）的场景下以及其他一些场景。

回调函数的定义:

**函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。**

生活举例:约会结束后你送你女朋友回家，离别时，你肯定会说：“到家了给我发条信息，我很担心你。” 然后你女朋友回家以后还真给你发了条信息。其实这就是一个回调的过程。你留了个参数函数（要求女朋友给你发条信息）给你女朋友，然后你女朋友回家，回家的动作是主函数。她必须先回到家以后，主函数执行完了，再执行传进去的函数，然后你就收到一条信息了。

案例:

```javascript
//定义主函数，回调函数作为参数
function A(callback) {
    callback();  
    console.log('我是主函数');  
}
 
//定义回调函数
function B(){
    setTimeout("console.log('我是回调函数')", 3000);//模仿耗时操作  
}
 
//调用主函数，将函数B传进去
A(B);
 
//输出结果
我是主函数
我是回调函数
```

上面的代码中，我们先定义了主函数和回调函数，然后再去调用主函数，将回调函数传进去。

定义主函数的时候，我们让代码先去执行callback()回调函数，但输出结果却是后输出回调函数的内容。这就说明了主函数不用等待回调函数执行完，可以接着执行自己的代码。所以一般回调函数都用在耗时操作上面。比如ajax请求，比如处理文件等。

**优点：**简单，容易理解和 部署。

**缺点:**不利于代码的阅读，和维护，各部分之间高度耦合，流程会很混乱，而且每一个任务只能指定一个回调函数。

**2.事件监听**

采用事件驱动模式。

任务的执行不取决代码的顺序，而取决于某一个事件是否发生。

**监听函数有：on，bind，listen，addEventListener，observe**

以f1和f2为例。首先，为f1绑定一个事件（采用jquery写法）。

```javascript
f1.on('done',f2);

```

上面代码意思是，当f1发生done事件，就执行f2。

然后对f1进行改写：

```javascript
function f1(){
   settimeout(function(){
      //f1的任务代码
     f1.trigger('done');  
   },1000);
}
```

f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2.

**优点:**比较容易理解，可以绑定多个事件，每一个事件可以指定多个回调函数，而且可以去耦合，有利于实现模块化。

**缺点:**整个程序都要变成事件驱动型，运行流程会变得不清晰。

**事件鉴定方法:**

**(1).onclick方法:**

```javascript
element.onclick=function(){
   //处理函数
}
```

**优点**：写法兼容到主流浏览器。

**缺点**：当同一个element元素绑定多个事件时，只有最后一个事件会被添加。

例如:

```javascript
element.onclick=handler1;
element.onclick=handler2;
element.onclick=handler3;
```

上诉只有handler3会被添加执行，所以我们使用另外一种方法添加事件。（2）attachEvent和addEvenListener方法

**(2).attachEvent和addEvenListener方法:**

```javascript
//IE:attachEvent（IE下的事件监听）
elment.attachEvent("onclick",handler1);
elment.attachEvent("onclick",handler2);
elment.attachEvent("onclick",handler3);
```

上述三个方法执行顺序：3-2-1；

```javascript
//标准addEventListener（标准下的监听）
elment.addEvenListener("click",handler1,false);
elment.addEvenListener("click",handler2,false);
elment.addEvenListener("click",handler3,false);>
```

执行顺序：1-2-3；

PS：该方法的第三个参数是冒泡获取(useCapture)，是一个布尔值：当为false时表示由里向外(事件冒泡)，true表示由外向里(事件捕获)。

```html
<div id="id1">
    <div id="id2"></div>
</div>
```

```javascript
document.getElementById("id1").addEventListener("click",function(){
	console.log('id1');
},false);
document.getElementById("id2").addEventListener("click",function({
  console.log('id2');
},false);
 //点击id=id2的div，先在console中输出，先输出id2，在输出id1

document.getElementById("id1").addEventListener("click",function({
	console.log('id1');
},false);
document.getElementById("id2").addEventListener("click",function({
	console.log('id2');
},true);
 //点击id=id2的div，先在console中输出，先输出id1，在输出id2
```

**(3).DOM方法addEventListener()和removeListenner():**

addEventListenner()和removeListenner()表示用来分配和删除事件的函数。这两种方法都需要三种参数，分别为：string（事件名称），要触发事件的函数function，指定事件的处理函数的时期或者阶段（boolean）。**例子见（2）**

**(4).通用的时间添加方法:**

```javascript
on:function(elment,type,handler){
   //添加事件
   return element.attachEvent？elment.attachEvent("on"+type,handler):elment.addEventListener(type,handler,false);
}
```

事件冒泡和事件捕获的区别,可以参考:

##### 二.工具方案

工具方案大致分为以下5个:

- Promise
- gengerator函数
- async await
- node.js中 nextTick setImmidate
- 第三方库 async.js

下面针对每一个做详细说明应用:

**1.Promise(重点)**

**(1).Promise的含义和发展:**

含义:Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。简单点说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。

发展:Promise 是异步编程的一种解决方案，比传统的解决方案–回调函数和事件－－更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了语法，原生提供了Promise

**(2).它的一般形式:**

```javascript
new Promise(
    /* executor */
    function(resolve, reject) {
        if (/* success */) {
            // ...执行代码
            resolve();
        } else { /* fail */
            // ...执行代码
            reject();
        }
    }
);
```

其中，Promise中的参数executor是一个执行器函数，它有两个参数**resolve**和**reject**。它内部通常有一些异步操作，如果异步操作成功，则可以调用resolve()来将该实例的状态置为**fulfilled**，即已完成的，如果一旦失败，可以调用reject()来将该实例的状态置为**rejected**，即失败的。

我们可以把Promise对象看成是一条工厂的流水线，对于流水线来说，从它的工作职能上看，它只有三种状态，一个是初始状态（刚开机的时候），一个是加工产品成功，一个是加工产品失败（出现了某些故障）。同样对于Promise对象来说，它也有三种状态：**pending:** 初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。 **fulfilled:**完成状态，意味着异步操作成功。

- **pending:**初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。
- **fulfilled:**完成状态，意味着异步操作成功。
- **rejected:**失败状态，意味着异步操作失败。

它只有两种状态可以转化，即

- **操作成功:**pending -> fulfilled
- **操作失败:**pending -> rejected

**注意:并且这个状态转化是单向的，不可逆转，已经确定的状态（fulfilled/rejected）无法转回初始状态（pending）。**

**(3).Promise对象的方法(api):**

**1):Promise.prototype.then(callback)**

Promise对象含有then方法，then()调用后返回一个Promise对象，意味着实例化后的Promise对象可以进行链式调用，而且这个then()方法可以接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数。

如下:

```javascript
var promise1 = new Promise(function(resolve, reject) {
  // 2秒后置为接收状态
  setTimeout(function() {
    resolve('success');
  }, 2000);
});

promise1.then(function(data) {
  console.log(data); // success
}, function(err) {
  console.log(err); // 不执行
}).then(function(data) {
  // 上一步的then()方法没有返回值
  console.log('链式调用：' + data); // 链式调用：undefined 
}).then(function(data) {
  // ....
});
```

在这里我们主要关注promise1.then()方法调用后返回的Promise对象的状态，是pending还是fulfilled，或者是rejected?

返回的这个Promise对象的状态主要是根据promise1.then()方法返回的值，大致分为以下几种情况：

1.如果then()方法中返回了一个参数值，那么返回的Promise将会变成接收状态。

2.如果then()方法中抛出了一个异常，那么返回的Promise将会变成拒绝状态。

3\. 如果then()方法调用resolve()方法，那么返回的Promise将会变成接收状态。

4\. 如果then()方法调用reject()方法，那么返回的Promise将会变成拒绝状态。

5.如果then()方法返回了一个未知状态(pending)的Promise新实例，那么返回的新Promise就是未知 状态。

6.如果then()方法没有明确指定的resolve(data)/reject(data)/return data时，那么返回的新Promise就是接收状态，可以一层一层地往下传递。

**2):Promise.prototype.catch(callback)**

catch()方法和then()方法一样，都会返回一个新的Promise对象，它主要用于捕获异步操作时出现的异常。因此，我们通常省略then()方法的第二个参数，把错误处理控制权转交给其后面的catch()函数，如下：

```javascript
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject('reject');
  }, 2000);
});

promise3.then(function(data) {
  console.log('这里是fulfilled状态'); // 这里不会触发
  // ...
}).catch(function(err) {
  // 最后的catch()方法可以捕获在这一条Promise链上的异常
  console.log('出错：' + err); // 出错：reject
});
```

**3):Promise.all()**

Promise.all()接收一个参数，它必须是可以迭代的，比如数组。

它通常用来处理一些并发的异步操作，即它们的结果互不干扰，但是又需要异步执行。它最终只有两种状态：成功或者失败。

指的是将数组中所有的任务执行完成之后， 才执行.then 中的任务

它的状态受参数内各个值的状态影响，即里面状态全部为fulfilled时，它才会变成fulfilled，否则变成rejected。

成功调用后返回一个数组，数组的值是有序的，即按照传入参数的数组的值操作后返回的结果。

如下：

```javascript
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(console.log('p1 任务1'))
  },1000)
})
  .then( data => {
    console.log('p1 任务2')
  })
  .then( res => {
    console.log('p1 任务3')
  })
  .catch( err =>{ throw err} )

const p2 = new Promise((resolve,reject)=>{
  resolve(console.log('p2 任务1'))
}).then(
  data => {
    console.log('p2 任务2')
  }
).catch(
  err => {
    throw err 
  }
)
//只有在p1,p2都执行完后才会执行then里的内容
Promise.all([p1,p2])
 .then(()=>console.log('done'))
```

**4):Promise.race()**

Promise.race()和Promise.all()类似，都接收一个可以迭代的参数，但是不同之处是Promise.race()的状态变化不是全部受参数内的状态影响，**一旦参数内有一个值的状态发生的改变，那么该Promise的状态就是改变的状态。就跟race单词的字面意思一样，谁跑的快谁赢**。如下：

```javascript
var p1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 300, 'p1 doned');
});

var p2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 50, 'p2 doned');
});

var p3 = new Promise(function(resolve, reject) {
  setTimeout(reject, 100, 'p3 rejected');
});

Promise.race([p1, p2, p3]).then(function(data) {
  // 显然p2更快，所以状态变成了fulfilled
  // 如果p3更快，那么状态就会变成rejected
  console.log(data); // p2 doned
}).catch(function(err) {
  console.log(err); // 不执行
});
```

**5):Promise.resolve()**

Promise.resolve()接受一个参数值，可以是普通的值，具有then()方法的对象和Promise实例。正常情况下，它返回一个Promise对象，状态为fulfilled。但是，当解析时发生错误时，返回的Promise对象将会置为rejected态。如下：

```javascript
// 参数为普通值
var p4 = Promise.resolve(5);
p4.then(function(data) {
  console.log(data); // 5
});

// 参数为含有then()方法的对象
var obj = {
  then: function() {
    console.log('obj 里面的then()方法');
  }
};

var p5 = Promise.resolve(obj);
p5.then(function(data) {
  // 这里的值时obj方法里面返回的值
  console.log(data); // obj 里面的then()方法
});

// 参数为Promise实例
var p6 = Promise.resolve(7);
var p7 = Promise.resolve(p6);

p7.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log(data); // 7
});

// 参数为Promise实例,但参数是rejected态
var p8 = Promise.reject(8);
var p9 = Promise.resolve(p8);

p9.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log('fulfilled:'+ data); // 不执行
}).catch(function(err) {
  console.log('rejected:' + err); // rejected: 8
});
```

**6):Promise.reject()**

Promise.reject()和Promise.resolve()正好相反，它接收一个参数值reason，即发生异常的原因。此时返回的Promise对象将会置为rejected态。如下：

```javascript
var p10 = Promise.reject('手动拒绝');
p10.then(function(data) {
  console.log(data); // 这里不会执行，因为是rejected态
}).catch(function(err) {
  console.log(err); // 手动拒绝
}).then(function(data) {
 // 不受上一级影响
  console.log('状态：fulfilled'); // 状态：fulfilled
});
```

总之，除非Promise.then()方法内部抛出异常或者是明确置为rejected态，否则它返回的Promise的状态都是fulfilled态，即完成态，并且它的状态不受它的上一级的状态的影响。

**2.gengerator函数**

在异步编程中，还有一种常用的解决方案，它就是Generator生成器函数。顾名思义，它是一个生成器，它也是一个状态机，内部拥有值及相关的状态，生成器返回一个迭代器Iterator对象，我们可以通过这个迭代器，手动地遍历相关的值、状态，保证正确的执行顺序。

es6 提供的 generator函数

总得来说就三点:

\*在function关键字后加一个\* ， 那么这个函数就称之为generator函数

\*函数体有关键字 yield ， 后面跟每一个任务 ， 也可以有return关键字， 保留一个数据

\*通过next函数调用， 几个调用， 就是几个人任务执行

**(1).简单使用**

Generator的声明方式类似一般的函数声明，只是多了个\*号，并且一般可以在函数内看到yield关键字

```javascript
function* showWords() {
    yield 'one';
    yield 'two';
    return 'three';
}

var show = showWords();

show.next() // {done: false, value: "one"}
show.next() // {done: false, value: "two"}
show.next() // {done: true, value: "three"}
show.next() // {value: underfined, done: true}
```

如上代码，定义了一个showWords的生成器函数，调用之后返回了一个迭代器对象（即show）

调用next方法后，函数内执行第一条yield语句，输出当前的状态done（迭代器是否遍历完成）以及相应值（一般为yield关键字后面的运算结果）

每调用一次next，则执行一次yield语句，并在该处暂停，return完成之后，就退出了生成器函数，后续如果还有yield操作就不再执行了

当然还有以下情况:(next()数量小于yield)

```javascript
function* g1(){
  yield '任务1'
  yield '任务2'
  yield '任务3'
  return '任务4'
}

const g1done = g1()

console.log(g1done.next()) //{ value: '任务1', done: false }
console.log(g1done.next()) //{ value: '任务2', done: false }
```

**(2).yield和yield\***

有时候，我们会看到yield之后跟了一个\*号，它是什么，有什么用呢？

类似于生成器前面的\*号，yield后面的星号也跟生成器有关，举个大栗子：

```javascript
function* showWords() {
    yield 'one';
    yield showNumbers();
    return 'three';
}

function* showNumbers() {
    yield 10 + 1;
    yield 12;
}

var show = showWords();
show.next() // {done: false, value: "one"}
show.next() // {done: false, value: showNumbers}
show.next() // {done: true, value: "three"}
show.next() // {done: true, value: undefined}
```

增添了一个生成器函数，我们想在showWords中调用一次，简单的 yield showNumbers()之后发现并没有执行函数里面的yield 10+1

因为yield只能原封不动地返回右边运算后值，但现在的showNumbers()不是一般的函数调用，返回的是迭代器对象

所以换个yield\* 让它自动遍历进该对象

```javascript
function* showWords() {
    yield 'one';
    yield* showNumbers();
    return 'three';
}

function* showNumbers() {
    yield 10 + 1;
    yield 12;
}

var show = showWords();
show.next() // {done: false, value: "one"}
show.next() // {done: false, value: 11}
show.next() // {done: false, value: 12}
show.next() // {done: true, value: "three"}
```

要注意的是，这yield和yield\* 只能在generator函数内部使用，一般的函数内使用会报错

```javascript
function showWords() {
    yield 'one'; // Uncaught SyntaxError: Unexpected string
}
123
```

虽然换成yield\*不会直接报错，但使用的时候还是会有问题，因为’one'字符串中没有Iterator接口，没有yield提供遍历

```javascript
function showWords() {
    yield* 'one'; 
}

var show = showWords();

show.next() // Uncaught ReferenceError: yield is not defined
```

在爬虫开发中，我们常常需要请求多个地址，为了保证顺序，引入Promise对象和Generator生成器函数，看这个简单的栗子：

```javascript
var urls = ['url1', 'url2', 'url3'];

function* request(urls) {
    urls.forEach(function(url) {
        yield req(url);
    });

//     for (var i = 0, j = urls.length; i < j; ++i) {
//         yield req(urls[i]);
//     }
}

var r = request(urls);
r.next();

function req(url) {
    var p = new Promise(function(resolve, reject) {
        $.get(url, function(rs) {
            resolve(rs);
        });
    });

    p.then(function() {
        r.next();
    }).catch(function() {

    });
}
```

上述代码中forEach遍历url数组，匿名函数内部不能使用yield关键字，改换成注释中的for循环就行了

**(3).next()调用中的传参**

参数值有注入的功能，可改变上一个yield的返回值，如

```javascript
function* showNumbers() {
    var one = yield 1;
    var two = yield 2 * one;
    yield 3 * two;
}

var show = showNumbers();

show.next().value // 1
show.next().value // NaN
show.next(2).value // 6
```

第一次调用next之后返回值one为1，但在第二次调用next的时候one其实是undefined的，因为generator不会自动保存相应变量值，我们需要手动的指定，这时two值为NaN，在第三次调用next的时候执行到yield 3 \* two，通过传参将上次yield返回值two设为2，得到结果

另一个栗子：

由于ajax请求涉及到网络，不好处理，这里用了setTimeout模拟ajax的请求返回，按顺序进行，并传递每次返回的数据

```javascript
var urls = ['url1', 'url2', 'url3'];

function* request(urls) {
    var data;

    for (var i = 0, j = urls.length; i < j; ++i) {
        data = yield req(urls[i], data);
    }
}

var r = request(urls);
r.next();

function log(url, data, cb) {
    setTimeout(function() {
        cb(url);
    }, 1000);
  
}

function req(url, data) {
    var p = new Promise(function(resolve, reject) {
        log(url, data, function(rs) {
            if (!rs) {
                reject();
            } else {
                resolve(rs);
            }
        });
    });

    p.then(function(data) {
        console.log(data);
        r.next(data);
    }).catch(function() {
  
    });
}
```

达到了按顺序请求三个地址的效果，初始直接r.next()无参数，后续通过r.next(data)将data数据传入

![1699579671214](image/前端异步(async)解决方案(所有方案)/1699579671214.png)

注意代码的第16行，这里参数用了url变量，是为了和data数据做对比

因为初始next()没有参数，若是直接将url换成data的话，就会因为promise对象的数据判断 !rs == undefined 而reject

所以将第16行换成 cb(data || url);

通过模拟的ajax输出，可了解到next的传参值，第一次在log输出的是 url = 'url1'值，后续将data = 'url1'传入req请求，在log中输出 data = 'url1'值

**(4).for...of循环代替.next()**

除了使用.next()方法遍历迭代器对象外，通过ES6提供的新循环方式for…of也可遍历，但与next不同的是，它会忽略return返回的值，如

```javascript
function* showNumbers() {
    yield 1;
    yield 2;
    return 3;
}

var show = showNumbers();

for (var n of show) {
    console.log(n) // 1 2
}
```

此外，处理for…of循环，具有调用迭代器接口的方法方式也可遍历生成器函数，如扩展运算符…的使用

```javascript
function* showNumbers() {
    yield 1;
    yield 2;
    return 3;
}

var show = showNumbers();

[...show] // [1, 2, length: 2]
```

更多使用可以参考:[MDN - Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

**3.async await (重点)**

es7新增的 [async](https://so.csdn.net/so/search?q=async&spm=1001.2101.3001.7020)函数

可以更舒适地与promise协同工作，它叫做async/await，它是非常的容易理解和使用。

(1).格式

```javascript
async function aa(){
        await '任务1'
        await '任务2'
}
```

**async:**

让我们先从**async关键字**说起，它被放置在一个函数前面。就像下面这样：

```javascript
async function timeout() {
　　return 'hello world';
}
```

函数前面的async一词意味着一个简单的事情：这个函数总是返回一个promise，如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。

例如，上面的代码返回resolved值为1的promise，我们可以测试一下：

```javascript
async function f() {
    return 1
}
f().then(alert) // 弹出1
```

我们也可以显式的返回一个promise，这个将会是同样的结果

```javascript
async function f() {
    return Promise.resolve(1)
}
f().then(alert) // 弹出1
```

所以，async确保了函数返回一个promise，即使其中包含非promise,这样都不需要你来书写繁杂的Promise,够简单了吧？但是不仅仅只是如此，还有另一个关键词**await**，只能在async函数里使用，同样，它也很cool。

**await:**

```javascript
// 只能在async函数内部使用
let value = await promise
```

关键词await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。

以下是一个promise在1s之后resolve的例子：

```javascript
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1000)
    })
    let result = await promise // 直到promise返回一个resolve值（*）
    alert(result) // 'done!' 
}
f()
```

**函数执行到（await）行会‘暂停’，不再往下执行,**当promise处理完成后重新恢复运行， resolve的值成了最终的result，所以上面的代码会在1s后输出'done!'

我们强调一下：await字面上使得JavaScript等待，直到promise处理完成，

然后将结果继续下去。这并不会花费任何的cpu资源，因为引擎能够同时做其他工作：执行其他脚本，处理事件等等。

这只是一个更优雅的得到promise值的语句，它比promise更加容易阅读和书写。

**注意不:能在常规函数里使用await**

如果我们试图在非async函数里使用await，就会出现一个语法错误：

```javascript
function f() {
   let promise = Promise.resolve(1)
   let result = await promise // syntax error
}
//Uncaught SyntaxError: await is only valid in async function
```

如果我们忘记了在函数之前放置async，我们就会得到这样一个错误。如上所述，await只能在async函数中工作。

就以前面几个案例可能还看不出async/await 的作用，如果我们要计算3个数的值，然后把得到的值进行输出呢？

```javascript
async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(first + second + third);
}
```

6秒后，控制台输出220, 我们可以看到，写异步代码就像写同步代码一样了，再也没有回调地域了。

再来一个看看:先来个问题

readFile('./01-Promise.js') 运行结果是Promise, 但是我们使用 async await之后， 它的结果是具体的数据了？

用到了Node.js里的fs模块,fs模块是文件模块,可以操作文件,readFile()是读一个文件,不了解的乐意看Node.js官方文档

```javascript
const fs = require('fs')//导入fs模块

const readFile = (filename) =>{
  return new Promise((resolve,reject)=>{
    fs.readFile(filename,(err,data)=>{
      resolve(data.toString())
    })
  })
}

const asyncFn = async() => {
   //const f0 = eadFile('./01-Promise.js') //类似{value: '文件内容', done: false}
  const f1 = await readFile('./01-Promise.js') //文件内容
  //const f1 =  readFile('./01-Promise.js').then(data=>data)

  const f2 = await readFile('./02-generator.js') //文件内容
  console.log( f1 )
  console.log( f2 )
}
asyncFn()
```

readFile()定义了一个Promise方法读取文件,这里有个坑,我们现在是在里面返回出数据了的,要知道这里面有3层函数,如果不用new Promise这个方法,大家可以试试用常规方法能不能返回数据,先透个底拿不到,大家可以试试。

asyncFn()输出了文件内容,在**const f1 = eadFile('./01-Promise.js')**这一句这一句会打印出出一个Promise{'文件内容'},有点类似前面的generator函数输出的{value: '', done: false},只不过省略了done,大家知道,我们读文件,肯定是要里面的内容的,如果输出 Promise{'文件内容'} ,我们是不好取出内容的,但是await很好的帮我们解决了这个问题,前面加上await直接输出了文件内容。

所以:这个问题可以有个小总结

1.async函数使用了generator函数的语法糖 ， 它直接生成对象 {value: '',done:false} await 直接将value提取出来了

2\. 通过Promise + async,我们可以把多层函数嵌套（异步执行）的里层函数得到的数据 返回出来

**关于async/await总结**

放在一个函数前的**async**有两个作用：

- 使函数总是返回一个promise
- 允许在这其中使用await

promise前面的**await**关键字能够使JavaScript等待，直到promise处理结束。然后：

- 如果它是一个错误，异常就产生了，就像在那个地方调用了throw error一样。
- 否则，它会返回一个结果，我们可以将它分配给一个值

他们一起提供了一个很好的框架来编写易于读写的异步代码。

有了async/await，我们很少需要写promise.then/catch，但是我们仍然不应该忘记它们是基于promise的，因为有些时候（例如在最外面的范围内）我们不得不使用这些方法。Promise.all也是一个非常棒的东西，它能够同时等待很多任务。

**4.node.js nextTick setImmidate**

nextTick vs setImmediate

轮询：

nodejs中是事件驱动的，有一个循环线程一直从事件队列中取任务执行或者
I/O的操作转给后台线程池来操作,把这个循环线程的每次执行的过程算是一次轮询.
2.setImmediate()的使用
即时计时器立即执行工作，它是在事件轮询之后执行,为了防止轮询阻塞,每次只会调用一个。
3.Process.nextTick()的使用
它和setImmediate()执行的顺序不一样，它是在事件轮询之前执行，为了防止I/O饥饿，所以有一个默认process.maxTickDepth=1000来限制事件队列的每次循环可执行的nextTick()事件的数目。

总结：

nextTick()的回调函数执行的优先级要高于setImmediate();
process.nextTick()属于idle观察者,setImmediate()属于check观察者.在每一轮循环检查中,idle观察者先于I/O观察者,I/O观察者先于check观察者.
在具体实现上,process.nextTick()的回调函数保存在一个数组中,
setImmediate()的结果则是保存在链表中.
在行为上,process.nextTick()在每轮循环中会将数组中的回调函数全部执行完.
而setImmediate()在每轮循环中执行链表中的一个回调函数.

**5.第三方库 async.js**

**async.js**是一个第三方库，带有很多api

暴露了一个async对象，这个对象身上有很多的api(多任务执行)，例如parallel，series

```javascript
async.parallel([
function(callback){
callback(null,'任务1')
},
function(callback){
callback(null,'任务2')
},
],(err,data)=>{
console.log('data',data)
})
```
