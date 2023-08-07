## 一、Map对象

### 1. 初始化Map

#### 使用Array

```js
let obj = new Map([[1, "111"], [2, "222"], [3, "333"]])
 
console.log(obj); // Map(4) {1 => '111', 2 => '222', 3 => '333'}
```

#### 使用set() 方法

```js
let obj = new Map();
 
obj.set(1, '111');
obj.set(2, '222');
obj.set(3, '333');

console.log(obj); // Map(4) {1 => '111', 2 => '222', 3 => '333'}
```

### 2. 内置方法

#### get() 方法

该方法返回key对应的value，如果不存在，则返回undefined。

```js
let obj = new Map();
 
obj.set(1, '111');

console.log(obj.get(1)); // '111'
console.log(obj.get(2)); // undefined
```

#### has() 方法

该方法用于检查Map是否有指定key对应的value。

```js
let obj = new Map();
 
obj.set(1, '111');

console.log(obj.has(1)); // true
console.log(obj.has(2)); // false
```

#### clear() 方法

该方法用于清空指定map对象中的所有内容。

```js
let obj = new Map();
obj.set(1, '111');
console.log(obj); //  Map(1) {1 => '111'}

obj.clear();
console.log(obj); // Map(0) {size: 0}

```

#### delete() 方法

该方法用于删除map中指定key对应的一组key-value元素。

```js
let obj = new Map();
 
obj.set(1, '111');
console.log(obj.get(1)); // '111'
console.log(obj.has(1)); // true

obj.delete(1)
console.log(obj.get(1)); // undefined
console.log(obj.has(1)); // false
```

### 3. Map遍历的方式

#### keys() 方法

该方法返回Map对象中每个元素的key。

```js
let obj = new Map();
 
obj.set(1, '111');
obj.set(2, '222');
obj.set(3, '333');

console.log(obj.keys()); // MapIterator {1, 2, 3}
```

#### values() 方法

和keys方法对应，values方法返回的就是Map对象中的value集合。

```js
let obj = new Map();
 
obj.set(1, '111');
obj.set(2, '222');
obj.set(3, '333');

console.log(obj.values()); // MapIterator {'111', '222', '333'}
```

#### entries() 方法

该方法返回Map集合中每个 [key，value] 元素的对象。

```js
let obj = new Map();
 
obj.set(1, '111');
obj.set(2, '222');
obj.set(3, '333');

console.log(obj.entries()); // MapIterator {1 => '111', 2 => '222', 3 => '333'}
```

#### 遍历

```js
for (const [key, value] of obj.entries()) {
    console.log(key, value);
}
obj.forEach((value, key) => {
    console.log(key, value);
})
1 '111'
2 '222'
3 '333'
```

### 4. Map 的特点

- Map 默认情况下不包含任何键，所有键都是自己添加进去的。不同于 Object 原型链上有一些默认的键。
- Map 的键可以是任意类型数据，就连函数都可以。
- Map 的键值对个数可以轻易通过size属性获取，Object 需要手动计算。
- Map 在频繁增删键值对的场景下性能要比 Object 好。

### 5. 什么时候用 Map

- 要添加的键值名和 Object 上的默认键值名冲突，又不想改名时，用 Map
- 需要 String 和 Symbol 以外的数据类型做键值时，用 Map
- 键值对很多，有需要计算数量时，用 Map
- 需要频繁增删键值对时，用 Map

## 二、Map对象和普通对象的区别

在 JavaScript 中，普通对象和 ES6 的新对象 Map 都可以存储键值对，但还是有些区别。

### 1. 初始化与使用

普通对象可以直接使用[字面量](https://so.csdn.net/so/search?q=%E5%AD%97%E9%9D%A2%E9%87%8F&spm=1001.2101.3001.7020)进行初始化，而 Map 需要 Map() 构造函数进行初始化，如果想要有初始值，则需要传递一个数组或其他元素为键值对的可迭代对象。这些键值对中的每一个都将被添加到一个新的 Map 中。

```js
let a = {
    1: "111",
    2: "222",
    3: "333",
    0: "000",
}

let b = new Map([[1, "111"], [2, "222"], [3, "333"], [0,"000"]])
```

### 2. 密钥类型

Map类似于对象，但是键名不限于字符串，可以说Object结构提供 `键-值`对应，Map结构提供 `值-值`对应因此其实采用map结构会优于传统对象。

普通对象只能用字符串作为键名，而 Map 可以接受任何类型的键值（包括函数、对象或任何原语）。

```js
const obj = {};
const map = new Map();
const key = function () {};
obj[key] = 1;
map.set(key, 1);

console.log('obj: ', obj); // { 'function () {}': 1 }
console.log('map: ', map); // Map(1) { [Function: key] => 1 }
```

### 3. Accidental keys

普通对象从原型继承了许多属性键，例如构造函数等。因此，自己的密钥很可能与原型上的密钥发生冲突。但是 Map 默认不包含任何键，它只包含那些显式放入的。

```js
const obj = {};
const map = new Map();
console.log(obj.constructor); // ƒ Object() { [native code] }
console.log(map.get('constructor')); // undefined
```

### 4. Key order

虽然现在对普通对象的键进行了排序，但情况并非总是如此，而且排序很复杂。例如，如果对象中有键需要转换为字符串，则不保留对象键的原始顺序。虽然 Map 以简单的方式排序，但它始终与我们插入的顺序相同。

```js
let a = {
    1: "111",
    2: "222",
    3: "333",
    0: "000",
}
let b = new Map([[1, "111"], [2, "222"], [3, "333"], [0,"000"]])

console.log(a);  // {0: '000', 1: '111', 2: '222', 3: '333'}
console.log(Object.keys(a));  // ['0', '1', '2', '3']
console.log(b); // Map(4) {1 => '111', 2 => '222', 3 => '333', 0 => '000'}
```

### 5. 迭代

可以使用 for…of 语句或 Map.prototype.forEach 直接迭代 Map 的属性，而普通对象不能直接迭代

```js
let b = new Map([[1, "111"], [2, "222"]])

for (const [key,value] of b) { console.log(key, value)}
// 1 111
// 2 222
```

### 6. 序列化和解析

普通对象支持 JSON 序列化，但 Map 默认无法获取正确数据

```js
const obj = {
  name: 1,
  age: 2,
};
const map = new Map([
  ['name', 1],
  ['age', 2],
]);
console.log(JSON.stringify(obj)); // "{"name":1,"age":2}"
console.log(JSON.stringify(map)); // "{}"
```

### 7. 性能

Map 对象在涉及频繁添加和删除键值对的场景中表现更好，而普通对象没有优化。

### 8. 总结

那么普通对象应该被 Map 对象替换吗？

不，如果我们想在 JSON 和原始数据之间转换或包含特定的业务逻辑，那么我们应该使用普通对象。因为当我们只想存储键值对和循环操作或不断添加和删除属性时，使用 Map 对象是更好的选择。

Map对象虽然也是继承自底层的Object.prototype ，但它为我们提供了很多实用的方法来减轻我们的认知负担，比普通对象更高级。

## 三、Map 和 WeakMap 区别

WeakMap是 ES6 中新增的一种集合类型，叫做“弱映射”。它和Map是兄弟关系，与Map的区别就在于这个弱字，API 还是Map的那套（只有set get has delete)

WeakMap 其实描述的是 JS 中垃圾回收程序对待“弱映射”中键的方式

### 1. WeakMap 的特性

- WeakMap 只能将对象作为键名
- WeakMap 的键名引用的对象是弱引用
- WeakMap 不可遍历

### 2. Map 和 WeakMap 区别

- Map 的键可以是任意类型，WeakMap 只接受对象作为键（null除外），不接受其他类型的值作为键
- Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； WeakMap 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
- Map 可以被遍历， WeakMap 不能被遍历

### 3. WeakMap 的使用场景

- DOM 节点元数据
- 部署私有属性
- 数据缓存

## 在开发过程中，涉及到数据结构，能使用Map 不使用Array 尤其是复杂的数据结构 ，如果对于数组的存储考虑唯一性 使用Set ，优先使用map。
