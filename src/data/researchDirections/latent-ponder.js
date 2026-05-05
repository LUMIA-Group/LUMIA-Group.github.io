export default {
  tagId: "latent-ponder",
  content: {
    zh: `
      <article class="concept-blog">
        <header class="concept-blog-header">
          <p class="concept-meta">Pondering Language Model</p>
          <h1>Pondering Language Model</h1>
          <p class="lead">让语言模型在生成每一个真实 token 之前，先在连续隐空间中“再想几步”：把“思考”做成完全自监督、可规模化、并能按 token 自适应分配的预训练能力。</p>
        </header>

        <section>
          <h2>我们关心的问题</h2>
          <p>标准 Decoder-only LM 在每个位置只做一次 forward：一个隐状态、一次 softmax、一个 token，循环往复。模型有多少推理深度，几乎完全由层数决定，而层数一旦在预训练时定下来，就再也不可扩展。</p>
          <p>可是从最近的经验看，<strong>给模型更多“思考时间”是真的有用的</strong>，这正是 Chain-of-Thought 与各种 test-time scaling 方法不断刷高基准的核心动力。问题是，这些方法的“思考”几乎都发生在模型外部的 token 序列里：</p>
          <ul>
            <li>它依赖人工标注或精心设计的 RL 来教会模型“怎么思考”。</li>
            <li>它必须把每一步思考写成离散 token，受限于 vocabulary，也带来显式生成代价。</li>
            <li>它和预训练目标基本是脱节的，只能 post-hoc 加挂在已有模型上。</li>
          </ul>
          <div class="quote">
            <p>我们想问的是：能不能把“再想几步”这件事，从模型外部的 token 序列搬回模型内部的隐空间，并且直接放进预训练？</p>
          </div>
        </section>

        <section>
          <h2>我们提出的范式：Pondering</h2>
          <p>PonderLM 的核心想法不是换一个预测目标，而是在 next token prediction 之外，沿着“每个 token 的内部计算深度”这一维做扩展。</p>
          <figure>
            <div class="flow">
              <div class="row">
                <span class="label">标准 LM</span>
                <span class="pill">hidden</span>
                <span class="arrow">→</span>
                <span class="pill high">token</span>
              </div>
              <div class="row">
                <span class="label">Pondering</span>
                <span class="pill">hidden</span>
                <span class="arrow">→</span>
                <span class="pill">hidden</span>
                <span class="arrow">→</span>
                <span class="pill">…</span>
                <span class="arrow">→</span>
                <span class="pill">hidden</span>
                <span class="arrow">→</span>
                <span class="pill high">token</span>
              </div>
            </div>
            <figcaption>K 步隐空间思考发生在连续向量空间中，不进入 vocabulary，也不需要额外标注。</figcaption>
          </figure>
          <p>换言之，模型在每一次开口说一个词之前，会在连续向量空间里递归或串接若干步，再用最终的隐状态去预测真实 token。整段过程不离开隐空间，不进 vocabulary，也不需要任何额外标注，一条普通预训练语料就够了。</p>
          <ul>
            <li><strong>不加参数</strong>：所有 ponder 步骤共享主干参数，模型容量没有膨胀。</li>
            <li><strong>不加上下文</strong>：不是在 token 级序列上“接更长”，而是在每个 token 内部“想更深”。</li>
            <li><strong>不加标注</strong>：思考是 emergent 的，由 self-supervised pretraining loss 直接驱动。</li>
            <li><strong>不与 test-time scaling 冲突</strong>：它和 CoT、Best-of-N、Majority Voting 是正交的两个轴，可以叠加。</li>
          </ul>
          <p>工业界的一些近期信号也呼应了这个方向：据传 Anthropic 的 Mythos 和字节的 Ouro 都用了 Loop / 递归式架构，并在长程一致性任务上展现出与体量不匹配的优势。这从侧面说明：<strong>“在隐空间里递归地再算几步”正在成为新一代 LLM 架构里值得严肃对待的设计轴。</strong></p>
        </section>

        <section>
          <h2>三代 PonderLM：把“再想几步”逐步打开</h2>
          <p>我们沿这条轴线做了三层递进的探索，对应“思考”在结构上是否共享参数、是否独立 latent thought、是否按 token 自适应这三个独立维度。</p>

          <h3>第一代：纵向递归 — PonderLM</h3>
          <p>让模型对同一组参数做有限次再调用。每一步 ponder 不向词表采样，而是把预测分布与 token embedding 的加权和，也就是一个完全连续的向量，再喂回模型本身。在 GPT-2、Pythia、LLaMA 三种架构上都能 self-supervised 地学到这种“反复掂量再发言”的行为。</p>
          <p><strong>代表性结果</strong>：用约 37% 的参数 / 41% 的数据即可匹配 vanilla 模型同级 loss；PonderPythia-2.8B 超过 Pythia-6.9B 并与 Pythia-12B 持平；PonderPythia-1B 追平在 10× 数据上训练的 TinyLlama-1.1B。</p>

          <h3>第二代：横向 latent thought — PonderLM-2</h3>
          <p>不再共享一次完整 forward，而是把当前位置的最后一层 hidden state 当作一条“latent thought”，作为下一步 forward 的输入，再用这一步的输出去预测真正的 next token。等价于在每个真实 token 之前串一段不离开隐空间的、连续展开的 latent CoT。</p>
          <p><strong>代表性结果</strong>：等推理代价下，每个 token 多算一条 latent thought 的 PonderLM-2，超过参数翻倍的 vanilla 模型；PonderLM-2-Pythia-1.4B 在 Pile 300B tokens 上明显优于同数据训练的 Pythia-2.8B；可作为 continue pretrain 直接套到 LLaMA-3-3B 上，仅用 6B 额外 token 就能稳定优于 vanilla CPT；与 CoT / BoN / Majority Voting 互补，N 越大 gap 越宽。</p>

          <h3>第三代：Token 级自适应 — PonderLM-3、AdaPonderLM、Adaptive Latent CoT</h3>
          <p>固定步长其实是浪费：模型对 “singles, fluctuated, seventies” 的后缀几乎不需要再想；但句首 token、数字、承载语义的关键名词，多想几步收益巨大。</p>
          <p>我们用三种互补的机制把“思考多少步”做成 token-wise、训推一致、可学习的资源分配：</p>
          <ul>
            <li><strong>AdaPonderLM</strong>：每一步配 MLP gate + 单调 halting mask + KV reuse，让简单 token 早停、难 token 多算。</li>
            <li><strong>PonderLM-3</strong>：在 PonderLM-2 上注入可微 attention mask，预训练里端到端学习“什么时候该剪掉这一步”，推理时切换到匹配的 hard pruning。</li>
            <li><strong>Adaptive Latent CoT</strong>：在每步思考前由额外 router 输出“是否继续思考”的概率，按条件概率累乘地决定 latent CoT 长度。</li>
          </ul>
          <p><strong>代表性结果</strong>：模型自动学会按 token 难度分配算力，容易的少思考、难的多思考；同 training FLOPs 下取得更低的 PPL 与更高的下游表现；自适应路径在 iso-FLOPs 下持续优于固定剪枝，证明优势主要来自“把算力花对地方”，而不是“花得少”。</p>
        </section>

        <section>
          <h2>一张表回顾</h2>
          <div class="table-wrap">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>代际</th>
                  <th>模型</th>
                  <th>思考结构</th>
                  <th>思考步长</th>
                  <th>一句话定位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>标准</td>
                  <td>Vanilla LM</td>
                  <td>无</td>
                  <td>—</td>
                  <td>每 token 一次 forward</td>
                </tr>
                <tr>
                  <td>一代</td>
                  <td>PonderLM</td>
                  <td>纵向递归（同参数复用）</td>
                  <td>固定</td>
                  <td>用更少参数 / 数据匹配更大模型</td>
                </tr>
                <tr>
                  <td>二代</td>
                  <td>PonderLM-2</td>
                  <td>横向 latent thoughts</td>
                  <td>固定</td>
                  <td>等推理代价下超过参数翻倍模型；可与 CoT / BoN 互补</td>
                </tr>
                <tr>
                  <td>三代</td>
                  <td>PonderLM-3 / AdaPonderLM / Adaptive Latent CoT</td>
                  <td>横向 + 自适应</td>
                  <td>可变（token-wise）</td>
                  <td>把额外算力按 token 分配，更陡的 scaling 曲线</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="end">
          <h2>团队与展望</h2>
          <p>我们关心的核心问题始终是同一个：<strong>当一个语言模型被允许、并且被预训练去“在说出下一个词之前先想一会儿”时，它能走多远？</strong></p>
          <p>围绕这个问题，团队正在沿两条线继续推进：</p>
          <ul>
            <li>把“思考多少步”做成完全 token-wise、可微、训推一致的自适应机制。</li>
            <li>把这套范式与显式 CoT、Best-of-N、RLHF 等 test-time scaling 路线，组合成一条连续谱而非互斥的备选项。</li>
          </ul>
        </section>
      </article>
    `,
    en: `
      <section>
        <h3>Overview</h3>
        <p>This direction studies pondering, planning, reflection, and intermediate state evolution in latent spaces, extending reasoning beyond explicit text chains into compact internal representations.</p>
        <p>This page can later be expanded with latent variable modeling, reasoning trajectories, training objectives, and representative work.</p>
      </section>
      <section>
        <h3>Representative Topics</h3>
        <ul>
          <li>Latent thought states, implicit drafts, and internal reasoning trajectories.</li>
          <li>Connections between explicit chain-of-thought and latent-space reasoning.</li>
          <li>Controllable reasoning depth, reflection mechanisms, and intermediate-state supervision.</li>
        </ul>
      </section>
    `,
  },
};
