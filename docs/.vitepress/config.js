module.exports = {
    // 站点标题
    title: '小江的网站',
    // mate标签description，多用于搜索引擎抓取摘要
    description: '个人博客网',
    lang: 'zh-CN',
    // github pages 配置
    base: '/personalBlogs/',
    head: [
        // 添加图标
        ['link', { rel: 'icon', href: 'logo.png' }]
    ],
    themeConfig: {
        // 网站 logo
        logo: 'logo.png',
        // 网站标题
        siteTitle: '小江的网站',
        // 启动页面丝滑滚动
        smoothScroll: true,
        // 社交账户链接
        socialLinks: [
            // {
            //     icon: {
            //         svg: '<svg t="1671270414569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2135" width="64" height="64"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#CE000D" p-id="2136"></path></svg>'
            //     },
            //     link: ''
            // }
        ],
        // 导航栏配置
        nav: [
            {
                text: '我的博客',
                link: '/blogs/'
            },
            // {
            //     text: '友情链接',
            //     items: [
            //         { text: 'CSDN', link: '' }
            //     ]
            // }
        ],

        // 左侧边栏配置
        sidebar: {
            '/blogs/': [
                {
                    text: '博客目录',
                    collapsible: true,
                    items: [
                        {text: '概述', link: '/blogs/'},
                        {text: '递归查询name', link: '/blogs/递归查询name'},
                        {text: '查询场景中模型数据', link: '/blogs/查询场景中模型数据'},
                        {text: '初始化模型视角', link: '/blogs/初始化模型视角'},
                        {text: '模型点击高亮效果', link: '/blogs/模型点击高亮效果'},
                        {text: '模型定位聚焦', link: '/blogs/模型定位聚焦'},
                        {text: '通过传入参数生成直线', link: '/blogs/通过传入参数生成直线+曲线的路径'},
                        {text: '通过three.path生成流动的箭头实现光路效果', link: '/blogs/通过three.path生成流动的箭头实现光路效果'},
                        {text: '异步并发生成标签', link: '/blogs/异步并发生成标签'},
                        {text: 'git协同开发', link: '/blogs/git协同开发'},
                        // {text: '开发规范', link: '/blogs/开发规范初版'},
                        {text: 'Map对象详解', link: '/blogs/Map对象详解'},
                        {text: 'Vue中的v-slot详解，作用域插槽和具名插槽', link: '/blogs/Vue中的v-slot详解，作用域插槽和具名插槽'},
                        {text: 'NProgress是什么', link: '/blogs/NProgress是什么'},
                        {text: 'Vue组件中name的三大作用', link: '/blogs/Vue组件中name的三大作用'},
                        {text: '使用 vue-router，页面加载完成后，$route 的值不正确', link: '/blogs/使用 vue-router，页面加载完成后，$route 的值不正确'},
                        {text: 'new Set()的基础用法(ES6)', link: '/blogs/new Set()的基础用法(ES6)'},
                        {text: 'JS中reduce的用法', link: '/blogs/JS中reduce的用法'},
                        {text: 'Promise.all', link: '/blogs/Promise.all'},
                        {text: 'JavaScript Class类详解', link: '/blogs/JavaScript Class类详解'},
                        {text: '有了for循环 为什么还要forEach？', link: '/blogs/有了for循环 为什么还要forEach？'},
                        {text: 'tween.js 中文使用指南', link: '/blogs/tween.js 中文使用指南'},
                        {text: 'Tween.js 基本使用', link: '/blogs/Tween.js 基本使用'},
                        {text: '大屏适配方案汇总', link: '/blogs/大屏适配方案汇总'},
                        {text: '创建文本标签', link: '/blogs/创建文本标签'},
                        {text: '封装websocket方法', link: '/blogs/封装websocket方法'},
                        {text: '前端异步(async)解决方案(所有方案)', link: '/blogs/前端异步(async)解决方案(所有方案)'},
                        {text: '关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用', link: '/blogs/关于three.js渲染器THREE.WebGLRenderer()参数的介绍和使用'},
                        {text: 'threejs实现简单全景看房demo😜', link: '/blogs/threejs实现简单全景看房demo😜'},
                        {text: 'ES6 Module 模块', link: '/blogs/ES6 Module 模块'},
                        {text: '浏览器的垃圾回收机制', link: '/blogs/浏览器的垃圾回收机制'},
                        {text: 'Three.js 性能优化和实践建议', link: '/blogs/Three.js 性能优化和实践建议'},
                        {text: 'Threejs logarithmicDepthBuffer 开启后 ShaderMaterial 会被模型遮挡问题', link: '/blogs/Threejs logarithmicDepthBuffer 开启后 ShaderMaterial 会被模型遮挡问题'},
                        {text: 'threejs电子围栏效果', link: '/blogs/threejs电子围栏效果'},
                        {text: 'threejs聚光灯效果', link: '/blogs/threejs聚光灯效果'},
                        {text: 'threejs雷达扫描效果', link: '/blogs/threejs雷达扫描效果'},
                        {text: 'threejs动态飞线效果', link: '/blogs/threejs动态飞线效果'},
                        {text: 'threejs信号波动效果', link: '/blogs/threejs信号波动效果'},
                        {text: 'Three.js 场景清理与资源释放', link: '/blogs/Three.js 场景清理与资源释放'},
                        {text: 'Three.js中实现垂直排列文字效果', link: '/blogs/Three.js中实现垂直排列文字效果'},
                        {text: 'path.module.js 使用文档', link: '/blogs/path.module.js 使用文档'},
                        {text: 'threejs ModelLoader使用文档', link: '/blogs/threejs ModelLoader使用文档'},
                        {text: 'threejs 材质', link: '/blogs/threejs 材质'},
                        {text: 'threejs 几何体', link: '/blogs/threejs 几何体'},
                        {text: 'threejs 渲染上百万个三角很卡 该如何优化呢', link: '/blogs/threejs 渲染上百万个三角很卡 该如何优化呢'},
                        {text: '在windows上docker运行流程文档', link: '/blogs/在windows上docker运行流程文档'},
                        {text: 'Windows 系统中安装 docker 及镜像加速的配置_windows docker 镜像加速', link: '/blogs/Windows 系统中安装 docker 及镜像加速的配置_windows docker 镜像加速'},
                        // {text: '所有面试题', link: '/blogs/所有面试题'},
                        {text: '更多', link: '/blogs/more'},
                    ]
                }
            ],
        },

        // 右侧边栏标题
        outline: 'deep',
        outlineTitle: '章节导航',

        // 上下篇文本提示文字
        docFooter: {
            prev: '←上一篇',
            next: '下一篇→'
        },

        // 上次更新时间提示文字
        lastUpdatedText: '上次更新时间',

        // 编辑链接
        // editLink: {
        //     text: '我的博客',
        //     pattern: 'https://www.csdn.net/'
        // },

        // 页面底部
        footer: {
            message: '',
            copyright: 'Copyright © 2023 JIANG'
        }
    }
}