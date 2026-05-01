// 新闻数据接入规范：
// {
//   id: "稳定的新闻 slug，用于站内详情页路由",
//   title: "中文新闻标题，用于中文首页和中文新闻页面展示",
//   title_en: "英文新闻标题，用于英文首页和英文新闻页面展示",
//   date: "YYYY-MM 或 YYYY-MM-DD，展示时会按当前语言转换",
//   link: "外部链接或站内路径；如果是站内详情新闻，可以留空",
//   content: {
//     zh: "<p>中文详情页正文 HTML，只填写内容部分</p>",
//     en: "<p>英文详情页正文 HTML，只填写内容部分</p>",
//   },
// }
// link 是 http(s) 外部链接时，新闻条目会直接跳转外部页面。
// link 留空或填写站内路径时，新闻条目会作为站内新闻处理，并要求 content.zh 和 content.en 都存在。

const MONTH_NAMES_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isExternalUrl(value) {
  return /^https?:\/\//i.test(String(value || "").trim());
}

export function formatNewsDate(date, language = "zh") {
  const normalized = String(date || "").trim();
  const match = normalized.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);

  if (!match) {
    return normalized;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = match[3] ? Number(match[3]) : null;
  const monthLabel = MONTH_NAMES_EN[month - 1];

  if (!year || !monthLabel) {
    return normalized;
  }

  if (language === "en") {
    return day ? `${monthLabel} ${day}, ${year}` : `${monthLabel} ${year}`;
  }

  return day ? `${year}年${month}月${day}日` : `${year}年${month}月`;
}

export function isExternalNews(news) {
  return Boolean(news && isExternalUrl(news.link));
}

export function hasInternalNewsContent(news) {
  const content = (news && news.content) || {};
  return Boolean(content.zh && content.en);
}

export function isInternalNews(news) {
  return Boolean(news && !isExternalNews(news) && hasInternalNewsContent(news));
}

export function getNewsContent(news, language = "zh") {
  const content = (news && news.content) || {};
  return content[language] || content.zh || content.en || "";
}

export function getNewsTitle(news, language = "zh") {
  if (!news) {
    return "";
  }

  if (language === "en") {
    return news.title_en || news.title || "";
  }

  return news.title || news.title_en || "";
}

export const newsData = {
  newsList: [
    {
      id: "neurips-2023-paper",
      title: "一篇论文被 NeurIPS 2023 接收！",
      title_en: "One paper got accepted at NeurIPS 2023!",
      date: "2023-09",
      link: "https://openreview.net/pdf?id=t2hEZadBBk",
    },
    {
      id: "acl-2023-two-papers",
      title: "两篇论文被 ACL 2023 接收！",
      title_en: "Two papers are accepted at ACL 2023!",
      date: "2023-05",
      link: "",
      content: {
        zh: `
          <p>LUMIA Group 有两篇论文被 ACL 2023 接收。本页面汇总原新闻条目中的论文链接，方便进一步查看。</p>
          <h2>相关链接</h2>
          <ul>
            <li><a href="https://aclanthology.org/2023.acl-long.281/" target="_blank" rel="noopener noreferrer">ACL 2023 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2023.findings-acl.570/" target="_blank" rel="noopener noreferrer">ACL 2023 paper [2]</a></li>
          </ul>
        `,
        en: `
          <p>Two LUMIA Group papers were accepted at ACL 2023. This page collects the original paper links from the lab news item.</p>
          <h2>Related Links</h2>
          <ul>
            <li><a href="https://aclanthology.org/2023.acl-long.281/" target="_blank" rel="noopener noreferrer">ACL 2023 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2023.findings-acl.570/" target="_blank" rel="noopener noreferrer">ACL 2023 paper [2]</a></li>
          </ul>
        `,
      },
    },
    {
      id: "iclr-2023-travel-award",
      title: "Yunchong Song 获得 ICLR Travel Award，祝贺！",
      title_en: "Yunchong Song has got the ICLR Travel Award, congratulations!",
      date: "2023-03",
      link: "https://scholar.google.com/citations?user=C-TqDNsAAAAJ",
    },
    {
      id: "icassp-2023-two-papers",
      title: "两篇论文被 ICASSP 2023 接收！",
      title_en: "Two papers are accepted at ICASSP 2023!",
      date: "2023-02",
      link: "",
      content: {
        zh: `
          <p>LUMIA Group 有两篇论文被 ICASSP 2023 接收。本页面汇总原新闻条目中的论文链接，方便进一步查看。</p>
          <h2>相关链接</h2>
          <ul>
            <li><a href="https://arxiv.org/abs/2302.09509" target="_blank" rel="noopener noreferrer">ICASSP 2023 paper [1]</a></li>
            <li><a href="https://arxiv.org/abs/2304.05361" target="_blank" rel="noopener noreferrer">ICASSP 2023 paper [2]</a></li>
          </ul>
        `,
        en: `
          <p>Two LUMIA Group papers were accepted at ICASSP 2023. This page collects the original paper links from the lab news item.</p>
          <h2>Related Links</h2>
          <ul>
            <li><a href="https://arxiv.org/abs/2302.09509" target="_blank" rel="noopener noreferrer">ICASSP 2023 paper [1]</a></li>
            <li><a href="https://arxiv.org/abs/2304.05361" target="_blank" rel="noopener noreferrer">ICASSP 2023 paper [2]</a></li>
          </ul>
        `,
      },
    },
    {
      id: "iclr-2023-paper",
      title: "一篇论文被 ICLR 2023 接收！",
      title_en: "One paper is accepted at ICLR 2023!",
      date: "2023-01",
      link: "https://openreview.net/forum?id=wKPmPBHSnT6",
    },
    {
      id: "emnlp-2022-three-papers",
      title: "三篇论文被 EMNLP 2022 接收！",
      title_en: "Three papers are accepted at EMNLP 2022!",
      date: "2022-10",
      link: "",
      content: {
        zh: `
          <p>LUMIA Group 有三篇论文被 EMNLP 2022 接收。本页面汇总原新闻条目中的论文链接，方便进一步查看。</p>
          <h2>相关链接</h2>
          <ul>
            <li><a href="https://aclanthology.org/2022.emnlp-main.211/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2022.findings-emnlp.173/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [2]</a></li>
            <li><a href="https://aclanthology.org/2022.findings-emnlp.114/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [3]</a></li>
          </ul>
        `,
        en: `
          <p>Three LUMIA Group papers were accepted at EMNLP 2022. This page collects the original paper links from the lab news item.</p>
          <h2>Related Links</h2>
          <ul>
            <li><a href="https://aclanthology.org/2022.emnlp-main.211/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2022.findings-emnlp.173/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [2]</a></li>
            <li><a href="https://aclanthology.org/2022.findings-emnlp.114/" target="_blank" rel="noopener noreferrer">EMNLP 2022 paper [3]</a></li>
          </ul>
        `,
      },
    },
    {
      id: "acl-2022-two-papers",
      title: "两篇论文被 ACL 2022 接收！",
      title_en: "Two papers are accepted at ACL 2022!",
      date: "2022-02",
      link: "",
      content: {
        zh: `
          <p>LUMIA Group 有两篇论文被 ACL 2022 接收。本页面汇总原新闻条目中的论文链接，方便进一步查看。</p>
          <h2>相关链接</h2>
          <ul>
            <li><a href="https://aclanthology.org/2022.acl-long.308/" target="_blank" rel="noopener noreferrer">ACL 2022 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2022.acl-long.502/" target="_blank" rel="noopener noreferrer">ACL 2022 paper [2]</a></li>
          </ul>
        `,
        en: `
          <p>Two LUMIA Group papers were accepted at ACL 2022. This page collects the original paper links from the lab news item.</p>
          <h2>Related Links</h2>
          <ul>
            <li><a href="https://aclanthology.org/2022.acl-long.308/" target="_blank" rel="noopener noreferrer">ACL 2022 paper [1]</a></li>
            <li><a href="https://aclanthology.org/2022.acl-long.502/" target="_blank" rel="noopener noreferrer">ACL 2022 paper [2]</a></li>
          </ul>
        `,
      },
    },
  ],
};
