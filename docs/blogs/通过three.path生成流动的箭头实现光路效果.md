# 通过three.path生成流动的箭头实现光路效果

```js
import { PathGeometry, PathPointList } from 'three.path';

export function createArrow(pointsArraysIn, tubeTextures, Object3D) {
  pointsArraysIn.forEach((item, i) => {
    // 多种img的方案
    // item.points.forEach((item) => res.push(new THREE.Vector3(...item)));
    // 单个img的方案
    item.points.forEach(async (child, j) => {
      const res = [];
      child.forEach((grandson) => res.push(new THREE.Vector3(...grandson)));
      const curve = new THREE.CatmullRomCurve3(res, false, 'catmullrom', 0);
      const texture = await new THREE.TextureLoader().loadAsync(item.img);
      tubeTextures.push(texture);
      // 贴图在水平方向上允许重复
      texture.wrapS = THREE.RepeatWrapping;

      // 向异性
      texture.anisotropy = window.renderer.capabilities.getMaxAnisotropy();

      // 创建一个合适的材质
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        // blending: THREE.AdditiveBlending,
      });

      // 确定一个向上的向量
      const up = new THREE.Vector3(0, 1, 0);

      // 创建路径点的集合
      const pathPoints = new PathPointList();

      // 设置集合属性
      pathPoints.set(curve.getPoints(1000), 0.5, 2, up, false);

      // 创建路径几何体
      const geometry = new PathGeometry();

      // 更新几何体的属性
      geometry.update(pathPoints, {
        width: 50,
        arrow: false,
      });

      // 创建路径的网格模型并添加到Object3D中
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `${i}_${j}`;
      Object3D.add(mesh);
    });
  });
}


let tubeTextures = []; // 所有的箭头流动的纹理
window.arrowObj = new THREE.Object3D(); // 所有的箭头
window.arrowObj.name = 'arrowObj';
window.scene.add(window.arrowObj);
// 生成路径的点位格式
const northPointsArraysIn = [
  // NorthCheckIn
  {
    points: [
      // 第一条线
      [
        [-277666.9158482149, 810.2652476201476, 421543.01641528937],
        [-277304.58284636436, 929.9716520377681, 421228.80283783353],
      ],
      [
        [-276880.84363197954, 987.9131771329446, 420859.18093394255],
        [-276502.57288221497, 1019.129922988365, 420518.06904489483],
      ],
      [
        [-276204.48275861307, 987.9131771329446, 420658.4899475818],
        [-275865.35997052357, 987.9131771329446, 421065.31374235614],
      ],
      [
        [-273254.01460832334, 1199.5825156727828, 424037.49320102535],
        [-272625.6624594882, 1199.5825156727828, 424753.8121480441],
      ],
      [
        [-269918.3714368394, 1166.9305476534462, 427865.9879619352],
        [-269062.07523671986, 1166.9305476534462, 428835.35548883147],
      ],
    ]
  }
]
// 生成所有箭头流动效果
createArrow(northPointsArraysIn, tubeTextures, window.arrowObj);

// 创建一个时钟对象Clock
const clock = new THREE.Clock();
// 设置渲染频率为60FBS，也就是每秒调用渲染器render方法大约60次
const FPS = 60;
const renderT = 1 / FPS; // 单位秒  间隔多长时间渲染渲染一次
// 声明一个变量表示render()函数被多次调用累积时间
// 如果执行一次renderer.render，timeS重新置0
let timeS = 0;
let T; // 两帧的时间间隔
function animateNorth() {
  window.loopId = requestAnimationFrame(animateNorth); // 请求动画帧
  window.orbit.update();
  // .getDelta()方法获得两帧的时间间隔
  T = clock.getDelta();
  timeS = timeS + T;
  // requestAnimationFrame默认调用render函数60次，通过时间判断，降低renderer.render执行频率
  if (timeS > renderT) {
    render();
    TWEEN.update();
    // 模型加载完成后执行此段代码
    if (modelLoaded) {
      // 箭头流动效果
      if (tubeTextures.length) {
        tubeTextures.forEach((texture) => {
          texture.offset.x -= 0.08;
        });
      }
   
    // renderer.render每执行一次，timeS置0
    timeS = 0;
  }
}

```

