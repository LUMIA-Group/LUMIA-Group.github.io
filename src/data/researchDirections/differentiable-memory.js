export default {
  tagId: "differentiable-memory",
  content: {
    zh: `
      <article class="concept-blog">
        <header class="concept-blog-header">
          <p class="concept-meta">Parametric Long-term Memory</p>
          <h1>NeuralRAG：参数化长期记忆</h1>
          <p class="lead">让语言模型不再把“记住什么”和“如何推理”全部混在同一套 backbone 参数里，而是拥有一个独立、可端到端训练、可插拔的长期记忆模块。</p>
        </header>

        <section>
          <h2>我们关心的问题</h2>
          <p>当前大语言模型的知识、语言能力和推理能力大多被耦合在同一组参数中。模型在预训练中同时学习“如何表达”“如何推理”以及“记住哪些知识”，这些能力虽然共同支撑了模型的生成能力，但也带来一个结构性问题：<strong>记忆与推理没有被清晰分离</strong>。</p>
          <p>当我们希望让模型获得新知识、适配新领域，或者长期维护某类知识时，通常只能选择继续训练或微调整个模型。这相当于把新的 memory 直接写进 backbone 参数里，不仅成本高，也可能干扰模型原本的通用能力和推理能力。</p>
          <p>另一方面，如果把知识完全放到外部检索系统中，虽然可以避免修改模型参数，但 memory 又变成了一个独立于模型计算图之外的数据库，难以与语言模型进行端到端协同优化。</p>
          <div class="quote">
            <p>能不能设计一种新的 LLM 架构，把长期记忆从主语言模型中解耦出来，让 memory 负责存储和更新知识，让 base LM 负责语言生成与推理计算，并让二者以可训练、可插拔、可扩展的方式协同工作？</p>
          </div>
        </section>

        <section>
          <h2>我们提出的范式：NeuralRAG</h2>
          <p>NeuralRAG 的目标是将 memory 从 language model 主体中解耦出来，并以独立 neural module 的形式进行长期知识存储、训练和调用。</p>
          <p>这个 memory 模块既不是 long-context 场景下依赖上下文窗口的 working memory，也不是传统 RAG 中依赖外部向量库或数据库的非参数化 memory。我们希望它成为一种新的模型组件：</p>
          <ul>
            <li><strong>可训练</strong>：memory 本身是参数化 neural module，可以通过预训练学习知识分布。</li>
            <li><strong>可插拔</strong>：memory 与主 LLM 解耦，可以独立训练、保存和部署。</li>
            <li><strong>低延迟</strong>：推理阶段不再依赖大规模在线检索。</li>
            <li><strong>可复用</strong>：同一个 memory 服务多个兼容的 base LM。</li>
            <li><strong>面向长期知识</strong>：memory 学习的是语料或领域中的稳定知识，而不是短期上下文缓存。</li>
          </ul>

          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">训练阶段</span>
                <span class="pill">Training Corpus</span>
                <span class="arrow">→</span>
                <span class="pill">Token-level Retrieval Supervision</span>
                <span class="arrow">→</span>
                <span class="pill high">Parametric Memory Pretraining</span>
              </div>
              <div class="row">
                <span class="label">推理阶段</span>
                <span class="pill">Base LM</span>
                <span class="arrow">+</span>
                <span class="pill high">Parametric Memory</span>
                <span class="arrow">→</span>
                <span class="pill">Enhanced Prediction</span>
              </div>
            </div>
            <figcaption>NeuralRAG 将长期知识压缩到可训练的参数化 memory 中，并在推理时与 base LM 协同工作。</figcaption>
          </figure>

          <p>在训练阶段，我们利用类似 kNN-LM 的 token-level 检索信号，为每个上下文位置构造 soft target distribution，让 memory module 学习“在相似语境下，外部记忆会支持哪些 token”。</p>
          <p>在推理阶段，模型不再访问庞大的 datastore，也不再执行 expensive nearest-neighbor search，而是直接调用已经训练好的 parametric memory，并将它的输出与 base LM 的输出进行融合。</p>
        </section>

        <section>
          <h2>代表性工作</h2>

          <h3>Memory Decoder</h3>
          <p><strong>Memory Decoder</strong> 是我们在 Parametric Long-term Memory 方向上的一项基础工作。它提出了一种 plug-and-play 的预训练 memory，用于在不修改原始 LLM 参数的情况下进行领域适配。</p>
          <p>它的核心思想是：先在领域语料上构造 token-level 的 retrieval distribution，然后训练一个小型 Transformer decoder 去对齐这些分布。训练完成后，Memory Decoder 可以与共享 tokenizer 的 base LM 组合，通过输出分布插值增强模型在目标领域上的表现。</p>

          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">Memory Decoder</span>
                <span class="pill">Domain Corpus</span>
                <span class="arrow">→</span>
                <span class="pill">Retriever Distribution</span>
                <span class="arrow">→</span>
                <span class="pill high">Plug-and-play Domain Memory</span>
              </div>
            </div>
            <figcaption>领域知识不直接写入主模型参数，而是压缩进独立的 memory module 中。</figcaption>
          </figure>

          <p>Memory Decoder 的意义在于，它证明了领域知识可以不直接写入主模型参数，而是压缩进一个独立的 memory module 中。这样既可以保持 base LM 的原始能力，又可以通过外部 memory 提供领域增强。</p>

          <h3>MLP Memory</h3>
          <p><strong>MLP Memory</strong> 进一步探索了更轻量、更高效的参数化 memory 形式：能否用一个 all-MLP 模块去模拟 token-level 检索器的行为？</p>
          <p>在 MLP Memory 中，memory module 接收 LLM 某一层的 hidden state，并直接预测一个 retrieval-like next-token distribution。训练阶段，它通过分布对齐学习检索器的输出，同时保留普通语言建模目标；推理阶段，它的输出与 base LM 的输出进行融合，从而在不执行显式检索的情况下获得知识增强效果。</p>

          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">MLP Memory</span>
                <span class="pill">LLM Hidden State</span>
                <span class="arrow">→</span>
                <span class="pill high">Retriever-like Token Distribution</span>
                <span class="arrow">→</span>
                <span class="pill">Interpolation with Base LM</span>
              </div>
            </div>
            <figcaption>把原本需要庞大 datastore 和在线近邻搜索的 retrieval behavior，压缩成一个紧凑的参数化函数。</figcaption>
          </figure>

          <p>MLP Memory 的核心价值在于：它把原本需要庞大 datastore 和在线近邻搜索的 retrieval behavior，压缩成一个紧凑的参数化函数。这使得长期记忆可以以更低延迟、更易部署的方式参与语言模型推理。</p>
        </section>

        <section>
          <h2>一张表回顾</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>方向</th>
                  <th>核心问题</th>
                  <th>方法形式</th>
                  <th>目标</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Memory Decoder</td>
                  <td>如何构建可插拔的领域 memory</td>
                  <td>小型 Transformer decoder memory</td>
                  <td>不改主模型参数，实现领域增强</td>
                </tr>
                <tr>
                  <td>MLP Memory</td>
                  <td>如何更高效地压缩 retrieval behavior</td>
                  <td>All-MLP memory module</td>
                  <td>用低延迟参数化函数替代在线检索</td>
                </tr>
                <tr>
                  <td>Parametric Long-term Memory</td>
                  <td>如何让 LLM 拥有独立的长期记忆模块</td>
                  <td>Base LM + Parametric Memory</td>
                  <td>解耦语言能力与长期知识</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="end">
          <h2>团队愿景</h2>
          <p>NeuralRAG 方向希望回答一个长期问题：<strong>如果语言模型可以拥有一个独立、可训练、可更新的长期记忆模块，它的知识存储、领域适配和推理方式会发生什么变化？</strong></p>
          <p>我们的目标不是简单替代外部检索，也不是把所有知识都继续写进更大的 backbone 中，而是探索一种新的 LLM 架构范式：</p>
          <div class="quote">
            <p>把语言能力留给 base LM，把长期知识交给 parametric memory，让二者以可训练、可组合、可扩展的方式协同工作。</p>
          </div>
        </section>
      </article>
    `,
  },
};
