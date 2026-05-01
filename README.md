# LUMIA 网站维护手册

## 一、运行项目

1. 安装依赖

```bash
npm install
```

2. 本地启动

```bash
npm run serve
```

3. 打包构建

```bash
npm run build
```

## 二、内容更新

日常内容数据维护请优先阅读 [CONTENT_UPDATE_GUIDE.md](./CONTENT_UPDATE_GUIDE.md)。

当前主要需要外部维护的内容数据包括：

- 成员：`src/data/people.js`
- 论文与研究方向：`src/data/publications.js`、`src/data/researchTags.js`、`src/data/researchDirections/`
- 新闻：`src/data/news.js`

其他较少改动的站点配置包括：

- 首页基础信息：`src/data/home.js`
- 联系页面信息：`src/data/contact.js`
- 顶部 Logo 等头部数据：`src/data/header.js`
- 首页合作伙伴 Logo：`src/views/HomeView.vue`、`src/assets/partners/`

`src/data/research.js` 是旧版研究页数据文件，当前 `/research` 页面不再从这里读取论文数据。

## 三、维护后检查

1. 本地启动后检查主要页面：

- 首页：`/`
- 成员页：`/people`
- 研究页：`/research`
- 新闻页：`/news`

2. 检查中英文切换、站内跳转、外部链接和图片展示是否正常。

3. 提交 PR 前运行：

```bash
npm run build
```
