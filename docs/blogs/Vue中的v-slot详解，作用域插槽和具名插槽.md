#### 插槽

> 在2.6.0中，我们为具名插槽和[作用域](https://so.csdn.net/so/search?q=%E4%BD%9C%E7%94%A8%E5%9F%9F&spm=1001.2101.3001.7020)插槽引入了一个新的统一的语法，即**v-slot**。它取代了**slot**和**slot-scope**这两个目前已被废弃但未被移除且仍在文档中的attribute中。

#### 1、插槽内容

Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 Web Components 规范草案，将 元素作为承载分发内容的出口。  
它允许你像这样合成组件：

```js
import ButtonSlot from './ButtonSlot'
// 这是 我们注册的一个组件名称 
<button-slot :type="primary">
	提交
</button-slot>


<template>
	<div>
		<button>
			<slot></slot>
       </button>
   </div>
</template>
```

它的渲染机制是什么那？

> 其实很简单，当你组件中写上slot的时候，标签里面无论你写什么都会被替换成你写的内容，也就是说，会替换你写在组件里面的任何内容。

这样的话我们就完成了一个简单的插槽。这个案例我们可以利用组件通信的方式去设置它的class去完成不同的按钮样式，像element的button一样。

#### 2、编译作用域

当你想在一个插槽中使用数据时，例如：

```js
<button-slot :type="primary">
	{{message}}
</button-slot>


<script>
export default {
	data(){
	return{
		message:'我是父组件的Message内容'
	 }
	}
}
</script>
```

该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如ButtonSlot里面如果也有一个message是访问不到的：

**作为一条规则，请记住：**

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

#### 3、后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个 组件中：

```js
<button-slot type="submit">
  <slot>Submit</slot>
</button-slot>
```

如果我们没有在button-slot中书写任何内容，Submit就会被渲染出来，如果写了就不会被渲染出来。

#### 4、具名插槽

自 2.6.0 起 有 所 更 新 。 已 废 弃 的 使 用 s l o t a t t r i b u t e 的 语 法 在 这 里 \\color{red}{自 2.6.0 起有所更新。已废弃的使用 slot attribute 的语法在这里} 自2.6.0起有所更新。已废弃的使用slotattribute的语法在这里  
有时我们需要多个插槽。例如对于一个带有如下模板的base-slot 组组件：

```js
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

对于这样的情况，slot 元素有一个特殊的 attribute：name。这个 attribute 可以用来定义额外的插槽：

```js
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

在向具名插槽提供内容的时候，我们可以在一个 template 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

```js
<base-slot>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-slot>
```

现在 **template** 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 **v-slot** 的 **template** 中的内容都会被视为默认插槽的内容。  
然而，如果你希望更明确一些，仍然可以在一个 template>中包裹默认插槽的内容：

```js
<base-slot>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-slot>
```

任何一种写法都会渲染出：

```js
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

注意 v-slot 只能添加在 template 上 ( 只 有 一 种 例 外 情 况 ， 下 面 会 说 ( 独 占 默 认 插 槽 的 缩 写 语 法 ) \\color{red}{只有一种例外情况，下面会说(独占默认插槽的缩写语法)} 只有一种例外情况，下面会说(独占默认插槽的缩写语法))，这一点和已经废弃的 slot attribute 不同。

#### 5、作用域插槽

> 自 2.6.0 起有所更新。已废弃的使用 slot-[scope](https://so.csdn.net/so/search?q=scope&spm=1001.2101.3001.7020)

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 **current-user**组件：

```js
<span>
// user.lastName 只有他自己有这个属性
  <slot>{{ user.lastName }}</slot>
</span>
<script>
export default {
	data(){
	return{
		user:{
			lastName:'小康',
			firstName:'屈'
		}
	 }
	}
}
</script>
```

我们可能想换掉备用内容，用名而非姓来显示。如下：

```js
<current-user>
// 父组件中 没有 user这个属性 所以根据作用域范围访问不到
  {{ user.firstName }}
</current-user>
```

然而上述代码不会正常工作，因为只有 **current-user** 组件可以访问到 user，而我们提供的内容是在父级渲染的。

为了让 u s e r \\color{red}{user } user在父级的插槽内容中可用，我们可以将 u s e r \\color{red}{user } user作为 s l o t \\color{red}{slot} slot 元素的一个 attribute 绑定上去：

```js
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

绑定在 **slot**元素上的 attribute 被称为插槽 **prop**。现在在父级作用域中，我们可以使用带值的 **v-slot** 来定义我们提供的插槽 **prop** 的名字：

```js
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

在这个例子中，我们选择将包含所有插槽 p r o p \\color{red}{prop } prop 的对象命名为 s l o t P r o p s \\color{red}{slotProps} slotProps ，但你也可以使用任意你喜欢的名字。

#### 6、独占默认插槽的缩写语法

在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v − s l o t \\color{red}{v-slot} v−slot 直接用在组件上：

```js
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 **v-slot** 被假定对应默认插槽：

```js
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

注意默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确：

```js
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽，请始终为所有的插槽使用完整的基于 template的语法：

```js
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

#### 7、具名插槽的缩写

跟 **v-on** 和 **v-bind** 一样，**v-slot** 也有缩写，即把参数之前的所有内容 **(v-slot:)** 替换为字符 **#**。例如 **v-slot:header** 可以被重写为 **#header**：

```js
<base-slot>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-slot>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```js
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```js
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

#### 总结：

> v-slot 指令自 Vue 2.6.0 起被引入，提供更好的支持 slot 和 slot-scope attribute 的 API 替代方案。v-slot 完整的由来参见这份 RFC。在接下来所有的 2.x 版本中 slot 和 slot-scope attribute 仍会被支持，但已经被官方废弃且不会出现在 Vue 3 中。