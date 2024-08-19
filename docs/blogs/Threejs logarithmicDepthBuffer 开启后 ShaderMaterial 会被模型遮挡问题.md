# threejs logarithmicDepthBuffer 开启后 ShaderMaterial 会被模型遮挡问题

> logarithmicDepthBuffer 关闭展示正常，开启 ShaderMaterial 就会被遮挡。

 logarithmicDepthBuffer 关闭展示正常，开启 ShaderMaterial 就会被遮挡。但是关闭 logarithmicDepthBuffer 的话模型加载可能会出现闪烁。

需要修改 ShaderMaterial 的顶点着色器和片元着色器

首先需要引入 threejs 的 ShaderChunk

```js
import * as THREE from 'three'
// THREE.ShaderChunk即为所需要使用的ShaderChunk
console.log(THREE.ShaderChunk,'ShaderChunk====');

const material = new THREE.ShaderMaterial({
        vertexShader: `
            ${ THREE.ShaderChunk.logdepthbuf_pars_vertex } // 新增的
            bool isPerspectiveMatrix (mat4) { // 新增的
                return true; // 新增的
            } // 新增的
            varying vec2 vUv;
            varying vec3 viewDir;
            varying vec3 worldNormal;

            void main() {
                vUv = uv;
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vec4 viewPosition = viewMatrix * worldPosition;
                viewDir = normalize(viewPosition.xyz);
                worldNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                ${ THREE.ShaderChunk.logdepthbuf_vertex } // 新增的
            }
        `,
        fragmentShader: `
            ${ THREE.ShaderChunk.logdepthbuf_pars_fragment } // 新增的
            varying vec3 viewDir;
            varying vec3 worldNormal;
            varying vec2 vUv;
            uniform vec3 beamColor;
            uniform float beamIntensity;
            void main() {
                vec3 beamEffect = beamColor * beamIntensity;
                float dotProduct = abs(dot(viewDir, worldNormal));
                gl_FragColor = vec4(beamEffect, dotProduct);
                gl_FragColor = vec4(beamEffect, dotProduct * vUv.y);
                ${ THREE.ShaderChunk.logdepthbuf_fragment } // 新增的
            }
        `,
        side: THREE.DoubleSide,
        uniforms: {
            beamColor: { value: new THREE.Color(color) },
            beamIntensity: { value: intensity },
        },
        transparent: true, // 如果需要透明效果，设置为true
        depthWrite: false,
    });
```

需要在vertexShader 顶点着色器上添加

```jjs
${ THREE.ShaderChunk.logdepthbuf_pars_vertex }

            bool isPerspectiveMatrix(mat4) {

                return true;

            }
```

和

```js
${ THREE.ShaderChunk.logdepthbuf_vertex }
```

fragmentShader 片元着色器添加

```js
${THREE.ShaderChunk.logdepthbuf_pars_fragment }
```

和

```js
${ THREE.ShaderChunk.logdepthbuf_fragment }
```
