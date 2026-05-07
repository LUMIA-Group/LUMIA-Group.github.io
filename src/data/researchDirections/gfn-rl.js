export default {
  tagId: "gfn-rl",
  content: {
    zh: `
      <article class="concept-blog">
        <header class="concept-blog-header">
          <p class="concept-meta">GFlowNets & Reinforcement Learning</p>
          <h1>生成式流网络与强化学习</h1>
          <p class="lead">语言生成、推理训练和离散结构探索，不一定只是“找一个最优答案”，也可以被理解为在巨大的组合空间中学习一个高质量分布。</p>
        </header>

        <section>
          <p>语言模型现在越来越强，但很多生成和强化学习方法背后仍有一个相对单一的目标：给定输入，尽量找到一个分数最高的输出。这条路线很有效，却也容易带来一些问题：生成空间被固定词表和自回归路径限制住，推理强化学习容易把概率质量压到少数高奖励轨迹上，而 GFlowNet 自身的训练过程也需要更清楚的理论工具来调节探索与利用。</p>
          <p>我们关注的是另一种看法：语言生成、推理训练和离散结构探索，不一定只是“找一个最优答案”，也可以被理解为<strong>在巨大的组合空间中学习一个高质量分布</strong>。在这个视角下，模型需要做的不只是提高单个样本的分数，还要把概率质量分配到多条合理路径上，让高质量、多样性和可探索性同时保留下来。</p>
          <p>GFlowNets 提供了一个很自然的工具箱。它用 flow / balance 的约束来训练随机策略，使终止状态的采样概率与奖励相匹配。我们希望把这种思想带到语言模型的生成、推理强化学习以及 GFlowNet 理论本身之中。</p>
        </section>

        <section>
          <h2>我们的主线</h2>
          <p>这三篇工作不是一个模型的连续迭代，而是围绕同一个主题的三次切入：</p>
          <ul>
            <li>在<strong>生成</strong>端，我们问：语言模型能不能不再局限于 token-by-token 的树状生成，而是在更自然的 span 组合空间里生成？</li>
            <li>在<strong>推理强化学习</strong>端，我们问：训练 LLM reasoner 时，能不能不只是最大化奖励，而是匹配一整个奖励诱导的目标分布？</li>
            <li>在<strong>理论</strong>端，我们问：GFlowNet 的训练目标为什么会带来某种固定的探索—利用偏好？这种偏好能不能被显式调节？</li>
          </ul>
          <div class="quote">
            <p>FoSS、FlowRL 和 alpha-GFN 分别从 LLM 生成、LLM 推理和 GFN 理论三个角度展开。它们关心的对象不同，但共享同一个核心想法：用分布匹配和 flow consistency 的方式，让模型在结构化离散空间中更好地探索、覆盖和泛化。</p>
          </div>
        </section>

        <section>
          <h2>FoSS：从 token tree 到 span DAG</h2>
          <p>标准自回归语言模型每次生成一个 token。把生成过程看成动作序列时，它天然形成一棵前缀树：每个状态只有一条到达路径。这种建模方式简单直接，但也把生成粒度固定在词表 token 上，限制了模型对更长片段和多种组合路径的利用。</p>
          <p>FoSS 关注的是一个容易被忽略的事实：同一句话可以由不同长度的 span 组合出来。也就是说，文本生成的状态空间并不一定是一棵树；当我们允许不同 span 组合到达同一个字符串时，它更像是一个 DAG。FoSS 通过检索文本构造动态 span vocabulary，并用灵活的切分方式显式建立 span-level DAG state space，再用 GFlowNet 目标在这个空间上训练生成策略。</p>
          <p>这样做的意义不只是“把 token 换成 span”。更重要的是，模型不必被单一路径绑定，而可以在多种合理的组合路径之间分配概率质量。GFlowNet 的 flow 约束让这些路径得到更充分的探索，也让生成结果在质量和多样性之间取得更好的平衡。</p>
          <p><strong>代表性结果</strong>：FoSS 在开放文本生成中相对 Transformer 最高带来 12.5% 的 MAUVE 提升，在知识密集任务上取得 3.5% 的增益；随着模型规模、训练数据和检索语料增加，FoSS 的优势仍然能够保持。</p>
        </section>

        <section>
          <h2>FlowRL：从奖励最大化到奖励分布匹配</h2>
          <p>LLM 推理强化学习中，PPO、GRPO 等方法通常把训练目标写成奖励最大化。这个目标很直观，但在长链式推理里也会带来一个问题：模型可能过度追逐少数高奖励模式，忽略那些不那么频繁、但同样有效的推理路径。结果是平均分可能上去了，探索和泛化却未必同步变好。</p>
          <p>FlowRL 把这个问题改写为奖励分布匹配。它先用可学习的 partition function 将标量奖励归一化成目标分布，再让策略去匹配这个 reward-induced distribution。实现上，FlowRL 从 GFlowNet 的 trajectory balance / flow balancing 出发，得到一个适合 LLM reasoning 的优化目标，并进一步加入长度归一化和 importance sampling，使它可以处理长 CoT 轨迹和实际 RL 训练中的采样偏移。</p>
          <p>这带来的变化很直接：策略不再只被鼓励“冲向一个最高奖励点”，而是被鼓励覆盖多种高质量推理轨迹。对于数学和代码这类存在多种解法、长推理路径又很常见的任务，这种分布匹配视角尤其重要。</p>
          <p><strong>代表性结果</strong>：FlowRL 在数学推理基准上相对 GRPO 平均提升 10.0%，相对 PPO 提升 5.1%，并在代码推理任务上保持更好的表现。进一步的多样性分析表明，FlowRL 能探索出更丰富的解题路径。</p>
        </section>

        <section>
          <h2>alpha-GFN：让探索—利用变成可调节的量</h2>
          <p>前两篇工作把 GFlowNet / flow balancing 用到了语言模型的生成和推理中。alpha-GFN 则回到 GFlowNet 本身，讨论一个更基础的问题：标准 GFlowNet 目标为什么会隐含某种固定的训练偏好？</p>
          <p>传统 GFlowNet 目标通常对 forward policy 和 backward policy 采用一种等权混合的视角。这种设计简洁，但也意味着探索与利用之间的权衡被目标函数隐式固定了。alpha-GFN 从 Markov chain 的角度重新理解 GFlowNet，将 GFlowNet 目标与 Markov chain reversibility 联系起来，进一步指出这种固定混合来自何处。</p>
          <p>在这个理论框架下，alpha-GFN 引入一个可调参数 alpha，显式控制 forward / backward policy 的混合比例。不同的 alpha 对应不同的训练动力学，也就对应不同的探索—利用偏好。这个改动看起来很小，但它把过去隐含在目标函数里的偏好变成了一个可以理解、可以调节、也可以调度的量。</p>
          <p><strong>代表性结果</strong>：alpha-GFN 在 Set、Bit Sequence 和 Molecule Generation 等任务上稳定优于已有 GFlowNet 目标，在部分设置中发现的 mode 数量最高提升到 10 倍。同时，该工作给出了收敛到唯一 flow 的理论保证，并从 Markov chain 视角解释了不同 alpha 如何影响训练动态。</p>
        </section>

        <section>
          <h2>一张表回顾</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>工作</th>
                  <th>问题落点</th>
                  <th>传统限制</th>
                  <th>GFN / flow 视角</th>
                  <th>一句话定位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FoSS</td>
                  <td>LLM 生成</td>
                  <td>token-by-token 生成形成树状状态空间，难以表达多种 span 组合路径</td>
                  <td>在动态 span vocabulary 上构造 DAG state space，并用 GFlowNet 学习路径分布</td>
                  <td>让语言模型在 span 组合空间中生成</td>
                </tr>
                <tr>
                  <td>FlowRL</td>
                  <td>LLM 推理强化学习</td>
                  <td>奖励最大化容易过度集中到少数高奖励轨迹，降低推理多样性</td>
                  <td>将标量奖励转成目标分布，用 flow balancing 进行 reward distribution matching</td>
                  <td>让 reasoner 覆盖多种高质量推理路径</td>
                </tr>
                <tr>
                  <td>alpha-GFN</td>
                  <td>GFlowNet 理论</td>
                  <td>标准目标隐含固定的 forward / backward 混合比例，探索—利用权衡不够灵活</td>
                  <td>从 Markov chain reversibility 出发，引入 alpha 控制混合与训练动态</td>
                  <td>让 GFlowNet 的探索—利用权衡可解释、可调节</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="end">
          <h2>团队与展望</h2>
          <p>这条线的长期目标，是把 GFlowNet 从一个用于小规模离散生成任务的工具，推进为理解和改造语言模型训练的一种基本视角。</p>
          <p>在应用上，我们会继续探索更结构化的语言生成空间。FoSS 只是一个开始：当语言模型可以使用 span、retrieved memory、程序片段、工具调用或更复杂的中间结构时，状态空间会远比 token tree 丰富。如何在这样的空间中定义动作、奖励和 flow，是值得持续推进的问题。</p>
          <p>在强化学习上，我们会继续研究 reward distribution matching 与 LLM post-training 的结合。对 reasoning model 来说，真正重要的往往不是唯一答案，而是多条可验证、可泛化的推理路径。我们希望把 GFlowNet 的分布覆盖能力，与 RLHF、verifier-guided RL、test-time scaling 等路线更自然地接起来。</p>
          <p>在理论上，我们关心 GFlowNet、强化学习和 Markov chain 之间更深的联系。alpha-GFN 表明，很多看似经验性的训练行为可以被重新放回可分析的数学框架中。接下来，我们希望进一步理解长轨迹信用分配、探索效率、目标稳定性，以及这些性质在大模型训练中如何体现。</p>
        </section>
      </article>
    `,
  },
};
