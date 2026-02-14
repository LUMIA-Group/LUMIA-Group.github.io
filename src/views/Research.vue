<template>
  <div class="research-container">
    <section class="lumia-section research-hero">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">{{ text.eyebrow }}</p>
        <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">{{ text.title }}</h1>
        <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
          {{ text.subtitle }}
        </p>
        <div class="repo-entry lumia-fade-up" style="--delay: 200ms">
          <span>{{ text.repoLabel }}</span>
          <a
            href="https://github.com/LUMIA-Group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ text.repoLink }}
          </a>
        </div>
      </div>
    </section>

    <section class="lumia-section research-content">
      <div class="lumia-container">
        <div class="research-toolbar">
          <label class="search-box" for="paper-search">
            <span>{{ text.searchLabel }}</span>
            <input
              id="paper-search"
              v-model.trim="searchKeyword"
              type="text"
              :placeholder="text.searchPlaceholder"
            />
          </label>
          <div class="view-switch" role="group" aria-label="paper view switch">
            <button
              type="button"
              class="switch-btn"
              :class="{ active: viewMode === 'detailed' }"
              @click="setViewMode('detailed')"
            >
              {{ text.detailedView }}
            </button>
            <button
              type="button"
              class="switch-btn"
              :class="{ active: viewMode === 'compact' }"
              @click="setViewMode('compact')"
            >
              {{ text.compactView }}
            </button>
          </div>
        </div>
        <p class="result-count">{{ filteredPapers.length }} {{ text.results }}</p>

        <section
          id="publications"
          class="section-item"
          v-show="viewMode === 'detailed'"
        >
        <section class="research-section" ref="detailedSection">
          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/fouriertransformer.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Fourier Transformer: Fast Long Range Modeling by Removing
                Sequence Redundancy with FFT Operator
              </h4>
              <p class="author">
                Ziwei He, Meng Yang, Minwei Feng, Jingcheng Yin, Xinbing Wang,
                Jingwen Leng, <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span>ACL 2023 (Findings) </span>
                <span> | </span>
                <a href="https://aclanthology.org/2023.findings-acl.570.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/LUMIA-Group/FourierTransformer"
                  ><span>codes</span></a
                >
              </div>
              <article>
                We propose Fourier Transformer, a simple yet effective approach
                by layer-wise progressively removing sequence redundancies in
                hidden states using the ready-made Fast Fourier Transform (FFT)
                operator to perform Discrete Cosine Transformation (DCT).
                Fourier Transformer is able to significantly reduce
                computational costs while retaining the ability to inherit from
                various large pretrained models. SOTA performances among all
                transformer-based models on the LRA benchmark with significant
                improvement in both speed and space. For generative seq-to-seq
                tasks including CNN/DailyMail and ELI5, by inheriting the BART
                weights our model outperforms the standard BART and other
                efficient models.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/lotinsts.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Text Classification In The Wild: A Large-Scale Long-Tailed Name
                Normalization Dataset
              </h4>
              <p class="author">
                Jiexing Qi, Shuhao Li, Zhixin Guo, Yusheng Huang, Chenghu Zhou,
                Weinan Zhang, Xinbing Wang,
                <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span>ICASSP 2023 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2302.09509.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/LUMIA-Group/LoT-insts"
                  ><span>codes</span></a
                >
              </div>
              <article>
                In this work, we first collect a large-scale institution name
                normalization dataset LoT-insts, which contains over 25k classes
                that exhibit a naturally long-tailed distribution. In order to
                isolate the few-shot and zero-shot learning scenarios from the
                massive many-shot classes, we construct our test set from four
                different subsets: many-, medium-, and few-shot sets, as well as
                a zero-shot open set. We believe it provides an important and
                different scenario to study this problem.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/orderedgnn.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Ordered GNN: Ordering Message Passing to Deal with Heterophily
                and Over-smoothing
              </h4>
              <p class="author">
                Yunchong Song, Chenghu Zhou, Xinbing Wang,
                <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span>ICLR 2023 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2302.01524.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/LUMIA-Group/OrderedGNN"
                  ><span>codes</span></a
                >
              </div>
              <article>
                In this work, we propose to tackle both heterophily and
                over-smoothing problems by an ordered message passing mecanism,
                with specific blocks of neurons in a node embedding targeted for
                messages passed from neighboring nodes that are located within
                specific hops. This is achieved by aligning the hierarchy of the
                rooted-tree of a central node with the ordered neurons in its
                node representation. SOTA performance in both homophily and
                heterophily settings without any targeted design, robust to a
                wide number of layers, and explainable.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/rasat.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                RASAT: Integrating Relational Structures into Pretrained Seq2Seq
                Model for Text-to-SQL
              </h4>
              <p class="author">
                Jiexing Qi, Jingyao Tang, Ziwei He, Xiangpeng Wan, Yu Cheng,
                Chenghu Zhou, Xinbing Wang, Quanshi Zhang,
                <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span>EMNLP 2022 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2205.06983.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/LUMIA-Group/rasat"
                  ><span>codes</span></a
                >
              </div>
              <article>
                Relational structures such as schema linking and schema encoding
                have been validated as a key component to qualitatively
                translating natural language into SQL queries. We propose RASAT:
                a Transformer seq2seq architecture augmented with relation-aware
                self-attention that could leverage a variety of relational
                structures while still being able to inherit the pretrained
                parameters from the T5 model effectively. Our model can
                incorporate almost all types of existing relations in the
                literature. Experimental results on three widely used
                text-to-SQL datasets, covering both single-turn and multi-turn
                scenarios, have shown that RASAT could achieve state-of-the-art
                results across all three benchmarks (75.5% EX on Spider, 52.6%
                IEX on SParC, and 37.4% IEX on CoSQL).
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/distancetransformer.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Syntax-guided Localized Self-attention by Constituency Syntactic
                Distance
              </h4>
              <p class="author">
                Shengyuan Hou*, Jushi Kai*, Haotian Xue*, Bingyu Zhu, Bo Yuan,
                Longtao Huang, Xinbing Wang,
                <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span>EMNLP 2022 (Findings) </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2210.11759.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/LUMIA-Group/distance_transformer"
                  ><span>codes</span></a
                >
              </div>
              <article>
                We propose a syntax-guided localized self-attention for
                Transformer that allows directly incorporating grammar
                structures from an external constituency parser. It prohibits
                the attention mechanism from overweight the grammatically
                distant tokens over close ones.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/avsrpan.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Leveraging Unimodal Self-Supervised Learning for Multimodal
                Audio-Visual Speech Recognition
              </h4>
              <p class="author">
                Xichen Pan, Peiyu Chen, Yichen Gong, Helong Zhou, Xinbing Wang,
                <span style="font-weight: 500">Zhouhan Lin#</span>
              </p>
              <div class="link-list">
                <span> ACL 2022 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2203.07996.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a
                  href="https://github.com/LUMIA-Group/Leveraging-Self-Supervised-Learning-for-AVSR"
                  ><span>codes</span></a
                >
              </div>
              <article>
                In this work, we successfully leverage unimodal self-supervised
                learning to promote the multimodal AVSR. In particular, audio
                and visual front-ends are trained on large-scale unimodal
                datasets, and then we integrate components of both front-ends
                into a larger multimodal framework that learns to recognize
                parallel audio-visual data into characters through a combination
                of CTC and seq2seq decoding. We show that both components
                inherited from unimodal self-supervised learning cooperate well,
                resulting in the multimodal framework yielding competitive
                results through fine-tuning. Even without an external language
                model, our proposed model raises the SOTA performances on the
                widely accepted Lip Reading Sentences 2 (LRS2) dataset by a
                large margin, with a relative improvement of 30%.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/blockskim.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>Block-Skim: Efficient Question Answering for Transformer</h4>
              <p class="author">
                Yue Guan, Zhengyi Li, Jingwen Leng#,
                <span style="font-weight: 500">Zhouhan Lin#</span>, Minyi Guo,
                Yuhao Zhu
              </p>
              <div class="link-list">
                <span> AAAI 2022 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2112.08560.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/chandlerguan/blockskim"
                  ><span>codes</span></a
                >
              </div>
              <article>
                We propose Block-skim, which learns to skim unnecessary context
                in higher hidden layers to improve and accelerate the
                Transformer performance. The key idea of Block-Skim is to
                identify the context that must be further processed and those
                that could be safely discarded early on during inference.
                Critically, we find that such information could be sufficiently
                derived from the self-attention weights inside the Transformer
                model. We further prune the hidden states corresponding to the
                unnecessary positions early in lower layers, achieving
                significant inference-time speedup. To our surprise, we observe
                that models pruned in this way outperform their full-size
                counterparts.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/distancelmwenyu.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Exploiting Syntactic Structure for Better Language Modeling: A
                Syntactic Distance Approach
              </h4>
              <p class="author">
                Wenyu Du*, <span style="font-weight: 500">Zhouhan Lin</span>*,
                Yikang Shen, Timothy J. O'Donnell, Yoshua Bengio, Yue Zhang#
              </p>
              <div class="link-list">
                <span> ACL 2020 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/2005.05864.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="t https://github.com/wenyudu/SDLM"
                  ><span>codes</span></a
                >
              </div>
              <article>
                It is commonly believed that knowledge of syntactic structure
                should improve language modeling. However, effectively and
                computationally efficiently incorporating syntactic structure
                into neural language models has been a challenging topic. In
                this paper, we make use of a multi-task objective, i.e., the
                models simultaneously predict words as well as ground truth
                parse trees in a form called "syntactic distances", where
                information between these two separate objectives shares the
                same intermediate representation. Experimental results on the
                Penn Treebank and Chinese Treebank datasets show that when
                ground truth parse trees are provided as additional training
                signals, the model is able to achieve lower perplexity and
                induce trees with better quality.
              </article>
            </div>
          </div>

          <!-- research 1 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/distanceparser.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Straight to the Tree: Constituency Parsing with Neural Syntactic
                Distance
              </h4>
              <p class="author">
                Yikang Shen*,
                <span style="font-weight: 500">Zhouhan Lin</span>*, Athul Paul
                Jacob, Alessandro Sordoni, Aaron Courville, Yoshua Bengio
              </p>
              <div class="link-list">
                <span>ACL 2018 </span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/1806.04168.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="http://"><span>slides</span></a>
                <span> | </span>
                <a href="https://github.com/hantek/distance-parser"
                  ><span>codes</span></a
                >
              </div>
              <article>
                We propose a novel constituency parsing scheme. The model
                predicts a vector of real-valued scalars, named syntactic
                distances, for each split position in the input sentence. The
                syntactic distances specify the order in which the split points
                will be selected, recursively partitioning the input, in a
                top-down fashion. Compared to traditional shiftreduce parsing
                schemes, our approach is free from the potential problem of
                compounding errors, while being faster and easier to
                parallelize. Our model achieves competitive performance amongst
                single model, discriminative parsers in the PTB dataset and
                outperforms previous models in the CTB dataset.
              </article>
            </div>
          </div>

          <!-- research 3 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/tree.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>
                Neural Language Modeling by Jointly Learning Syntax and Lexicon
              </h4>
              <p class="author">
                Yikang Shen, <span style="font-weight: 500">Zhouhan Lin</span>,
                Chin-Wei Huang, Aaron Courville
              </p>
              <div class="link-list">
                <span>ICLR 2018</span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/1711.02013.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="http://https://github.com/yikangshen/PRPN"
                  ><span>codes</span></a
                >
                <!-- <span> | </span> -->
                <!-- <a href=""><span>poster</span></a> -->
              </div>
              <article>
                We propose a neural language model capable of unsupervised
                syntactic structure induction. The model leverages the structure
                information to form better semantic representations and better
                language modeling. Standard recurrent neural networks are
                limited by their structure and fail to efficiently use syntactic
                information. On the other hand, tree-structured recursive
                networks usually require additional structural supervision at
                the cost of human expert annotation. In this paper, We propose a
                novel neural language model, called the Parsing-Reading-Predict
                Networks (PRPN), that can simultaneously induce the syntactic
                structure from unannotated sentences and leverage the inferred
                structure to learn a better language model. In our model, the
                gradient can be directly back-propagated from the language model
                loss into the neural parsing network. Experiments show that the
                proposed model can discover the underlying syntactic structure
                and achieve state-of-the-art performance on word/character-level
                language model tasks.
              </article>
            </div>
          </div>
          <!-- research 4 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/semlp.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>A structured self-attentive Sentence Embedding</h4>
              <p class="author">
                <span style="font-weight: 500">Zhouhan Lin</span>, Minwei Feng,
                Cicero Nogueira dos Santos, Mo Yu, Bing Xiang, Bowen Zhou and
                Yoshua Bengio
              </p>
              <div class="link-list">
                <span class="time">ICLR 2017</span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/1703.03130.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/hantek/SelfAttentiveSentEmbed"
                  ><span>codes</span></a
                >
                <!-- <span> | </span> -->
                <!-- <a href=""><span>poster</span></a> -->
              </div>
              <article>
                We propose a new model for extracting an interpretable sentence
                embedding by introducing self-attention. Instead of using a
                vector, we use a 2-D matrix to represent the embedding, with
                each row of the matrix attending on a different part of the
                sentence. We also propose a self-attention mechanism and a
                special regularization term for the model. As a side effect, the
                embedding comes with an easy way of visualizing what specific
                parts of the sentence are encoded into the embedding. We
                evaluate our model on 3 different tasks: author profiling,
                sentiment classification, and textual entailment. Results show
                that our model yields a significant performance gain compared to
                other sentence embedding methods in all of the 3 tasks.
              </article>
            </div>
          </div>

          <!-- research 5 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/exp_quant.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>Neural networks with few multiplications</h4>
              <p class="author">
                <span style="font-weight: 500">Zhouhan Lin</span>, Matthieu
                Courbariaux, Roland Memisevic, and Yoshua Bengio
              </p>
              <div class="link-list">
                <span class="time">ICLR 2016 (oral)</span>
                <span> | </span>
                <a href="https://arxiv.org/pdf/1510.03009.pdf"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/hantek/BinaryConnect"
                  ><span>codes</span></a
                >
                <!-- <span> | </span> -->
                <!-- <a href=""><span>poster</span></a> -->
              </div>
              <article>
                For most deep learning algorithms training is notoriously time
                consuming. Since most of the computation in training neural
                networks is typically spent on floating point multiplications,
                we investigate an approach to training that eliminates the need
                for most of these. Our method consists of two parts: First we
                stochastically binarize weights to convert multiplications
                involved in computing hidden states to sign changes. Second,
                while back-propagating error derivatives, in addition to
                binarizing the weights, we quantize the representations at each
                layer to convert the remaining multiplications into binary
                shifts. Experimental results across 3 popular datasets (MNIST,
                CIFAR10, SVHN) show that this approach not only does not hurt
                classification performance but can result in even better
                performance than standard stochastic gradient descent training,
                paving the way to fast, hardwarefriendly training of neural
                networks.
              </article>
            </div>
          </div>

          <!-- research 8 -->
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <img
                width="100%"
                src="./../assets/research/hsiclassify.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="col-xs-12 col-sm-8">
              <h4>Deep learning-based classification of hyperspectral data</h4>
              <p class="author">
                Yushi Chen, <span style="font-weight: 500">Zhouhan Lin</span>,
                Xing Zhao, Gang Wang, and Yanfeng Gu
              </p>
              <div class="link-list">
                <span class="time"
                  >Journal of Selected Topics in Applied Earth Observations and
                  Remote Sensing, 2014</span
                >
                <span> | </span>
                <a
                  href="https://ieeexplore.ieee.org/document/6844831/?arnumber=6844831"
                  ><span>pdf</span></a
                >
                <span> | </span>
                <a href="https://github.com/hantek/deeplearn_hsi"
                  ><span>codes</span></a
                >
              </div>
              <article>
                Classification is one of the most popular topics in
                hyperspectral remote sensing. In the last two decades, a huge
                number of methods were proposed to deal with the hyperspectral
                data classification problem. However, most of them do not
                hierarchically extract deep features. In this paper, the concept
                of deep learning is introduced into hyperspectral data
                classification for the first time. First, we verify the
                eligibility of stacked autoencoders by following classical
                spectral information-based classification. Second, a new way of
                classifying with spatial-dominated information is proposed. We
                then propose a novel deep learning framework to merge the two
                features, from which we can get the highest classification
                accuracy. The framework is a hybrid of principle component
                analysis (PCA), deep learning architecture, and logistic
                regression. Specifically, as a deep learning architecture,
                stacked autoencoders are aimed to get useful high-level
                features. Experimental results with widely-used hyperspectral
                data indicate that classifiers built in this deep learning-based
                framework provide competitive performance. In addition, the
                proposed joint spectral–spatial deep neural network opens a new
                window for future research, showcasing the deep learning-based
                methods’ huge potential for accurate hyperspectral data
                classification.
              </article>
            </div>
          </div>

          <!-- 在这里新建一个新的research，可复制一段research代码，从class=row开始, 格式如下 -->
          <!-- <div class="row">……</div> -->
        </section>
      </section>
      <p
        v-if="viewMode === 'detailed' && !filteredPapers.length"
        class="empty-state"
      >
        {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{ text.noResultsSuffix }}
      </p>

      <section v-show="viewMode === 'compact'" class="compact-section">
        <article
          v-for="paper in filteredPapers"
          :key="paper.id"
          class="compact-item"
        >
          <h3>{{ paper.title }}</h3>
          <p>{{ paper.venue }}</p>
        </article>
        <p v-if="!filteredPapers.length" class="empty-state">
          {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{ text.noResultsSuffix }}
        </p>
      </section>
      </div>
    </section>
  </div>
</template>
<script>
const I18N = {
  en: {
    eyebrow: "Publications",
    title: "Research",
    subtitle:
      "Selected papers on language modeling, multimodal learning, graph neural networks, and trustworthy AI.",
    repoLabel: "Code Repository",
    repoLink: "Visit LUMIA Group on Github",
    searchLabel: "Search",
    searchPlaceholder: "Search paper titles...",
    detailedView: "Detailed View",
    compactView: "Compact View",
    results: "results",
    noResultsPrefix: "No papers found for",
    noResultsSuffix: ".",
  },
  zh: {
    eyebrow: "论文成果",
    title: "研究",
    subtitle: "展示实验室在语言建模、多模态学习、图神经网络和可信 AI 方向的代表性论文。",
    repoLabel: "代码仓库",
    repoLink: "访问 LUMIA Group Github",
    searchLabel: "搜索",
    searchPlaceholder: "按论文标题关键词搜索...",
    detailedView: "详细视图",
    compactView: "简要视图",
    results: "条结果",
    noResultsPrefix: "未找到与",
    noResultsSuffix: "相关的论文。",
  },
};

export default {
  data() {
    return {
      currentLanguage: "zh",
      searchKeyword: "",
      viewMode: "detailed",
      papers: [],
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    normalizedKeyword() {
      return this.searchKeyword.toLowerCase().trim();
    },
    filteredPapers() {
      if (!this.normalizedKeyword) {
        return this.papers;
      }
      return this.papers.filter((paper) =>
        paper.title.toLowerCase().includes(this.normalizedKeyword)
      );
    },
  },
  watch: {
    searchKeyword() {
      this.applyDetailedFilter();
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
    this.$nextTick(() => {
      this.capturePapers();
      this.applyDetailedFilter();
    });
  },
  beforeDestroy() {
    window.removeEventListener("lumia-language-change", this.onLanguageChange);
  },
  methods: {
    initLanguage() {
      const saved = localStorage.getItem("lumia_lang");
      if (saved === "en" || saved === "zh") {
        this.currentLanguage = saved;
      }
    },
    onLanguageChange(event) {
      if (event && event.detail && (event.detail === "en" || event.detail === "zh")) {
        this.currentLanguage = event.detail;
      }
    },
    setViewMode(mode) {
      this.viewMode = mode === "compact" ? "compact" : "detailed";
      if (this.viewMode === "detailed") {
        this.$nextTick(() => this.applyDetailedFilter());
      }
    },
    capturePapers() {
      const rows = Array.from(
        this.$el.querySelectorAll(".research-section .row")
      );
      this.papers = rows.map((row, index) => {
        const titleNode = row.querySelector("h4");
        const venueNode = row.querySelector(".link-list span");
        const title = titleNode
          ? titleNode.textContent.replace(/\s+/g, " ").trim()
          : `Paper ${index + 1}`;
        const venue = venueNode
          ? venueNode.textContent.replace(/\s+/g, " ").trim()
          : "Unknown Venue";
        return {
          id: `paper-${index}`,
          title,
          venue,
        };
      });
    },
    applyDetailedFilter() {
      const rows = Array.from(
        this.$el.querySelectorAll(".research-section .row")
      );
      const keyword = this.normalizedKeyword;
      rows.forEach((row, index) => {
        const paper = this.papers[index];
        const title = paper ? paper.title.toLowerCase() : "";
        const isMatch = !keyword || title.includes(keyword);
        row.style.display = isMatch ? "" : "none";
      });
    },
  },
};
</script>
<style lang="less" scoped>
.research-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);

  .repo-entry {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(102, 46, 125, 0.22);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 999px;
    padding: 8px 10px 8px 16px;

    span {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.75;
    }

    a {
      display: inline-flex;
      align-items: center;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid var(--lumia-primary);
      color: var(--lumia-primary);
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.25s ease, color 0.25s ease;

      &:hover {
        color: #fff;
        background: var(--lumia-primary);
      }
    }
  }
}

.research-content {
  padding-top: 46px;
  text-align: left;

  .research-toolbar {
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 14px;
  }

  .search-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: min(560px, 100%);

    span {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.75;
    }

    input {
      width: 100%;
      min-height: 48px;
      border-radius: 14px;
      border: 1px solid rgba(102, 46, 125, 0.24);
      padding: 0 14px;
      background: rgba(255, 255, 255, 0.88);
      font-size: 15px;
      color: var(--lumia-text);
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;

      &:focus {
        border-color: rgba(102, 46, 125, 0.56);
        box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);
      }
    }
  }

  .view-switch {
    display: inline-flex;
    padding: 4px;
    border-radius: 999px;
    border: 1px solid rgba(102, 46, 125, 0.24);
    background: rgba(255, 255, 255, 0.8);
    gap: 6px;
  }

  .switch-btn {
    border: none;
    background: transparent;
    color: var(--lumia-text);
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;

    &.active {
      background: var(--lumia-primary);
      color: #fff;
    }
  }

  .result-count {
    margin-bottom: 18px;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  .compact-section {
    display: grid;
    gap: 12px;

    .compact-item {
      padding: 16px 18px;
      border: 1px solid rgba(102, 46, 125, 0.18);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.9);

      h3 {
        margin: 0;
        font-family: "Space Grotesk", sans-serif;
        font-size: clamp(20px, 2vw, 26px);
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      p {
        margin-top: 8px;
        margin-bottom: 0;
        font-size: 14px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.72;
      }
    }
  }

  .empty-state {
    margin-top: 12px;
    padding: 16px 18px;
    border-radius: 14px;
    border: 1px dashed rgba(102, 46, 125, 0.28);
    background: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    opacity: 0.82;
  }

  .research-section {
    .row {
      margin-top: 0 !important;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: minmax(220px, 320px) 1fr;
      gap: 22px;
      padding: 18px;
      border: 1px solid rgba(102, 46, 125, 0.18);
      border-radius: 22px;
      background: linear-gradient(160deg, #ffffff 0%, #fdf6ff 100%);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(102, 46, 125, 0.12);
      }

      &:nth-child(3n + 2) {
        background: linear-gradient(160deg, #ffffff 0%, #eef8fc 100%);
      }

      &:nth-child(3n + 3) {
        background: linear-gradient(160deg, #ffffff 0%, #fff7e8 100%);
      }
    }

    .author {
      margin-bottom: 8px;
      line-height: 1.55;
      font-size: 15px;
      opacity: 0.92;
    }

    .link-list {
      margin-bottom: 10px;
      line-height: 1.4;

      a {
        text-decoration: underline;
        text-decoration-color: transparent;
        text-underline-offset: 0.25em;
        transition: text-decoration-color 0.25s ease;
        &:hover {
          text-decoration-color: var(--lumia-primary);
        }
      }
    }

    article {
      font-size: 15px;
      line-height: 1.62;
      opacity: 0.95;
    }

    .col-sm-4 {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        min-height: 180px;
        object-fit: cover;
        display: block;
      }
    }

    .col-sm-8 {
      width: 100%;
      padding-left: 0;
      box-sizing: border-box;
    }

    h4 {
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(23px, 2.4vw, 34px);
      line-height: 1.15;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }
  }
}

@media (max-width: 999px) {
  .research-content {
    .search-box {
      min-width: 100%;
    }

    .research-section {
      .row {
        grid-template-columns: 1fr;
      }

      h4 {
        font-size: 24px;
      }
    }
  }
}

@media (max-width: 649px) {
  .research-content {
    .view-switch {
      width: 100%;
      justify-content: space-between;

      .switch-btn {
        flex: 1;
      }
    }

    .research-section {
      .row {
        padding: 16px;
      }

      article,
      .author,
      .link-list {
        font-size: 14px;
      }
    }
  }
}
</style>
