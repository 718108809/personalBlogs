NProgress是一个开源的进度条库，用于跟踪Web应用程序和API的加载进度。NProgress允许您在网页上显示一个进度条，其颜色和长度可以自定义，以便更好地显示加载进度。

NProgress的工作原理是在后台运行一个进度条计算器，它会不断更新进度条的进度。当应用程序或API完成加载时，进度条将自动更新为100%，表示加载完成。

NProgress适用于各种Web应用程序，包括Web服务、RESTful API和Vue.js应用程序。它支持Windows、Linux和Mac OS X等操作系统。

NProgress的GitHub地址为https://github.com/NoumanEelbuy/NProgress，您可以在该项目的GitHub仓库中找到最新的NProgress版本和文档。

## 安装

```js
// npm
npm install --save nprogress

//Yarn
yarn add nprogress
```

直接引入js、css或者通过cdn引入 

```js
<script src='nprogress.js'></script>
<link rel='stylesheet' href='nprogress.css'/>
```

## 使用方法

方法调用start和done

`start()`开启NProgress进度条 `done()`关闭NProgress进度条 

```js
// 使用方法
NProgress.start(); // — 显示进度条
NProgress.done(); // — 结束进度条
```

通过调用 .set(n)来设置进度，n是0-1的数字 

```js
NProgress.set(0.0); // Sorta same as .start()
NProgress.set(0.4); // — 设置百分比
NProgress.set(1.0); // Sorta same as .done()
```

使用`inc(n)`设置递增进度条，递增时永远不会到达100%，其中n为自设的递增值，如果不传入n，则将以随机量递增 ，这个方法永远不会让进度条达到100% 

```js
NProgress.inc(0.4); // — 增加一点点
```

这将获得当前状态值并加0.4，直到状态为0.994 

#### 获取状态值

使用`status()`

```
 console.log(NProgress.status());
```

## 进度条配置

```
1. 通过 minimum 来修改最小百分比

NProgress.configure({ minimum: 0.1 });

2. 通过 ease(一个 CSS 中的 easing 值) 调整动画设置和速度 speed （毫秒ms）

​```js

NProgress.configure({ ease: ‘ease’, speed: 500 });

css缓动可取值：
- linear 动画从开始到结束保持相同的速度。
- ease 默认值。动画有一个缓慢的开始，然后加速，在结束之前又变慢。
- ease-in 动画有一个缓慢的开始。
- ease-out 动画有一个缓慢的结束。
- ease-in-out 动画有一个缓慢的开始和一个缓慢的结束。
- cubic-bezier(n,n,n,n) 在三次贝塞尔（cubic-bezier）函数中定义自己的值。
可以是从 0 到 1 之间的数字值。
- initial 设置该属性为它的默认值。请参阅 initial。
- inherit 从父元素继承该属性。请参阅 inherit。

​```js

3. 关闭进度条步进，设置 trickle 为 false。

​```js

NProgress.configure({ trickle: false });

4. 调整 trickleRate (每次步进增长多少) 和 trickleSpeed (步进间隔，单位毫秒ms)

​```js

NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });

5. 禁用进度环，设置 showSpinner 为 false

​```js

NProgress.configure({ showSpinner: false });
```

父容器：parent

指定此选项可更改父容器。（默认值：body)

```
NProgress.configure({ parent: '#container' });
```

进度条颜色改变

在使用start()函数前，改变样式的颜色：

```
注意都要 增加 !important; 否则无效

#nprogress .bar {

  background: #29d !important;

  height: 22px !important;

}
```

## 示例

在vue中使用

```
// router/index.js

import { createWebHistory, createRouter } from 'vue-router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'



NProgress.configure({ showSpinner: false })



router.beforeEach((to, from, next) => {

  NProgress.start()

  next()

})



router.afterEach(() => {

  NProgress.done()

})
```

发送请求时中使用： 

```js
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 进度条设置
NProgress.configure({
    easing: "ease-in-out",
    speed: 300,
    trickleSpeed: 300,
});
//创建axios的一个实例
const instance = axios.create({
		//...
});
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        NProgress.start();
		//...
    },
    (error) =>{
		//...
	}
);
//响应拦截器
instance.interceptors.response.use(
    (response) => {
        //响应成功
        NProgress.done();
        //...
    },
    (error) => {
        NProgress.done();
        //...
    }
);
export default instance;
```

以上两种使用情景仅展示`NProgress`用法，[路由配置](https://so.csdn.net/so/search?q=%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE&spm=1001.2101.3001.7020)和`axios`请求封装不做展示 

[NProgress官网](https://ricostacruz.com/nprogress/)和[Github地址](https://github.com/rstacruz/nprogress#) 