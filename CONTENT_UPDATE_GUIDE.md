# LUMIA 网站内容更新说明

这份文档说明如何更新网站中需要定期维护的内容数据。当前网站的主要内容数据集中在三类：

- 成员：`src/data/people.js`
- 论文与研究方向：`src/data/publications.js`、`src/data/researchTags.js`
- 新闻：`src/data/news.js`

另外还有一些较少改动的站点配置或页面文案数据，例如 `src/data/home.js`、`src/data/contact.js`、`src/data/header.js`，以及首页合作伙伴 Logo 配置在 `src/views/HomeView.vue`。`src/data/research.js` 是旧版研究页数据文件，当前 `/research` 页面不再从这里读取论文数据。

## 提交 PR 的流程

1. 从最新主分支创建新分支。

```bash
git checkout main
git pull
git checkout -b content/update-something
```

2. 按本文说明修改对应数据文件和图片资源。

3. 本地预览并检查页面。

```bash
npm install
npm run serve
```

重点检查：

- 首页：新闻、当前研究重点是否正确。
- 成员页：分组、人数、头像、个人主页链接是否正确。
- 研究页：论文列表、研究方向筛选、搜索、链接是否正确。
- 新闻页：新闻列表、站内新闻详情、外部跳转是否正确。
- 中英文切换后标题和内容是否正确。

4. 打包检查。

```bash
npm run build
```

5. 提交代码并发起 PR。

```bash
git status
git add src/data/people.js src/data/publications.js src/data/researchTags.js src/data/news.js public/static/people src/assets/research
git commit -m "Update website content"
git push -u origin content/update-something
```

PR 描述建议包含：

- 本次新增或修改了哪些内容。
- 涉及哪些页面：主页、成员页、研究页、新闻页。
- 是否新增图片资源。
- 本地 `npm run build` 是否通过。
- 必要时附页面截图。

注意：

- 不要提交 `node_modules/`。
- 没有改依赖时，不需要修改 `package.json` 或 `package-lock.json`。
- 不要直接向 `main` 分支提交内容更新。

## 成员数据

### 修改文件

- 成员数据：`src/data/people.js`
- 成员头像：`public/static/people/`

### 分组

当前成员页支持这些分组：

- `Faculty`：教师
- `PhD`：博士生
- `Master`：硕士生
- `Undergrads`：本科生
- `Alumni`：毕业生

页面会自动展示非空分组。一般情况下，一个成员只放在一个分组中；学生毕业后，应从原学生分组移动到 `Alumni`，避免重复展示。

### 成员格式

```js
{
  id: 16,
  name: "张三",
  pic: "./static/people/s-16.jpg",
  bio: "自然语言处理、大语言模型",
  homepage: "https://example.com"
}
```

字段说明：

- `id`：数字，建议在全站成员数据中保持唯一。
- `name`：姓名，必填。
- `pic`：头像路径。头像放在 `public/static/people/`，数据中写成 `./static/people/文件名`。如果暂时没有头像，可写空字符串 `""`，页面会使用默认头像。
- `bio`：研究方向、简介或身份说明，必填。
- `homepage`：个人主页、Google Scholar、GitHub 等链接。没有链接可写空字符串 `""`。

### 新增成员示例

1. 将头像保存到 `public/static/people/s-16.jpg`。
2. 在对应分组数组中新增成员对象。

```js
Master: [
  {
    id: 16,
    name: "张三",
    pic: "./static/people/s-16.jpg",
    bio: "自然语言处理、大语言模型",
    homepage: "https://example.com",
  },
],
```

### 新增成员分组

如果现有分组不够用，需要同时修改：

- `src/data/people.js`：新增分组数组。
- `src/views/People.vue`：在 `I18N.sectionTitles` 中增加中英文分组标题。
- `src/views/People.vue`：如果该分组需要出现在页眉跳转按钮中，也要加入 `peopleJumpLinks()`。

## 论文与研究方向数据

### 修改文件

- 论文数据：`src/data/publications.js`
- 研究方向数据：`src/data/researchTags.js`
- 研究方向详情正文：`src/data/researchDirections/`
- 论文配图：`src/assets/research/`

当前研究页、论文搜索、论文卡片链接、研究方向筛选都从这些数据文件读取。首页“当前研究重点”也从 `src/data/researchTags.js` 读取。

### 论文格式

如果论文有配图，先把图片放到 `src/assets/research/`，并在 `src/data/publications.js` 顶部 import：

```js
import exampleImage from "@/assets/research/example.png";
```

然后在 `publications` 数组中新增对象：

```js
{
  id: "example-paper",
  title: "Example Paper Title",
  authors: "First Author, Second Author, Zhouhan Lin#",
  venue: "ACL 2026",
  image: exampleImage,
  pdf: "https://example.com/paper.pdf",
  github: "https://github.com/example/project",
  huggingface: "https://huggingface.co/example/model",
  homepage: "https://example.com/project",
  tagIds: ["higher-level-lm"],
  abstract: "This paper studies ...",
}
```

字段说明：

- `id`：论文唯一 slug，使用小写英文、数字和短横线，例如 `example-paper`。
- `title`：论文标题，必填。
- `authors`：作者列表，使用普通文本，不要填写 HTML。
- `venue`：会议、期刊或年份信息，必填。
- `image`：论文配图变量。没有配图时可写空字符串 `""`。
- `pdf`：论文 PDF 链接。没有时写空字符串 `""`。
- `github`：代码仓库链接。没有时写空字符串 `""`。
- `huggingface`：Hugging Face 链接。没有时写空字符串 `""`。
- `homepage`：论文项目主页链接。没有时写空字符串 `""`。
- `tagIds`：研究方向标签数组，值必须来自 `src/data/researchTags.js` 中的 `id`。
- `abstract`：论文简介或摘要，必填。

论文卡片只会展示非空链接。链接展示顺序固定为：`PDF`、`GitHub`、`Hugging Face`、`Project Page`。

### 研究方向格式

研究方向在 `src/data/researchTags.js` 的 `RESEARCH_TAGS` 中维护：

```js
{
  id: "higher-level-lm",
  name: {
    zh: "概念级语言模型",
    en: "Concept-Level Language Models",
  },
  intro: {
    zh: "探索从 token 级预测走向概念、状态与更高层语义结构建模。",
    en: "Moving beyond token-level prediction toward concepts, states, and higher-level semantic structures.",
  },
}
```

字段说明：

- `id`：稳定标签 ID。会用于 `/research?tag=...`、论文 `tagIds`、首页研究方向卡片和研究页方向筛选。已经上线后不要随意改名；如果必须改，需要同步更新所有论文的 `tagIds` 和旧链接。
- `name.zh` / `name.en`：中英文方向名称。
- `intro.zh` / `intro.en`：中英文方向介绍，会显示在研究页方向内容区。
- 首页只展示 `RESEARCH_TAGS` 数组中的前 4 个方向，研究页会展示全部方向。

当前方向 ID：

- `differentiable-memory`：可微记忆
- `higher-level-lm`：概念级语言模型
- `latent-ponder`：隐思考机制
- `gfn-rl`：生成流网络与强化学习
- `efficient-lm`：高效化
- `graph-learning`：图学习与结构化推理

### 给论文绑定方向

在论文对象中填写：

```js
tagIds: ["higher-level-lm", "efficient-lm"],
```

如果 `tagIds` 为空或填写了不存在的标签，该论文不会被对应方向筛选命中。

### 研究方向详情正文

研究页中选择某个小方向后，方向标题和短介绍来自 `src/data/researchTags.js`，标题下方的详情正文来自 `src/data/researchDirections/`。

当前已有详情正文文件：

- `src/data/researchDirections/higher-level-lm.js`
- `src/data/researchDirections/latent-ponder.js`

每个文件格式如下：

```js
export default {
  tagId: "higher-level-lm",
  content: {
    zh: `
      <section>
        <h3>方向概览</h3>
        <p>这里填写中文正文。</p>
      </section>
    `,
    en: `
      <section>
        <h3>Overview</h3>
        <p>Write the English content here.</p>
      </section>
    `,
  },
};
```

说明：

- `tagId` 必须和 `src/data/researchTags.js` 中的方向 `id` 完全一致。
- `content.zh` 和 `content.en` 分别是中文、英文方向详情正文。
- 正文使用 HTML 字符串渲染，可以只填写内容段落，也可以像独立内容页一样自带标题、页眉和完整结构。
- 可使用常见 HTML 标签，如 `<article>`、`<header>`、`<section>`、`<h1>`、`<h2>`、`<h3>`、`<p>`、`<ul>`、`<li>`、`<a>`。
- 如果新增了研究方向，也需要在 `src/data/researchDirections/index.js` 中 import 新文件并加入 `researchDirectionPages`。
- 如果某个方向暂时没有详情正文，可以先不新增对应文件；研究页会只展示方向简介和论文筛选，不展示详情内容框。

## 新闻数据

### 修改文件

- 新闻数据：`src/data/news.js`

新闻会显示在首页“实验室新闻”和 `/news` 新闻页中。外部新闻会直接跳转外部链接；站内新闻会跳转到 `/news/:id` 详情页。

### 新闻格式

```js
{
  id: "acl-2026-paper",
  title: "一篇论文被 ACL 2026 接收！",
  title_en: "One paper is accepted at ACL 2026!",
  date: "2026-05",
  link: "https://example.com",
}
```

字段说明：

- `id`：稳定新闻 slug，用于站内详情页路由。使用小写英文、数字和短横线。
- `title`：中文标题，用于中文首页和中文新闻页。
- `title_en`：英文标题，用于英文首页和英文新闻页。
- `date`：日期，格式为 `YYYY-MM` 或 `YYYY-MM-DD`。页面展示时会按当前语言转换。
- `link`：新闻跳转链接。

### 单链接新闻

如果一条新闻只有一个外部链接，直接填写 `link`：

```js
{
  id: "neurips-2026-paper",
  title: "一篇论文被 NeurIPS 2026 接收！",
  title_en: "One paper got accepted at NeurIPS 2026!",
  date: "2026-09",
  link: "https://openreview.net/example",
}
```

这种新闻点击后会直接打开外部页面，不需要写 `content`。

### 多链接或需要站内说明的新闻

如果一条新闻需要介绍文字，或者原始信息包含多个链接，建议做成站内详情页。此时 `link` 留空，并填写 `content.zh` 和 `content.en`：

```js
{
  id: "acl-2026-two-papers",
  title: "两篇论文被 ACL 2026 接收！",
  title_en: "Two papers are accepted at ACL 2026!",
  date: "2026-05",
  link: "",
  content: {
    zh: `
      <p>LUMIA Group 有两篇论文被 ACL 2026 接收。本页面汇总相关链接，方便进一步查看。</p>
      <h2>相关链接</h2>
      <ul>
        <li><a href="https://example.com/paper-1" target="_blank" rel="noopener noreferrer">ACL 2026 paper [1]</a></li>
        <li><a href="https://example.com/paper-2" target="_blank" rel="noopener noreferrer">ACL 2026 paper [2]</a></li>
      </ul>
    `,
    en: `
      <p>Two LUMIA Group papers were accepted at ACL 2026. This page collects the related links.</p>
      <h2>Related Links</h2>
      <ul>
        <li><a href="https://example.com/paper-1" target="_blank" rel="noopener noreferrer">ACL 2026 paper [1]</a></li>
        <li><a href="https://example.com/paper-2" target="_blank" rel="noopener noreferrer">ACL 2026 paper [2]</a></li>
      </ul>
    `,
  },
}
```

注意：

- `content` 只填写详情页正文内容，不需要写页面标题和日期。
- 站内新闻要求 `content.zh` 和 `content.en` 都存在。
- `content` 使用 HTML 字符串渲染，内容必须来自可信来源。
- 外部链接建议加上 `target="_blank"` 和 `rel="noopener noreferrer"`。

## 更新后的检查清单

每次内容更新后，至少检查：

- `npm run build` 是否通过。
- `/` 首页：新闻、当前研究重点是否更新。
- `/people` 成员页：分组、头像、跳转按钮、人数统计是否正确。
- `/research` 研究页：方向按钮、方向筛选、论文搜索、详细/简要视图、论文链接是否正确。
- `/news` 新闻页：新闻条目、日期格式、外部链接、站内详情页是否正确。
- 中英文切换：成员分组、研究方向、新闻标题和新闻详情是否正确。
