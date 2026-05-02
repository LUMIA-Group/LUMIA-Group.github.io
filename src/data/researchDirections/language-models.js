export default {
  tagId: "language-models",
  content: {
    zh: `
      <article class="concept-blog">
        <header class="concept-blog-header">
          <p class="concept-meta">Concept-Level Modeling</p>
          <h3>从预测下一个 Token 到预测下一个概念</h3>
          <p class="lead">当前语言模型已经证明了 next token prediction 的威力。但如果模型永远只被训练去预测下一个 token，它是否真的学会了概念如何演化、状态如何转移，以及目标如何分解？</p>
        </header>

        <section>
          <h3>1. NTP 的成功与局限</h3>
          <p>主流 Decoder-only 模型主要基于大规模无监督语料，以 next token prediction（NTP）作为训练目标，通过预测下一个 token 来学习语言分布与知识表征。</p>
          <p>问题在于，NTP 的基本预测单位仍然是离散 token。token 便于优化和扩展，却难以显式刻画更高层次的语义结构、概念组织与长程依赖关系。换言之，它更擅长学习局部符号之间的统计关联，而不是直接建模“概念如何演化”“状态如何转移”以及“目标如何分解”。</p>
        </section>

        <section>
          <h3>2. 高于 token 的预测</h3>
          <p>我们关注的不是在更长上下文上继续重复 token 级自回归，而是将预测目标提升到 token 之上的更高层抽象单元：例如<strong>概念、潜在状态、目标或结构化表示</strong>。</p>

          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">Token level</span>
                <span class="pill"><span class="var">x<span class="idx">1</span></span></span>
                <span class="arrow">→</span>
                <span class="pill"><span class="var">x<span class="idx">2</span></span></span>
                <span class="arrow">→</span>
                <span class="pill"><span class="var">x<span class="idx">3</span></span></span>
                <span class="arrow">→</span>
                <span class="pill"><span class="var">x<span class="idx">4</span></span></span>
              </div>
              <div class="row">
                <span class="label">Concept level</span>
                <span class="pill high"><span class="var">z<span class="idx">1</span></span>: 语义状态</span>
                <span class="arrow">→</span>
                <span class="pill high"><span class="var">z<span class="idx">2</span></span>: 目标</span>
                <span class="arrow">→</span>
                <span class="pill high"><span class="var">z<span class="idx">3</span></span>: 概念演化</span>
              </div>
            </div>
            <figcaption>这里的 z 可以是概念、状态、目标，也可以是更高层次的结构化表示。</figcaption>
          </figure>

          <div class="formula">
            <div class="formula-box">
              <div class="formula-title">Next Token Prediction</div>
              <div class="math-line">
                <span>max</span><sub>θ</sub>
                <span>Σ</span><sub>t</sub>
                <span>log</span>
                <span>p</span><sub>θ</sub>
                <span>(x</span><sub>t</sub>
                <span>| x</span><sub>&lt;t</sub><span>)</span>
              </div>
            </div>
            <div class="formula-box">
              <div class="formula-title">Concept-Level Prediction</div>
              <div class="math-line">
                <span>max</span><sub>θ</sub>
                <span>Σ</span><sub>k</sub>
                <span>log</span>
                <span>p</span><sub>θ</sub>
                <span>(z</span><sub>k</sub>
                <span>| z</span><sub>&lt;k</sub><span>)</span>
              </div>
            </div>
          </div>

          <p>相比于局部符号预测，这类高层目标能够提供更有信息量的学习信号，使模型不再主要依赖表层统计相关性，而是被迫学习语言、知识与世界状态之间的深层关系。</p>
        </section>

        <section>
          <h3>3. 这是整个 AI 领域共同的趋势</h3>
          <p>类似思想已经在多个 AI 方向中出现：预测目标从低层观测，逐渐转向更高层的语义结构或行为结构。</p>

          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">视觉任务</span>
                <span class="pill">pixels</span>
                <span class="arrow">→</span>
                <span class="pill high">objects / scene states</span>
              </div>
              <div class="row">
                <span class="label">决策任务</span>
                <span class="pill">single actions</span>
                <span class="arrow">→</span>
                <span class="pill high">trajectories / subgoals</span>
              </div>
              <div class="row">
                <span class="label">语言建模</span>
                <span class="pill">tokens</span>
                <span class="arrow">→</span>
                <span class="pill high">concepts / semantic states</span>
              </div>
            </div>
          </figure>

          <p>这个趋势背后的共同直觉是：更困难的训练目标往往会逼迫模型学习浅层预测难以获得的有用表征，从而带来更强的推理、泛化和长程一致性。</p>
        </section>

        <section>
          <h3>4. 为什么值得做</h3>
          <p>正如 Ilya Sutskever 与 Yann LeCun 等研究者多次表达的观点，单纯拟合浅层 token 预测并不足以逼近真正有用的智能。模型需要更高层次、更具挑战性的预测目标，来形成更稳定、更抽象的内部表示。</p>
          <p>NLP 过去几十年的演化也在一定程度上印证了这一点：从早期基于 byte 的建模，到更具语义粒度的 token 级语言模型；从 BERT 代表的双向掩码语言建模，到以 GPT 为代表的单向自回归预训练范式，训练目标不断变得更难，也持续推动模型能力边界向外扩展。</p>
          <div class="quote">
            <p>从“预测下一个 token”到“预测下一个概念/状态”，本质上是把语言建模从表层符号序列，推进到语义结构和世界状态的演化过程。</p>
          </div>
        </section>

        <section class="end">
          <h3>我们的目标</h3>
          <p>我们团队致力于突破当前 NTP 的模型训练范式，探索在更高层级的抽象空间中进行建模与预测的方法。目标不是简单扩展 token 级自回归的上下文，也不是只依赖更大的模型和更多的数据继续沿着既有 scaling law 前进，而是将预训练任务提升为<strong>预测下一个概念、概念状态，或更高层次的语义结构</strong>，从而激发模型形成更强的世界表征、推理能力与泛化能力。</p>
          <p>换言之，我们希望通过训练目标和建模层级的变化，探索一条超越当前 scaling law 主导路径的新方向。</p>
        </section>
      </article>
    `,
    en: `
      <section>
        <h3>Overview</h3>
        <p>This direction studies language modeling, structured semantic representation, foundation model capability, and modeling problems that map natural language to structured targets.</p>
        <p>This page can later be expanded with long-term goals, representative problems, project resources, and open research questions.</p>
      </section>
      <section>
        <h3>Representative Topics</h3>
        <ul>
          <li>Structured representations and syntactic induction in language models.</li>
          <li>Task-oriented semantic parsing such as Text-to-SQL and Text-to-Code.</li>
          <li>Long-sequence modeling, retrieval-augmented generation, and foundation model analysis.</li>
        </ul>
      </section>
    `,
  },
};
