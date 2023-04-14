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