# 封装websocket方法

使用class类进行封装websocket  

useWebSocket.js文件代码

```js
import { useUtils } from '@/hooks/useUtils.js'
/**
 * webSocket
 */
const userStore = useUtils()
export class useWebSocket {
    constructor(url=null,callback){
        this.url = url || null
        this.socket = null
        this.TIMEID = null;
        this.callback = callback
        this.init()
    }
    init () {
       try {
        this.socket = new WebSocket(this.url || `${import.meta.env.VITE_SOKET_URL}${userStore.useNumberId()}`)
        this.onopen()
        this.onerror()
       } catch (error) {console.log(error)}
    }
    onopen () {
        this.socket.onopen = () => {
            this.callback && this.callback()
        }
    }
    send(info) {
        this.socket.send(info)
    }
    onmessage (callback) {
        this.socket.onmessage = (evt) => {
            const data = JSON.parse(evt.data)
            callback(data)
        }
    }
    onerror () {
        this.socket.onerror = () => {//连接失败重新连接
            console.error('WebSocket:' + '链接失败，两秒之后再次重链')
            this.TIMEID = setTimeout(()=>{
                this.init();
            },2000)
        }
    }
    //关闭soket
    close () {
        clearTimeout(this.TIMEID)
        this.TIMEID = null;
        this.socket.close()
        this.socket = null;
    }
}
```

useUtils.js文件代码

```js

export const useUtils = ()=>{
    return {
        /**
         * @method differences
         * @description 两个对象之间对比 key值不同 返回key 以及oldValue newValue
         * @param object1  newValue
         * @param object2  oldValue
         * @returns 
         */
        differences: (object1,object2)=>{
            const result = {
                key: null,
                oldValue: null,
                newValue: null
            }
            for (const key of new Set([...Object.keys(object1), ...Object.keys(object2)])) {
                if (object1[key] !== object2[key]) {
                    result.key = key
                    result.oldValue = object2[key]
                    result.newValue = object1[key]
                 
                }
            }
            return result
        },
        /**
         * @description 生成随机数 默认1——100 
         * @method getRandomInt
         * @param min 
         * @param max 
         * @param length? 
         * @returns 
         */
        getRandomInt: (min = 1,max = 100,length)=>{
            const randomArray = []
            if(length){
                for (let i = 0; i < length; i++) {
                    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    randomArray.push(randomNum);
                }
            }
            return length ? randomArray : Math.floor(Math.random() * (max - min + 1)) + min;
        },
        useNumberId: (length=6)=>{
            const digits = '0123456789';
            let result = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * digits.length);
                result += digits.charAt(randomIndex);
            }
            return result
        }

    }
}
```

将这两个文件放到项目文件中即可使用
