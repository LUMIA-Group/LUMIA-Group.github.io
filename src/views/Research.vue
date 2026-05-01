<template>
  <div class="research-container">
    <section class="lumia-section research-hero">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
          {{ text.eyebrow }}
        </p>
        <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">
          {{ text.title }}
        </h1>
        <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
          {{ text.subtitle }}
        </p>
        <section class="research-guide lumia-fade-up" style="--delay: 200ms">
          <div class="guide-grid">
            <button
              v-for="(tag, index) in localizedTags"
              :key="tag.id"
              type="button"
              class="guide-card"
              :class="{ active: activeDirectionId === tag.id }"
              :style="{ '--delay': `${90 + index * 50}ms` }"
              @click="selectDirection(tag.id)"
            >
              <p class="guide-card-name">{{ tag.name }}</p>
              <p class="guide-card-intro">{{ tag.intro }}</p>
            </button>
          </div>
        </section>
      </div>
    </section>

    <section class="lumia-section research-content">
      <div class="lumia-container">
        <section class="research-workspace">
          <article v-show="activeDirection" class="direction-placeholder">
            <p class="placeholder-eyebrow">{{ text.directionHomepageEyebrow }}</p>
            <h2>{{ activeDirection ? activeDirection.name : "" }}</h2>
            <p>
              {{ activeDirection ? activeDirection.intro : "" }}
            </p>
            <p>{{ text.directionPlaceholder }}</p>
          </article>

          <section
            class="publication-browser"
            :class="{ 'with-direction': activeDirection }"
          >
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
            <p class="result-count">
              {{ resultCountText }}
            </p>

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
                  Jingwen Leng,
                  <span style="font-weight: 500">Zhouhan Lin#</span>
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
                  We propose Fourier Transformer, a simple yet effective
                  approach by layer-wise progressively removing sequence
                  redundancies in hidden states using the ready-made Fast
                  Fourier Transform (FFT) operator to perform Discrete Cosine
                  Transformation (DCT). Fourier Transformer is able to
                  significantly reduce computational costs while retaining the
                  ability to inherit from various large pretrained models. SOTA
                  performances among all transformer-based models on the LRA
                  benchmark with significant improvement in both speed and
                  space. For generative seq-to-seq tasks including CNN/DailyMail
                  and ELI5, by inheriting the BART weights our model outperforms
                  the standard BART and other efficient models.
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
                  Text Classification In The Wild: A Large-Scale Long-Tailed
                  Name Normalization Dataset
                </h4>
                <p class="author">
                  Jiexing Qi, Shuhao Li, Zhixin Guo, Yusheng Huang, Chenghu
                  Zhou, Weinan Zhang, Xinbing Wang,
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
                  normalization dataset LoT-insts, which contains over 25k
                  classes that exhibit a naturally long-tailed distribution. In
                  order to isolate the few-shot and zero-shot learning scenarios
                  from the massive many-shot classes, we construct our test set
                  from four different subsets: many-, medium-, and few-shot
                  sets, as well as a zero-shot open set. We believe it provides
                  an important and different scenario to study this problem.
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
                  over-smoothing problems by an ordered message passing
                  mecanism, with specific blocks of neurons in a node embedding
                  targeted for messages passed from neighboring nodes that are
                  located within specific hops. This is achieved by aligning the
                  hierarchy of the rooted-tree of a central node with the
                  ordered neurons in its node representation. SOTA performance
                  in both homophily and heterophily settings without any
                  targeted design, robust to a wide number of layers, and
                  explainable.
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
                  RASAT: Integrating Relational Structures into Pretrained
                  Seq2Seq Model for Text-to-SQL
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
                  Relational structures such as schema linking and schema
                  encoding have been validated as a key component to
                  qualitatively translating natural language into SQL queries.
                  We propose RASAT: a Transformer seq2seq architecture augmented
                  with relation-aware self-attention that could leverage a
                  variety of relational structures while still being able to
                  inherit the pretrained parameters from the T5 model
                  effectively. Our model can incorporate almost all types of
                  existing relations in the literature. Experimental results on
                  three widely used text-to-SQL datasets, covering both
                  single-turn and multi-turn scenarios, have shown that RASAT
                  could achieve state-of-the-art results across all three
                  benchmarks (75.5% EX on Spider, 52.6% IEX on SParC, and 37.4%
                  IEX on CoSQL).
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
                  Syntax-guided Localized Self-attention by Constituency
                  Syntactic Distance
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
                  Xichen Pan, Peiyu Chen, Yichen Gong, Helong Zhou, Xinbing
                  Wang,
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
                  In this work, we successfully leverage unimodal
                  self-supervised learning to promote the multimodal AVSR. In
                  particular, audio and visual front-ends are trained on
                  large-scale unimodal datasets, and then we integrate
                  components of both front-ends into a larger multimodal
                  framework that learns to recognize parallel audio-visual data
                  into characters through a combination of CTC and seq2seq
                  decoding. We show that both components inherited from unimodal
                  self-supervised learning cooperate well, resulting in the
                  multimodal framework yielding competitive results through
                  fine-tuning. Even without an external language model, our
                  proposed model raises the SOTA performances on the widely
                  accepted Lip Reading Sentences 2 (LRS2) dataset by a large
                  margin, with a relative improvement of 30%.
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
                <h4>
                  Block-Skim: Efficient Question Answering for Transformer
                </h4>
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
                  We propose Block-skim, which learns to skim unnecessary
                  context in higher hidden layers to improve and accelerate the
                  Transformer performance. The key idea of Block-Skim is to
                  identify the context that must be further processed and those
                  that could be safely discarded early on during inference.
                  Critically, we find that such information could be
                  sufficiently derived from the self-attention weights inside
                  the Transformer model. We further prune the hidden states
                  corresponding to the unnecessary positions early in lower
                  layers, achieving significant inference-time speedup. To our
                  surprise, we observe that models pruned in this way outperform
                  their full-size counterparts.
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
                  Straight to the Tree: Constituency Parsing with Neural
                  Syntactic Distance
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
                  syntactic distances specify the order in which the split
                  points will be selected, recursively partitioning the input,
                  in a top-down fashion. Compared to traditional shiftreduce
                  parsing schemes, our approach is free from the potential
                  problem of compounding errors, while being faster and easier
                  to parallelize. Our model achieves competitive performance
                  amongst single model, discriminative parsers in the PTB
                  dataset and outperforms previous models in the CTB dataset.
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
                  Neural Language Modeling by Jointly Learning Syntax and
                  Lexicon
                </h4>
                <p class="author">
                  Yikang Shen,
                  <span style="font-weight: 500">Zhouhan Lin</span>, Chin-Wei
                  Huang, Aaron Courville
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
                  syntactic structure induction. The model leverages the
                  structure information to form better semantic representations
                  and better language modeling. Standard recurrent neural
                  networks are limited by their structure and fail to
                  efficiently use syntactic information. On the other hand,
                  tree-structured recursive networks usually require additional
                  structural supervision at the cost of human expert annotation.
                  In this paper, We propose a novel neural language model,
                  called the Parsing-Reading-Predict Networks (PRPN), that can
                  simultaneously induce the syntactic structure from unannotated
                  sentences and leverage the inferred structure to learn a
                  better language model. In our model, the gradient can be
                  directly back-propagated from the language model loss into the
                  neural parsing network. Experiments show that the proposed
                  model can discover the underlying syntactic structure and
                  achieve state-of-the-art performance on word/character-level
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
                  <span style="font-weight: 500">Zhouhan Lin</span>, Minwei
                  Feng, Cicero Nogueira dos Santos, Mo Yu, Bing Xiang, Bowen
                  Zhou and Yoshua Bengio
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
                  We propose a new model for extracting an interpretable
                  sentence embedding by introducing self-attention. Instead of
                  using a vector, we use a 2-D matrix to represent the
                  embedding, with each row of the matrix attending on a
                  different part of the sentence. We also propose a
                  self-attention mechanism and a special regularization term for
                  the model. As a side effect, the embedding comes with an easy
                  way of visualizing what specific parts of the sentence are
                  encoded into the embedding. We evaluate our model on 3
                  different tasks: author profiling, sentiment classification,
                  and textual entailment. Results show that our model yields a
                  significant performance gain compared to other sentence
                  embedding methods in all of the 3 tasks.
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
                  we investigate an approach to training that eliminates the
                  need for most of these. Our method consists of two parts:
                  First we stochastically binarize weights to convert
                  multiplications involved in computing hidden states to sign
                  changes. Second, while back-propagating error derivatives, in
                  addition to binarizing the weights, we quantize the
                  representations at each layer to convert the remaining
                  multiplications into binary shifts. Experimental results
                  across 3 popular datasets (MNIST, CIFAR10, SVHN) show that
                  this approach not only does not hurt classification
                  performance but can result in even better performance than
                  standard stochastic gradient descent training, paving the way
                  to fast, hardwarefriendly training of neural networks.
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
                <h4>
                  Deep learning-based classification of hyperspectral data
                </h4>
                <p class="author">
                  Yushi Chen, <span style="font-weight: 500">Zhouhan Lin</span>,
                  Xing Zhao, Gang Wang, and Yanfeng Gu
                </p>
                <div class="link-list">
                  <span class="time"
                    >Journal of Selected Topics in Applied Earth Observations
                    and Remote Sensing, 2014</span
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
                  hierarchically extract deep features. In this paper, the
                  concept of deep learning is introduced into hyperspectral data
                  classification for the first time. First, we verify the
                  eligibility of stacked autoencoders by following classical
                  spectral information-based classification. Second, a new way
                  of classifying with spatial-dominated information is proposed.
                  We then propose a novel deep learning framework to merge the
                  two features, from which we can get the highest classification
                  accuracy. The framework is a hybrid of principle component
                  analysis (PCA), deep learning architecture, and logistic
                  regression. Specifically, as a deep learning architecture,
                  stacked autoencoders are aimed to get useful high-level
                  features. Experimental results with widely-used hyperspectral
                  data indicate that classifiers built in this deep
                  learning-based framework provide competitive performance. In
                  addition, the proposed joint spectral–spatial deep neural
                  network opens a new window for future research, showcasing the
                  deep learning-based methods’ huge potential for accurate
                  hyperspectral data classification.
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
          {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{
            text.noResultsSuffix
          }}
        </p>

        <section v-show="viewMode === 'compact'" class="compact-section">
          <article
            v-for="paper in filteredPapers"
            :key="paper.id"
            class="compact-item"
          >
            <h3 v-html="getHighlightedHtml(paper.title)"></h3>
            <p v-html="getHighlightedHtml(paper.venue)"></p>
            <div v-if="paper.tagIds.length" class="paper-tag-list compact-tag-row">
              <button
                v-for="tagId in paper.tagIds"
                :key="`${paper.id}-${tagId}`"
                type="button"
                class="paper-tag-chip"
                @click="openTagFilter(tagId)"
              >
                <span v-html="getHighlightedHtml(getTagLabel(tagId))"></span>
              </button>
            </div>
          </article>
          <p v-if="!filteredPapers.length" class="empty-state">
            {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{
              text.noResultsSuffix
            }}
          </p>
        </section>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
import {
  getLocalizedResearchTags,
  getPaperTagIdsByTitle,
  getResearchTagSearchText,
  isResearchTagId,
  normalizeResearchTagIds,
} from "@/data/researchTags";

const I18N = {
  en: {
    eyebrow: "Publications",
    title: "Research",
    subtitle:
      "Selected papers on language modeling, multimodal learning, graph neural networks, and trustworthy AI.",
    directionHomepageEyebrow: "Direction Home",
    directionPlaceholder:
      "This direction page is being organized. It will later collect the overview, representative papers, projects, and resources for this research direction.",
    searchLabel: "Search",
    searchPlaceholder: "Search any keyword across papers...",
    detailedView: "Detailed View",
    compactView: "Compact View",
    results: "results",
    noResultsPrefix: "No papers found for",
    noResultsSuffix: ".",
  },
  zh: {
    eyebrow: "论文成果",
    title: "研究",
    subtitle:
      "展示实验室在语言建模、多模态学习、图神经网络和可信 AI 方向的代表性论文。",
    directionHomepageEyebrow: "方向主页",
    directionPlaceholder:
      "该方向主页内容正在整理中，后续会在这里展示方向概览、代表论文、项目与相关资源。",
    searchLabel: "搜索",
    searchPlaceholder: "按任意关键词搜索（标题/作者/会议/摘要等）...",
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
      activeTags: [],
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
    localizedTags() {
      return getLocalizedResearchTags(this.currentLanguage);
    },
    tagNameById() {
      return this.localizedTags.reduce((acc, tag) => {
        acc[tag.id] = tag.name;
        return acc;
      }, {});
    },
    activeDirectionId() {
      return this.activeTags[0] || "";
    },
    activeDirection() {
      if (!this.activeDirectionId) {
        return null;
      }
      return (
        this.localizedTags.find((tag) => tag.id === this.activeDirectionId) ||
        null
      );
    },
    filteredPapers() {
      return this.papers.filter((paper) => this.matchesPaper(paper));
    },
    resultCountText() {
      if (!this.activeDirection) {
        return `${this.filteredPapers.length} ${this.text.results}`;
      }
      if (this.currentLanguage === "en") {
        return `In ${this.activeDirection.name}, ${this.filteredPapers.length} ${this.text.results}`;
      }
      return `在${this.activeDirection.name}方向下，${this.filteredPapers.length}${this.text.results}`;
    },
  },
  watch: {
    searchKeyword() {
      this.applyDetailedFilter();
    },
    activeTags() {
      this.applyDetailedFilter();
      this.syncRouteFromTags();
    },
    currentLanguage() {
      this.$nextTick(() => {
        this.renderDetailedTagRows();
        this.applyDetailedFilter();
      });
    },
    "$route.query": {
      immediate: true,
      handler() {
        this.syncTagsFromRoute();
        this.applyDetailedFilter();
      },
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
    this.$nextTick(() => {
      this.capturePapers();
      this.renderDetailedTagRows();
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
      if (
        event &&
        event.detail &&
        (event.detail === "en" || event.detail === "zh")
      ) {
        this.currentLanguage = event.detail;
      }
    },
    isValidTag(tagId) {
      return isResearchTagId(tagId);
    },
    normalizeTagIds(tagIds) {
      return normalizeResearchTagIds(tagIds);
    },
    sameTagIds(a, b) {
      if (!Array.isArray(a) || !Array.isArray(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      return a.every((tagId, index) => tagId === b[index]);
    },
    buildQueryWithTags(tagIds) {
      const nextQuery = { ...this.$route.query };
      delete nextQuery.tag;
      delete nextQuery.tags;

      if (tagIds.length === 1) {
        nextQuery.tag = tagIds[0];
      } else if (tagIds.length > 1) {
        nextQuery.tags = tagIds.join(",");
      }

      return nextQuery;
    },
    isSameQuery(queryA, queryB) {
      const keysA = Object.keys(queryA).sort();
      const keysB = Object.keys(queryB).sort();
      if (keysA.length !== keysB.length) {
        return false;
      }
      return keysA.every((key, index) => {
        if (key !== keysB[index]) {
          return false;
        }
        return String(queryA[key]) === String(queryB[key]);
      });
    },
    extractTagsFromRoute() {
      const queryTags =
        typeof this.$route.query.tags === "string" && this.$route.query.tags
          ? this.$route.query.tags.split(",")
          : [];
      const legacyTag =
        typeof this.$route.query.tag === "string" && this.$route.query.tag
          ? [this.$route.query.tag]
          : [];
      const rawTags = queryTags.length ? queryTags : legacyTag;
      return this.normalizeTagIds(rawTags);
    },
    getTagLabel(tagId) {
      return this.tagNameById[tagId] || tagId;
    },
    escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    getHighlightedHtml(value) {
      const text = typeof value === "string" ? value : "";
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        return this.escapeHtml(text);
      }

      const pattern = this.escapeRegExp(keyword);
      if (!pattern) {
        return this.escapeHtml(text);
      }

      const regex = new RegExp(pattern, "gi");
      let cursor = 0;
      let result = "";
      let match = regex.exec(text);
      while (match) {
        result += this.escapeHtml(text.slice(cursor, match.index));
        result += `<mark class="search-hit">${this.escapeHtml(match[0])}</mark>`;
        cursor = match.index + match[0].length;
        match = regex.exec(text);
      }
      result += this.escapeHtml(text.slice(cursor));
      return result;
    },
    getTagSearchText(tagIds) {
      return getResearchTagSearchText(tagIds);
    },
    matchesPaper(paper) {
      if (!paper) {
        return false;
      }
      const matchesKeyword =
        !this.normalizedKeyword ||
        (paper.searchText && paper.searchText.includes(this.normalizedKeyword));
      const matchesDirection =
        !this.activeDirectionId || paper.tagIds.includes(this.activeDirectionId);
      return matchesKeyword && matchesDirection;
    },
    setViewMode(mode) {
      this.viewMode = mode === "compact" ? "compact" : "detailed";
      if (this.viewMode === "detailed") {
        this.$nextTick(() => this.applyDetailedFilter());
      }
    },
    selectDirection(tagId) {
      if (!this.isValidTag(tagId)) {
        return;
      }
      if (this.activeDirectionId === tagId) {
        this.activeTags = [];
        return;
      }
      this.activeTags = [tagId];
    },
    openTagFilter(tagId) {
      if (!this.isValidTag(tagId)) {
        return;
      }
      this.selectDirection(tagId);
    },
    syncTagsFromRoute() {
      const routeTagIds = this.extractTagsFromRoute().slice(0, 1);
      if (!this.sameTagIds(this.activeTags, routeTagIds)) {
        this.activeTags = routeTagIds;
      }

      const canonicalQuery = this.buildQueryWithTags(routeTagIds);
      if (this.isSameQuery(canonicalQuery, this.$route.query)) {
        return;
      }
      this.$router
        .replace({ name: this.$route.name, query: canonicalQuery })
        .catch(() => {});
    },
    syncRouteFromTags() {
      const canonicalQuery = this.buildQueryWithTags(this.activeTags.slice(0, 1));
      if (this.isSameQuery(canonicalQuery, this.$route.query)) {
        return;
      }
      this.$router
        .replace({ name: this.$route.name, query: canonicalQuery })
        .catch(() => {});
    },
    capturePapers() {
      if (!this.$el) {
        return;
      }
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
        const tagIds = this.normalizeTagIds(getPaperTagIdsByTitle(title));
        const baseSearchText = row.textContent
          ? row.textContent.replace(/\s+/g, " ").trim().toLowerCase()
          : "";
        const tagSearchText = this.getTagSearchText(tagIds).toLowerCase();
        return {
          id: `paper-${index}`,
          title,
          venue,
          tagIds,
          searchText: `${baseSearchText} ${tagSearchText}`.trim(),
        };
      });
    },
    renderDetailedTagRows() {
      if (!this.$el) {
        return;
      }
      const rows = Array.from(this.$el.querySelectorAll(".research-section .row"));
      rows.forEach((row, index) => {
        const existingTagRow = row.querySelector(".detail-tag-row");
        if (existingTagRow) {
          existingTagRow.remove();
        }

        const paper = this.papers[index];
        if (!paper || !paper.tagIds.length) {
          return;
        }

        const linkList = row.querySelector(".link-list");
        if (!linkList) {
          return;
        }

        const tagRow = document.createElement("div");
        tagRow.className = "paper-tag-list detail-tag-row";
        paper.tagIds.forEach((tagId) => {
          const tagChip = document.createElement("button");
          tagChip.type = "button";
          tagChip.className = "paper-tag-chip";
          tagChip.textContent = this.getTagLabel(tagId);
          tagChip.addEventListener("click", () => this.openTagFilter(tagId));
          tagRow.appendChild(tagChip);
        });
        linkList.insertAdjacentElement("afterend", tagRow);
      });
    },
    clearDetailedHighlights(row) {
      const marks = Array.from(row.querySelectorAll("mark.search-hit"));
      marks.forEach((markNode) => {
        if (!markNode.parentNode) {
          return;
        }
        const textNode = document.createTextNode(markNode.textContent || "");
        markNode.parentNode.replaceChild(textNode, markNode);
      });
      row.normalize();
    },
    applyDetailedHighlights(row, keyword) {
      const textKeyword = typeof keyword === "string" ? keyword.trim() : "";
      if (!textKeyword) {
        return;
      }
      const lowerKeyword = textKeyword.toLowerCase();
      const regex = new RegExp(this.escapeRegExp(textKeyword), "gi");
      const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          if (!node || !node.nodeValue) {
            return NodeFilter.FILTER_REJECT;
          }
          const value = node.nodeValue;
          if (!value.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!value.toLowerCase().includes(lowerKeyword)) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentNode;
          if (!parent) {
            return NodeFilter.FILTER_REJECT;
          }
          const tagName = parent.nodeName ? parent.nodeName.toLowerCase() : "";
          if (tagName === "script" || tagName === "style") {
            return NodeFilter.FILTER_REJECT;
          }
          if (
            parent.classList &&
            parent.classList.contains("search-hit")
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const nodes = [];
      let node = walker.nextNode();
      while (node) {
        nodes.push(node);
        node = walker.nextNode();
      }

      nodes.forEach((textNode) => {
        const text = textNode.nodeValue || "";
        regex.lastIndex = 0;
        if (!regex.test(text)) {
          return;
        }
        regex.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let cursor = 0;
        let match = regex.exec(text);
        while (match) {
          if (match.index > cursor) {
            fragment.appendChild(
              document.createTextNode(text.slice(cursor, match.index))
            );
          }
          const markNode = document.createElement("mark");
          markNode.className = "search-hit";
          markNode.textContent = match[0];
          fragment.appendChild(markNode);
          cursor = match.index + match[0].length;
          match = regex.exec(text);
        }
        if (cursor < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(cursor)));
        }
        if (textNode.parentNode) {
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      });
    },
    applyDetailedFilter() {
      if (!this.$el) {
        return;
      }
      const rows = Array.from(
        this.$el.querySelectorAll(".research-section .row")
      );
      const keyword = this.searchKeyword.trim();
      rows.forEach((row) => {
        this.clearDetailedHighlights(row);
      });
      rows.forEach((row, index) => {
        const paper = this.papers[index];
        const isMatch = this.matchesPaper(paper);
        row.style.display = isMatch ? "" : "none";
        if (isMatch) {
          this.applyDetailedHighlights(row, keyword);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.research-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);

  .lumia-subtitle {
    max-width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

}

.research-guide {
  margin-top: 30px;
  display: grid;
  gap: 14px;

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .guide-card {
    min-height: 150px;
    border: 1px solid rgba(102, 46, 125, 0.2);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.86);
    padding: 20px;
    text-align: left;
    color: var(--lumia-text);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.25s ease,
      border-color 0.25s ease, background 0.25s ease;

    &:hover {
      transform: translateY(-1px);
      border-color: rgba(102, 46, 125, 0.38);
      box-shadow: 0 10px 22px rgba(102, 46, 125, 0.1);
    }

    &.active {
      border-color: var(--lumia-primary);
      background: linear-gradient(160deg, #ffffff 0%, #f6edff 100%);
      box-shadow: 0 12px 24px rgba(102, 46, 125, 0.12);
    }
  }

  .guide-card-name {
    margin: 0;
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(21px, 1.5vw, 25px);
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: -0.01em;
  }

  .guide-card-intro {
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.62;
    opacity: 0.86;
  }
}

.research-content {
  padding-top: 46px;
  text-align: left;

  .research-workspace {
    min-height: 360px;
  }

  .direction-placeholder {
    width: 100%;
    max-width: none;
    box-sizing: border-box;
    padding: 34px;
    border: 1px solid rgba(102, 46, 125, 0.18);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.82);

    .placeholder-eyebrow {
      margin: 0 0 10px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.72;
    }

    h2 {
      margin: 0 0 14px;
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(28px, 3vw, 42px);
      line-height: 1.12;
      letter-spacing: -0.02em;
    }

    p {
      max-width: none;
      margin: 0 0 12px;
      font-size: 17px;
      line-height: 1.68;
    }
  }

  .publication-browser.with-direction {
    margin-top: 28px;
    padding-top: 28px;
    border-top: 1px solid rgba(102, 46, 125, 0.16);
  }

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

  :deep(mark.search-hit) {
    background: rgba(102, 46, 125, 0.22);
    color: var(--lumia-primary-strong);
    border-radius: 4px;
    padding: 0 2px;
  }

  :deep(.paper-tag-list) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .paper-tag-chip {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      border: 1px solid rgba(102, 46, 125, 0.24);
      background: rgba(255, 255, 255, 0.82);
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--lumia-primary);
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease,
        transform 0.2s ease;
      appearance: none;
      -webkit-appearance: none;

      &:hover {
        border-color: var(--lumia-primary);
        background: var(--lumia-primary);
        color: #fff;
        transform: translateY(-1px);
      }

      &:focus-visible {
        border-color: var(--lumia-primary);
        background: var(--lumia-primary);
        color: #fff;
        outline: none;
      }
    }
  }

  :deep(.detail-tag-row) {
    margin-bottom: 10px;
  }

  :deep(.compact-tag-row) {
    margin-top: 10px;
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
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;

      a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: 1px solid rgba(102, 46, 125, 0.28);
        border-radius: 999px;
        padding: 3px 10px;
        color: var(--lumia-primary);
        font-weight: 700;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.9);
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
          transform 0.2s ease;

        &::after {
          content: "↗";
          font-size: 11px;
          line-height: 1;
          opacity: 0.75;
        }

        &:hover {
          border-color: var(--lumia-primary);
          background: var(--lumia-primary);
          color: #fff;
          transform: translateY(-1px);
        }

        &:focus-visible {
          outline: none;
          border-color: var(--lumia-primary);
          background: var(--lumia-primary);
          color: #fff;
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
  .research-guide {
    .guide-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

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
  .research-guide {
    .guide-grid {
      grid-template-columns: 1fr;
    }
  }

  .research-content {
    .direction-placeholder {
      padding: 24px;
    }

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

      .paper-tag-chip {
        font-size: 11px;
      }
    }
  }
}
</style>
