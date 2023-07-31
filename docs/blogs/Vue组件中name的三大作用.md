一直不太清楚写[vue项目](https://so.csdn.net/so/search?q=vue%E9%A1%B9%E7%9B%AE&spm=1001.2101.3001.7020)的时候遇到给组件命名name值是干嘛用的，一直以为没啥用，直到今天接触到了递归组件，然后又去百度了与name属性相关的些东西才感觉它的用处挺多的，现在记录下。 

**作用一：递归组件**

一个组件要用自己的时候，可以通过自己的名字来使用自己。
**list.vue**

```js
 <div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="item-title border-bottom">
        <span class="item-title-icon"></span>
        {{ item.title }}
        <!-- 当数据中有children属性时，说明他是一个多级菜单，对组件本身进行循环递归 -->
        <div v-if="item.children" class="item-children">
          <detail-list :list="item.children"></detail-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>
```

**list数据是父组件detail-list定义的数据** 

```js
list: [
        {
          title: '成人票',
          children: [
            {
              title: '成人三馆联票',
              children:[{
                 title: '成人三馆联票 - 某一连锁店销售'
              }]
            },
            {
              title: '成人五馆联票',
              children:[{
                 title: '成人三馆联票 - 某一连锁店销售'
              }]
            }
          ]
        },
        {
          title: '学生票'
        },
        {
          title: '儿童票'
        },
        {
          title: '特惠票'
        }
      ]
    }
```

**作用二：移除keep-alive状态下组件自动缓存功能 -> exclud=“name”。** 

我们在App.vue中使用了keep-alive导致我们第二次进入的时候页面不会重新请求ajax，即mounted() 钩子函数只会执行一次。
有两个解决方案,一个增加activated()函数,每次进入新页面的时候再获取一次数据。
还有个方案就是在keep-alive中增加 exclud=“name”，移除选中页面的缓存，如下图所示：

```js
<div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
  </div>
```

**作用三：浏览器使用vue-tools调试时** 

vue-devtools调试工具里显示的组件名称是由vue中组件name决定的

