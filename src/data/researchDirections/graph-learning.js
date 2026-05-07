export default {
  tagId: "graph-learning",
  content: {
    zh: `
      <article class="concept-blog">
        <header class="concept-blog-header">
          <p class="concept-meta">Graph Learning & Structured Reasoning</p>
          <h1>图机器学习</h1>
          <p class="lead">让图上的信息沿着结构流动：从以节点为根展开的 rooted tree，到图级的 pooling tree 与 cluster network，我们希望在保留图结构归纳偏置的前提下，提升模型对异配、多跳、层次与长程依赖的建模能力。</p>
        </header>

        <section>
          <h2>我们关心的问题</h2>
          <p>图学习最吸引人的地方，也正是它最麻烦的地方：结构无处不在，但结构并不总是以一种容易被神经网络利用的形式出现。</p>
          <p>传统 GNN 的 message passing 很自然：节点一层一层地从邻居那里拿信息。但这个机制也会带来一些熟悉的困难。传得太浅，远处的信息到不了；传得太深，不同节点的表示又容易变得相似，出现过平滑（over-smoothing）。在异配图上，邻居未必和中心节点同类，简单聚合反而可能把有用信号冲淡。更长程的依赖还会被压进固定维度的表示里，形成过压缩（over-squashing）。</p>
          <p>Graph Transformer 给了另一种可能：既然局部传递不够，就直接做全局交互。但图不是普通的 token set。全局 attention 如果缺少图结构归纳偏置，往往需要额外的位置编码或结构编码来补救；而这些补救不一定能真正保留图上的局部层次和细粒度邻域关系。</p>
          <p>所以我们一直在问几个更具体的问题：</p>
          <ul>
            <li>对一个节点来说，不同 hop 的邻居信息是否应该被简单混在一起？</li>
            <li>对一张图来说，层次结构是否只能通过固定 pooling ratio 或固定 coarsening 流程得到？</li>
            <li>对长程依赖来说，能不能既避免 message passing 的瓶颈，又不丢掉图结构本身的归纳偏置？</li>
            <li>Attention、Transformer、State Space Model 这些通用建模工具，怎样才能不是“搬到图上”，而是在图结构上被重新定义？</li>
          </ul>
        </section>

        <section>
          <h2>我们的研究主线：用 rooted-tree / hierarchy 重写图上的信息流</h2>
          <p>这几项工作并不是彼此孤立的模型名。它们围绕着同一个直觉展开：<strong>图上的信息不是平铺的，而是有层次、有方向、有粒度的。</strong></p>
          <p>从节点看，一个中心节点的多跳邻域天然可以展开成一棵 rooted tree：一跳、两跳、三跳并不是同一种信息。模型如果把它们全部揉在一起，就很难区分局部同质性、远程依赖和异配信号。从图看，一张图也不应该只能被一次性压成向量；节点可以组成子结构、簇和 pooling tree，而这些中间层次往往承载着图级任务真正需要的语义。</p>
          <div class="quote">
            <p>因此，我们的路线可以概括为一句话：先保留结构，再扩大信息流。</p>
          </div>

          <h3>1. 重新组织消息传递：从 <code>OrderedGNN</code> 到 <code>STAGNN</code></h3>
          <p><code>OrderedGNN</code> 是这条线的起点。传统 message passing 在堆叠多层后，很容易把不同距离的邻居信息混在一起。<code>OrderedGNN</code> 选择不直接增加复杂模块，而是先重新整理信息进入表示空间的方式：把不同 hop 的消息放入有序的神经元区块中，并让这些区块与中心节点的 rooted-tree hierarchy 对齐。</p>
          <p>这样一来，模型不再只是“聚合邻居”，而是知道信息来自哪一层邻域。近处和远处的信号可以被分别保留、选择和解释；同配图和异配图上的行为也不必依赖两套完全不同的设计。</p>
          <p><code>STAGNN</code> 往前走了一步：如果 rooted subtree 是节点视角下最自然的局部层次，那么 attention 也应该发生在这个结构上。我们提出 SubTree Attention（STA），让节点能够直接对多跳邻居计算注意力，同时通过 kernelized softmax 与 message-passing 式实现把复杂度控制在线性规模。它不像普通局部 attention 那样只看一跳，也不像全局 attention 那样忽略层次结构，而是在 rooted subtree 上连接局部与全局。</p>

          <h3>2. 学习图的层次结构：从 <code>GPN</code> 到 <code>Cluster-GT</code></h3>
          <p>如果说 <code>OrderedGNN</code> 和 <code>STAGNN</code> 关注的是“一个节点如何看自己的邻域”，那么 <code>GPN</code> 关注的是“一个图如何形成自己的层次结构”。</p>
          <p>很多 graph pooling 方法会预先设定 pooling ratio 或 pooling 层数，所有图共用一套压缩节奏。但真实图的结构差异很大：有些图需要更细的局部结构，有些图可以更快合并成高层语义。<code>GPN</code> 从 bottom-up grammar induction 中得到启发，提出 graph parsing algorithm，让每张图学习自己的 personalized pooling structure。它保留离散 assignment 带来的高效性，同时尽量避免节点信息在 pooling 过程中被不可逆地丢掉。</p>
          <p><code>Cluster-GT</code> 则从另一个角度重新看待层次结构。传统 coarsening 往往把一个 cluster 压成一个 embedding，这样虽然高效，却容易抹平 cluster 内部的节点差异。<code>Cluster-GT</code> 把图看成由 node clusters 组成的 token 网络，但不急着把每个 cluster 压扁；它通过 Node-to-Cluster Attention（N2C-Attn）同时建模 node-level 和 cluster-level 信息，让 cluster 之间的交互能够保留更细的节点粒度。</p>
          <p>这两项工作共同指向一个想法：图级表示不应该只是“少几个节点”的结果，而应该是结构被逐步组织出来的结果。</p>

          <h3>3. 突破长程瓶颈：从 <code>S4G</code> 到更高效的 Graph Transformer</h3>
          <p>长程依赖是图学习绕不开的问题。Message passing 的敏感性会随着最短路径距离变长而快速衰减，信息在多轮传递中被压缩，最终形成 over-squashing。Graph Transformer 用全局 attention 缓解这一点，但代价是弱化了图的结构归纳偏置。</p>
          <p><code>S4G</code> 尝试在两者之间找一条路：把 Structured State Space Model 引入图结构，在 rooted-tree hierarchy 上建模长程信息流。它不是简单把序列模型搬到图上，而是用图上由 rooted tree 诱导出的层次来重新定义状态空间卷积，从而希望同时保留 MPNN 的结构偏置和 Graph Transformer 的长程建模能力。</p>
          <p><code>Cluster-GT</code> 也可以放在这条线里理解。它没有在所有节点之间直接做全局 attention，而是把 node clusters 作为交互单元，通过双粒度 kernelized attention 在 cluster 层面扩大感受野，同时保留 cluster 内部的 node-level 信息。换句话说，长程交互不一定要牺牲结构；关键是选择合适的粒度。</p>
        </section>

        <section>
          <h2>一张表回顾</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>工作</th>
                  <th>起点</th>
                  <th>结构对象</th>
                  <th>主要问题</th>
                  <th>一句话定位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>OrderedGNN</code></td>
                  <td>Message passing</td>
                  <td>Rooted-tree hops → ordered neurons</td>
                  <td>异配图、过平滑、深层 GNN</td>
                  <td>把不同 hop 的消息有序放入表示空间，让模型知道信息从哪里来</td>
                </tr>
                <tr>
                  <td><code>STAGNN</code></td>
                  <td>Graph attention</td>
                  <td>Rooted subtree</td>
                  <td>局部 attention 看不远，全局 attention 缺结构</td>
                  <td>在 rooted subtree 上做多跳 attention，连接局部层次与全局交互</td>
                </tr>
                <tr>
                  <td><code>GPN</code></td>
                  <td>Graph pooling</td>
                  <td>Personalized pooling tree</td>
                  <td>固定 pooling ratio / 固定 pooling 层数</td>
                  <td>为每张图学习自己的 pooling structure，而不是套同一套压缩模板</td>
                </tr>
                <tr>
                  <td><code>S4G</code></td>
                  <td>Long-range graph modeling</td>
                  <td>Rooted-tree hierarchy + Structured State Space</td>
                  <td>Over-squashing 与 Graph Transformer 归纳偏置不足</td>
                  <td>用结构化状态空间建模图上的长程信息流</td>
                </tr>
                <tr>
                  <td><code>Cluster-GT</code></td>
                  <td>Graph Transformer / pooling</td>
                  <td>Node clusters as tokens</td>
                  <td>Coarsening 丢失节点细节，节点级全局 attention 成本高</td>
                  <td>在 cluster 层面交互，同时保留 node-level 与 cluster-level 双粒度信息</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="end">
          <h2>团队与展望</h2>
          <p>我们关心的核心问题始终是同一个：<strong>图结构到底应该如何进入神经网络的计算过程？</strong></p>
          <p>一种直接的做法是把图变成邻接矩阵、token set 或 coarsened graph，再套用已有架构。但我们更感兴趣的是另一种路线：从图本身的层次出发，重新设计信息流动的方式。Rooted tree、subtree attention、graph parsing、structured state space、cluster-wise interaction，这些关键词背后其实是同一个判断：结构不是额外特征，而是计算路径的一部分。</p>
          <p>接下来，我们会继续沿着两条线推进：</p>
          <ol>
            <li><strong>更强的结构归纳偏置</strong>：让模型更好地利用图中的局部层次、异配关系、子结构和多粒度组织方式；</li>
            <li><strong>更高效的长程交互</strong>：在不退化为普通全局 attention 的前提下，让远距离信息更顺畅地流动。</li>
          </ol>
          <p>这些问题也自然连接到更广泛的机器学习模型设计。Attention、Transformer、State Space Model 等工具仍然重要，但在图上，它们需要重新面对一个基本事实：图没有固定线性顺序，只有结构。我们的工作，就是围绕这个事实去设计模型。</p>
        </section>
      </article>
    `,
  },
};
