
# 使用文档

## 概述

`ModelLoader` 类提供了一种简便的方法来加载多种格式的3D模型，支持GLTF、GLB、FBX和OBJ格式。它利用了Three.js的加载器，并且可以处理KTX2纹理、DRACO压缩和Meshopt解码。

## 功能特点

- 支持GLTF、GLB、FBX和OBJ模型格式的加载。
- 集成了KTX2、DRACO和Meshopt技术，优化模型加载性能。
- 统一的回调接口，方便对加载完成的模型进行操作。
- 灵活的配置，易于集成到现有项目中。

## 安装

确保已经安装了Three.js及其相关加载器。如果尚未安装，可以通过npm进行安装：

```bash
npm install three
```

## 使用方法

1. **导入依赖** ：引入 `ModelLoader`类和其他必要的Three.js加载器。

```js
import { ModelLoader } from './modelLoader';
```

2. **配置模型路径** ：定义模型路径对象，指定模型类型和文件路径。

```js
const modelPaths = {
    obj:{
        paths:[
            {
                path:['male02.obj','male02.mtl']
            },
        ],
        callback:(object) => {
            console.log('加载完成',object);
            object.scale.setScalar( 0.1 );
            scene.add(object);
        }
    },
    gltf:{
        paths:[
            {
                path:'factory.gltf'
            }
        ],
        callback:(gltf) => {
            scene.add(gltf.scene);
        }
    },
    glb:{
        paths:[
            {
                path:'factory.glb'
            }
        ],
        callback:(glb) => {
            console.log('加载完成',glb);
            scene.add(glb.scene);
        }
    },
    fbx:{
        paths:[
            {
                path:'Mnupao_10004.fbx'
            }
        ],
        callback:(fbx) => {
            console.log('加载完成',fbx);
            scene.add(fbx);
        }
    },
};
```

3. **创建 `ModelLoader`实例** ：使用模型路径对象、加载器管理器和渲染器实例化 `ModelLoader`。

```js
const manager = new THREE.LoadingManager();
const renderer = new THREE.WebGLRenderer();
const modelLoader = new ModelLoader(modelPaths, manager, renderer);
```

4. **加载模型** ：`ModelLoader`将自动加载配置的模型。
5. **处理加载完成的模型** ：通过 `modelPaths`中定义的 `callback`函数处理加载完成的模型。

## 配置选项

* `paths`：一个数组，包含模型文件的路径或路径数组。
* `callback`：模型加载完成后的回调函数，接收加载的模型对象作为参数。

## 示例

以下是使用 `ModelLoader`加载模型的示例：

```js
const modelPaths = {
    obj:{
        paths:[
            {
                path:['male02.obj','male02.mtl']
            },
        ],
        callback:(object) => {
            console.log('加载完成',object);
            object.scale.setScalar( 0.1 );
            scene.add(object);
        }
    },
    gltf:{
        paths:[
            {
                path:'factory.gltf'
            }
        ],
        callback:(gltf) => {
            scene.add(gltf.scene);
        }
    },
    glb:{
        paths:[
            {
                path:'factory.glb'
            }
        ],
        callback:(glb) => {
            console.log('加载完成',glb);
            scene.add(glb.scene);
        }
    },
    fbx:{
        paths:[
            {
                path:'Mnupao_10004.fbx'
            }
        ],
        callback:(fbx) => {
            console.log('加载完成',fbx);
            scene.add(fbx);
        }
    },
};
// 创建ModelLoader实例并加载模型
const objModelLoader = new ModelLoader(objModelPaths, manager, renderer);
```

## 注意事项

* 确保模型文件路径正确无误，并且服务器配置了合适的CORS策略。
* 使用 `LoadingManager`可以跟踪加载进度和处理加载错误。
* 根据模型格式，可能需要额外配置纹理路径或解码器。

## 源码

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

export class ModelLoader {
    defaultPath = 'three/models'
    constructor(modelPaths, manager, renderer) {
        this.manager = manager;
        this.renderer = renderer;
        this.gltfLoader = new GLTFLoader(manager);
        modelPaths['gltf']?.isKtx2 && this.isKtx2(this.renderer)
        modelPaths['gltf']?.isDraco && this.isDraco()
        modelPaths['gltf']?.isMeshopt && this.isMeshopt()
        this.fbxLoader = new FBXLoader(manager);
        this.objLoader = new OBJLoader(manager);
        this.mtlLoader = new MTLLoader(manager);
        for(let key in modelPaths){
            const pathList = modelPaths[key];
            console.log(key);
            if(key === 'glb' || key === 'gltf'){
                this.loaderGltf(pathList)
            }else if(key === 'fbx'){
                this.loaderFbx(pathList)
            }else if(key === 'obj'){ 
                this.loaderObj(pathList)
            }
        }
    }

    isKtx2(renderer) {
        this.ktx2Loader = new KTX2Loader();
        this.ktx2Loader.setTranscoderPath( 'three/libs/basis/' );
        this.ktx2Loader.detectSupport( renderer );
        this.gltfLoader.setKTX2Loader(this.ktx2Loader);
    }

    isDraco() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( 'three/libs/draco/gltf/' );
        this.dracoLoader.setDecoderConfig({type: 'js'})  //使用js方式解压
        this.dracoLoader.preload()  //初始化_initDecoder 解码器
        this.gltfLoader.setDRACOLoader( this.dracoLoader );
    }

    isMeshopt() {
        this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    }

    loaderGltf(pathList) {
        const { paths ,callback} = pathList;
        paths.forEach(({path}) => {

            const [name, format] = path.split('.') 
            this.gltfLoader.load(`three/models/${format}/${name}/${path}`, callback);
        });
    }

    loaderFbx(pathList) {
        const { paths ,callback } = pathList;
        paths.forEach(({path}) => {
            const [name, format] = path.split('.') 
            this.fbxLoader.load(`three/models/${format}/${name}/${path}`, callback);
        });
    }

    loaderObj(pathList) {
        const { paths ,callback } = pathList;
        paths.forEach(({path}) => {
            if(Array.isArray(path)){
                // 解构赋值，确保objName是.obj文件名，mtlName是.mtl文件名
                let [objName, mtlName] = path;
                // 检查文件扩展名，如果.mtl不是第一个，则交换它们
                if (!mtlName.endsWith('.mtl')) {
                    [mtlName, objName] = [objName, mtlName];
                }
                const [name, format] = objName.split('.') 
                console.log( `three/models/${format}/${name}`,mtlName, objName,'mtlName, objName');
  
                this.mtlLoader
                .setPath( `three/models/${format}/${name}/` )
                .load( mtlName, ( materials ) => {
                    materials.preload();
                    this.objLoader
                        // 设置材质
                        .setMaterials( materials )
                        .setPath( `three/models/${format}/${name}/` )
                        .load( objName, callback);
                } );
            }
        });
    }
}
```
