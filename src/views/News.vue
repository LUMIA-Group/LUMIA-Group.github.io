<template>
  <div class="news-container">
    <div class="news-content">
      <ul class="row">
        <li>
          Sep 2023:
          <a href="https://openreview.net/pdf?id=t2hEZadBBk">One paper</a> got
          accepted at NeurIPS 2023!
        </li>
        <li>
          May 2023: Two papers (<a
            href="https://aclanthology.org/2023.acl-long.281/"
            >[1]</a
          ><a href="https://aclanthology.org/2023.findings-acl.570/">[2]</a>)
          are accepted at ACL 2023!
        </li>
        <li>
          Mar. 2023:
          <a href="https://scholar.google.com/citations?user=C-TqDNsAAAAJ"
            >Yunchong Song</a
          >
          has got the ICLR Travel Award, congratuations!
        </li>
        <li>
          Feb. 2023: Two papers (<a href="https://arxiv.org/abs/2302.09509"
            >[1]</a
          ><a href="https://arxiv.org/abs/2304.05361">[2]</a>) are accepted at
          ICASSP 2023!
        </li>
        <li>
          Jan. 2023:
          <a href="https://openreview.net/forum?id=wKPmPBHSnT6">One paper</a> is
          accepted at ICLR 2023!
        </li>
        <li>
          Oct. 2022: Three papers (<a
            href="https://aclanthology.org/2022.emnlp-main.211/"
            >[1]</a
          ><a href="https://aclanthology.org/2022.findings-emnlp.173/">[2]</a
          ><a href="https://aclanthology.org/2022.findings-emnlp.114//">[3]</a>)
          are accepted at EMNLP 2022!
        </li>
        <li>
          Feb. 2022: Two papers (<a
            href="https://aclanthology.org/2022.acl-long.308/"
            >[1]</a
          ><a href="https://aclanthology.org/2022.acl-long.502/">[2]</a>) are
          accepted at ACL 2022!
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { newsData } from "@/data/news";
export default {
  data() {
    return {
      newsData: newsData,
    };
  },
};
</script>
<style lang="less" scoped>
.news-content {
  max-width: 1280px;
  margin: auto;
  padding-top: 80px;
  text-align: left;
  li {
    list-style: circle;
    line-height: 36px;
  }
}
</style>