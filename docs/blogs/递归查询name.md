# 递归查询name

```js
/**
 *
 * @param current 当前模型
 * @param selectName 要查找的name
 * @param fuzzy:是否模糊匹配，默认精确，开启则返回当前模型的name,不开启返回Boolean
 * @returns {boolean | Name}
 */
export function findName(current, selectName, fuzzy = false) {
  const name = [];
  name.push(current.name);
  const find = (obj) => {
    if (obj?.parent) {
      name.push(obj.parent.name);
      find(obj.parent);
    }
  };
  find(current);
  if (fuzzy) {
    return name.find((i) => i.includes(selectName)) || null;
  }
  return name.includes(selectName);
}
```

