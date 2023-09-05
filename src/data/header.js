// 网站header相关数据
// 按规则修改和添加内容即可，请不要更改数据结构以及变量命名
export const headerData = {
    // 网站名称
    name: 'Name',
    // logo图片路径
    logo: '',
    // header中的每一个tab
    headerList: [{
            // 对应的路由名称，需要与router文件夹中的路由对应，详情见readme
            value: "people",
            // 显示在网页header中的名字
            label: "People",
        },
        {
            value: "research",
            label: "Research",
        },
        {
            value: "news",
            label: "News",
        },
        {
            // 若需要链接到外部网站，需要加一个type: "link"，则在value中填入链接的URL
            value: "http://github",
            label: "Github",
            type: "link",
        },
        {
            value: "contact",
            label: "Contact",
        },
    ],
}