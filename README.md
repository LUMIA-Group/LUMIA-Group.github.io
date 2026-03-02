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

## 二、常见内容维护（合作伙伴 Logo / 成员 / 研究论文）

### 0. 文件定位速查
- 合作伙伴 Logo：`src/views/HomeView.vue`、`src/assets/partners/`
- 成员数据：`src/data/people.js`
- 成员头像：`public/static/people/`
- 研究论文列表：`src/views/Research.vue`
- 论文方向标签：`src/data/researchTags.js`
- 论文配图：`src/assets/research/`

### 1. 更新合作伙伴 Logo（首页）
合作伙伴区在 `src/views/HomeView.vue` 中维护，分两步：

1. 放入 Logo 文件
- 将新 Logo 放到 `src/assets/partners/`。
- 建议优先使用 `svg`（清晰、体积小），也可用 `png`。
- 文件名尽量使用英文和短横线，便于维护。

2. 在 `HomeView.vue` 注册并配置
- 在文件顶部 `import` 新 Logo。
- 在 `partnerLogos()` 返回数组中新增或替换一项。
- 每项字段说明：
  - `id`：唯一 id。
  - `name`：机构名称（用于 `alt` 文本）。
  - `logo`：对应 `import` 的图片变量。
  - `x` / `y`：Logo 气泡在面板内的位置（百分比）。
  - `size`：气泡直径（px）。
  - `duration` / `delay` / `lift` / `sway`：浮动动画参数。
  - `logoScale`：Logo 在气泡内缩放比例。

常见调整建议：
- 出现重叠时，先调 `x` / `y`，再微调 `size`。
- Logo 偏小或偏大时，优先调 `logoScale`。
- 删除合作方时，直接删除对应数组项和未使用的 `import`。

### 2. 更新成员（People 页面）
成员信息在 `src/data/people.js` 维护，头像在 `public/static/people/`。

1. 准备头像
- 新头像放到 `public/static/people/`，如 `s-16.jpg`。
- 在 `people.js` 中使用相对路径：`"./static/people/s-16.jpg"`。
- 若 `pic` 为空字符串，会自动显示默认头像（`src/assets/default.jpg`）。

2. 修改成员数据
- 在 `src/data/people.js` 的分组数组中新增/修改对象。
- 当前分组键：`Faculty`、`PhD`、`Master`、`Undergrads`、`Alumni`。
- 每个成员对象字段：
  - `id`：数字 id（建议保持唯一）。
  - `name`：姓名。
  - `pic`：头像路径（见上）。
  - `grade`：研究方向/简介。
  - `homepage`：个人主页链接（可为空）。

3. 新增类别（仅当现有分组不够用）
- 在 `people.js` 新增分组键后，还需在 `src/views/People.vue` 里的 `I18N.sectionTitles` 增加中英文标题映射；否则页面会直接显示原始键名。

### 3. 更新研究论文（Research 页面）
论文内容是写在 `src/views/Research.vue` 模板里的，不是独立数据文件。

1. 准备论文配图（可选但推荐）
- 将配图放入 `src/assets/research/`。
- 在论文条目的 `<img src="...">` 中引用，例如：
  `src="./../assets/research/xxx.png"`。

2. 新增/修改论文条目
- 打开 `src/views/Research.vue`，在 `<!-- 在这里新建一个新的research -->` 注释附近，复制一个现有 `<div class="row"> ... </div>` 块进行编辑。
- 关键结构建议保持一致：
  - `<h4>`：论文标题（后续标签绑定依赖标题匹配）。
  - `.author`：作者信息。
  - `.link-list`：会议信息和 `pdf/code` 链接。
  - `<article>`：摘要简介。

3. 维护方向标签（推荐）
- 打开 `src/data/researchTags.js`，在 `PAPER_TAG_TITLE_MAP` 中新增一条映射：
  - key：论文标题（尽量与 `Research.vue` 里的 `<h4>` 一致）。
  - value：标签数组，如 `["language-models"]`。
- 可选标签见 `RESEARCH_TAGS`：`language-models`、`multimodal-learning`、`graph-learning`、`trustworthy-ai`。

说明：
- 如果不在 `PAPER_TAG_TITLE_MAP` 配置，论文仍会显示，但不会带方向标签，也无法被方向筛选命中。

## 三、维护后检查清单
1. 本地启动后检查以下页面：
- 首页合作伙伴区：Logo 是否清晰、无重叠、动效正常。
- People 页面：分组标题、人数统计、头像和外链是否正常。
- Research 页面：论文是否展示、搜索是否命中、标签筛选是否正确。
2. 打包构建检查：
```bash
npm run build
```
3. 确认无误后提交代码。
