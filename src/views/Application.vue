<template>
  <div class="application-page">
    <section class="lumia-section application-hero">
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
      </div>
    </section>

    <section class="lumia-section form-section">
      <div class="lumia-container">
        <div class="form-shell lumia-fade-up" style="--delay: 200ms">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-position="top"
            class="demo-ruleForm"
          >
            <template v-if="!isIndustryForm">
              <div class="lumia-grid-2">
                <el-form-item :label="text.nameLabel" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    :placeholder="text.namePlaceholder"
                  />
                </el-form-item>

                <el-form-item :label="text.trackLabel" prop="region">
                  <el-select
                    v-model="ruleForm.region"
                    :placeholder="text.trackPlaceholder"
                  >
                    <el-option
                      v-for="option in trackOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div class="lumia-grid-2">
                <el-form-item :label="text.startDateLabel" prop="date1">
                  <el-date-picker
                    v-model="ruleForm.date1"
                    type="date"
                    :placeholder="text.startDatePlaceholder"
                    style="width: 100%"
                  />
                </el-form-item>

                <el-form-item :label="text.contactTimeLabel" prop="date2">
                  <el-time-picker
                    v-model="ruleForm.date2"
                    :placeholder="text.contactTimePlaceholder"
                    style="width: 100%"
                  />
                </el-form-item>
              </div>

              <el-form-item :label="text.remoteLabel" prop="delivery">
                <el-switch v-model="ruleForm.delivery" />
              </el-form-item>

              <el-form-item :label="text.interestsLabel" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox
                    v-for="option in interestOptions"
                    :key="option.value"
                    :label="option.value"
                    name="type"
                  >
                    {{ option.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item :label="text.resourceLabel" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio
                    v-for="option in resourceOptions"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :label="text.statementLabel" prop="desc">
                <el-input
                  v-model="ruleForm.desc"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  :placeholder="text.statementPlaceholder"
                />
              </el-form-item>
            </template>

            <template v-else>
              <div class="lumia-grid-2">
                <el-form-item :label="text.nameLabel" prop="industryName">
                  <el-input
                    v-model="ruleForm.industryName"
                    :placeholder="text.namePlaceholder"
                  />
                </el-form-item>

                <el-form-item :label="text.companyLabel" prop="industryCompany">
                  <el-input
                    v-model="ruleForm.industryCompany"
                    :placeholder="text.companyPlaceholder"
                  />
                </el-form-item>
              </div>

              <div class="lumia-grid-2">
                <el-form-item :label="text.roleLabel" prop="industryRole">
                  <el-input
                    v-model="ruleForm.industryRole"
                    :placeholder="text.rolePlaceholder"
                  />
                </el-form-item>

                <el-form-item :label="text.emailLabel" prop="industryEmail">
                  <el-input
                    v-model="ruleForm.industryEmail"
                    :placeholder="text.emailPlaceholder"
                  />
                </el-form-item>
              </div>

              <div class="lumia-grid-2">
                <el-form-item :label="text.phoneLabel" prop="industryPhone">
                  <el-input
                    v-model="ruleForm.industryPhone"
                    :placeholder="text.phonePlaceholder"
                  />
                </el-form-item>

                <el-form-item :label="text.stageLabel" prop="industryStage">
                  <el-select
                    v-model="ruleForm.industryStage"
                    :placeholder="text.stagePlaceholder"
                  >
                    <el-option
                      v-for="option in industryStageOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div class="lumia-grid-2">
                <el-form-item :label="text.timelineLabel" prop="industryTimeline">
                  <el-date-picker
                    v-model="ruleForm.industryTimeline"
                    type="date"
                    :placeholder="text.timelinePlaceholder"
                    style="width: 100%"
                  />
                </el-form-item>

                <el-form-item :label="text.budgetLabel" prop="industryBudget">
                  <el-select
                    v-model="ruleForm.industryBudget"
                    :placeholder="text.budgetPlaceholder"
                  >
                    <el-option
                      v-for="option in industryBudgetOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <el-form-item :label="text.typeLabel" prop="industryType">
                <el-checkbox-group v-model="ruleForm.industryType">
                  <el-checkbox
                    v-for="option in industryTypeOptions"
                    :key="option.value"
                    :label="option.value"
                    name="industryType"
                  >
                    {{ option.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item :label="text.goalsLabel" prop="industryGoals">
                <el-input
                  v-model="ruleForm.industryGoals"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 7 }"
                  :placeholder="text.goalsPlaceholder"
                />
              </el-form-item>

              <el-form-item :label="text.requirementsLabel" prop="industryRequirements">
                <el-input
                  v-model="ruleForm.industryRequirements"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  :placeholder="text.requirementsPlaceholder"
                />
              </el-form-item>

              <el-form-item :label="text.ndaLabel" prop="industryNda">
                <el-switch v-model="ruleForm.industryNda" />
              </el-form-item>
            </template>

            <el-form-item class="action-row">
              <el-button type="primary" @click="submitForm('ruleForm')">
                {{ text.submit }}
              </el-button>
              <el-button @click="resetForm('ruleForm')">{{ text.reset }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
function createDefaultForm() {
  return {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
    industryName: "",
    industryCompany: "",
    industryRole: "",
    industryEmail: "",
    industryPhone: "",
    industryStage: "",
    industryTimeline: "",
    industryBudget: "",
    industryType: [],
    industryGoals: "",
    industryRequirements: "",
    industryNda: false,
  };
}

const I18N = {
  en: {
    common: {
      submit: "Submit",
      reset: "Reset",
    },
    graduate: {
      eyebrow: "Application",
      title: "Join the Lab",
      subtitle:
        "Tell us about your background, research interests, and collaboration goals.",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      trackLabel: "Track",
      trackPlaceholder: "Select a track",
      startDateLabel: "Available Start Date",
      startDatePlaceholder: "Pick a date",
      contactTimeLabel: "Best Contact Time",
      contactTimePlaceholder: "Pick a time",
      remoteLabel: "Remote Friendly",
      interestsLabel: "Research Interests",
      resourceLabel: "Support Preference",
      statementLabel: "Statement",
      statementPlaceholder:
        "Describe your background, goals, and planned research.",
      submitSuccess: "Submitted successfully. We will contact you soon.",
      trackOptions: [
        { label: "PhD", value: "phd" },
        { label: "Master", value: "master" },
        { label: "Internship", value: "intern" },
        { label: "Research Collaboration", value: "collab" },
      ],
      interestOptions: [
        { label: "Differentiable Memory", value: "differentiable-memory" },
        { label: "Concept-Level Language Models", value: "higher-level-lm" },
        { label: "Latent Pondering", value: "latent-ponder" },
        {
          label: "Generative Flow Networks & Reinforcement Learning",
          value: "gfn-rl",
        },
        {
          label: "LLM Efficiency & Context Compression and Memory",
          value: "efficient-lm",
        },
        {
          label: "Graph Learning & Structured Reasoning",
          value: "graph-learning",
        },
      ],
      resourceOptions: [
        { label: "Need advisor support", value: "need_mentor" },
        { label: "Already have a project", value: "have_project" },
      ],
      rules: {
        nameRequired: "Please enter your name",
        nameLength: "Length should be 2 to 30 characters",
        regionRequired: "Please select a track",
        date1Required: "Please select a start date",
        date2Required: "Please select a contact time",
        interestsRequired: "Please select at least one research interest",
        resourceRequired: "Please select a support preference",
        descRequired: "Please provide a statement",
      },
    },
    industry: {
      eyebrow: "Collaboration Request",
      title: "Industry Collaboration / Advisory",
      subtitle:
        "Tell us about your organization, project stage, and expected collaboration model.",
      nameLabel: "Primary Contact",
      namePlaceholder: "Enter primary contact name",
      companyLabel: "Company / Organization",
      companyPlaceholder: "Enter company or organization name",
      roleLabel: "Role / Title",
      rolePlaceholder: "Enter your role",
      emailLabel: "Work Email",
      emailPlaceholder: "name@company.com",
      phoneLabel: "Phone / WeChat / WhatsApp",
      phonePlaceholder: "Enter your preferred contact",
      stageLabel: "Project Stage",
      stagePlaceholder: "Select current stage",
      timelineLabel: "Expected Start Date",
      timelinePlaceholder: "Pick a date",
      budgetLabel: "Budget Range",
      budgetPlaceholder: "Select budget range",
      typeLabel: "Collaboration Type",
      goalsLabel: "Business Objectives",
      goalsPlaceholder:
        "Describe business scenario, expected outcomes, and success criteria.",
      requirementsLabel: "Additional Requirements",
      requirementsPlaceholder:
        "Compliance requirements, deliverables, constraints, and timeline details (optional).",
      ndaLabel: "Need NDA before detailed discussion",
      submitSuccess:
        "Submitted successfully. We will contact you to discuss collaboration details.",
      stageOptions: [
        { label: "Exploration", value: "exploration" },
        { label: "PoC", value: "poc" },
        { label: "Pilot", value: "pilot" },
        { label: "Production", value: "production" },
      ],
      budgetOptions: [
        { label: "Below 100K RMB", value: "lt100k" },
        { label: "100K - 500K RMB", value: "100k_500k" },
        { label: "500K - 2M RMB", value: "500k_2m" },
        { label: "Above 2M RMB", value: "gt2m" },
      ],
      typeOptions: [
        { label: "Technical Advisory", value: "advisory" },
        { label: "Joint R&D", value: "joint_rd" },
        { label: "Product Co-development", value: "co_develop" },
        { label: "Model Evaluation & Optimization", value: "model_eval" },
        { label: "Training / Workshop", value: "training" },
      ],
      rules: {
        nameRequired: "Please enter contact name",
        nameLength: "Length should be 2 to 40 characters",
        companyRequired: "Please enter company or organization",
        roleRequired: "Please enter your role",
        emailRequired: "Please enter work email",
        emailInvalid: "Please enter a valid email address",
        phoneRequired: "Please enter contact information",
        stageRequired: "Please select project stage",
        timelineRequired: "Please select expected start date",
        budgetRequired: "Please select budget range",
        typeRequired: "Please select at least one collaboration type",
        goalsRequired: "Please describe your collaboration objectives",
      },
    },
  },
  zh: {
    common: {
      submit: "提交",
      reset: "重置",
    },
    graduate: {
      eyebrow: "申请",
      title: "加入实验室",
      subtitle: "介绍你的背景、研究兴趣与合作目标。",
      nameLabel: "姓名",
      namePlaceholder: "请输入你的姓名",
      trackLabel: "申请方向",
      trackPlaceholder: "请选择申请方向",
      startDateLabel: "可开始时间",
      startDatePlaceholder: "选择日期",
      contactTimeLabel: "可联系时间",
      contactTimePlaceholder: "选择时间",
      remoteLabel: "是否可远程",
      interestsLabel: "研究兴趣",
      resourceLabel: "资源支持",
      statementLabel: "补充说明",
      statementPlaceholder: "介绍你的背景、目标和想做的研究",
      submitSuccess: "提交成功，稍后我们会联系你。",
      trackOptions: [
        { label: "博士", value: "phd" },
        { label: "硕士", value: "master" },
        { label: "实习", value: "intern" },
        { label: "科研合作", value: "collab" },
      ],
      interestOptions: [
        { label: "可微记忆", value: "differentiable-memory" },
        { label: "概念级语言模型", value: "higher-level-lm" },
        { label: "隐思考机制", value: "latent-ponder" },
        { label: "生成流网络与强化学习", value: "gfn-rl" },
        { label: "高效化", value: "efficient-lm" },
        { label: "图学习与结构化推理", value: "graph-learning" },
      ],
      resourceOptions: [
        { label: "需要导师指导", value: "need_mentor" },
        { label: "已有合作项目", value: "have_project" },
      ],
      rules: {
        nameRequired: "请输入姓名",
        nameLength: "长度在 2 到 30 个字符",
        regionRequired: "请选择方向",
        date1Required: "请选择开始日期",
        date2Required: "请选择联系时间",
        interestsRequired: "请至少选择一个研究兴趣",
        resourceRequired: "请选择资源需求",
        descRequired: "请填写补充说明",
      },
    },
    industry: {
      eyebrow: "合作申请",
      title: "公司合作 / 顾问咨询",
      subtitle: "请介绍公司背景、项目阶段和合作诉求，我们会尽快联系你。",
      nameLabel: "联系人",
      namePlaceholder: "请输入主要联系人姓名",
      companyLabel: "公司 / 机构名称",
      companyPlaceholder: "请输入公司或机构名称",
      roleLabel: "职位",
      rolePlaceholder: "请输入你的职位",
      emailLabel: "工作邮箱",
      emailPlaceholder: "请输入工作邮箱",
      phoneLabel: "联系电话（电话/微信）",
      phonePlaceholder: "请输入便于联系的方式",
      stageLabel: "项目阶段",
      stagePlaceholder: "请选择当前阶段",
      timelineLabel: "预计启动时间",
      timelinePlaceholder: "请选择日期",
      budgetLabel: "预算区间",
      budgetPlaceholder: "请选择预算区间",
      typeLabel: "合作类型",
      goalsLabel: "合作目标",
      goalsPlaceholder: "请描述业务场景、预期目标和衡量标准。",
      requirementsLabel: "补充要求",
      requirementsPlaceholder: "合规要求、交付形式、约束条件、时间安排等（可选）。",
      ndaLabel: "在深入沟通前需要签署 NDA",
      submitSuccess: "提交成功，我们会尽快与你沟通合作细节。",
      stageOptions: [
        { label: "需求探索", value: "exploration" },
        { label: "概念验证（PoC）", value: "poc" },
        { label: "试点阶段", value: "pilot" },
        { label: "生产部署", value: "production" },
      ],
      budgetOptions: [
        { label: "10万以内", value: "lt100k" },
        { label: "10万 - 50万", value: "100k_500k" },
        { label: "50万 - 200万", value: "500k_2m" },
        { label: "200万以上", value: "gt2m" },
      ],
      typeOptions: [
        { label: "顾问咨询", value: "advisory" },
        { label: "联合研发", value: "joint_rd" },
        { label: "产品共建", value: "co_develop" },
        { label: "模型评测与优化", value: "model_eval" },
        { label: "内训 / 工作坊", value: "training" },
      ],
      rules: {
        nameRequired: "请输入联系人",
        nameLength: "长度在 2 到 40 个字符",
        companyRequired: "请输入公司或机构名称",
        roleRequired: "请输入职位",
        emailRequired: "请输入工作邮箱",
        emailInvalid: "邮箱格式不正确",
        phoneRequired: "请输入联系电话",
        stageRequired: "请选择项目阶段",
        timelineRequired: "请选择预计启动时间",
        budgetRequired: "请选择预算区间",
        typeRequired: "请至少选择一种合作类型",
        goalsRequired: "请填写合作目标",
      },
    },
  },
};

export default {
  data() {
    return {
      currentLanguage: "zh",
      formMode: "graduate",
      ruleForm: createDefaultForm(),
    };
  },
  computed: {
    locale() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    isIndustryForm() {
      return this.formMode === "industry";
    },
    text() {
      const modeText = this.isIndustryForm
        ? this.locale.industry
        : this.locale.graduate;
      return {
        ...this.locale.common,
        ...modeText,
      };
    },
    trackOptions() {
      return this.text.trackOptions || [];
    },
    interestOptions() {
      return this.text.interestOptions || [];
    },
    resourceOptions() {
      return this.text.resourceOptions || [];
    },
    industryStageOptions() {
      return this.text.stageOptions || [];
    },
    industryBudgetOptions() {
      return this.text.budgetOptions || [];
    },
    industryTypeOptions() {
      return this.text.typeOptions || [];
    },
    rules() {
      if (this.isIndustryForm) {
        return {
          industryName: [
            {
              required: true,
              message: this.text.rules.nameRequired,
              trigger: "blur",
            },
            {
              min: 2,
              max: 40,
              message: this.text.rules.nameLength,
              trigger: "blur",
            },
          ],
          industryCompany: [
            {
              required: true,
              message: this.text.rules.companyRequired,
              trigger: "blur",
            },
          ],
          industryRole: [
            {
              required: true,
              message: this.text.rules.roleRequired,
              trigger: "blur",
            },
          ],
          industryEmail: [
            {
              required: true,
              message: this.text.rules.emailRequired,
              trigger: "blur",
            },
            {
              type: "email",
              message: this.text.rules.emailInvalid,
              trigger: ["blur", "change"],
            },
          ],
          industryPhone: [
            {
              required: true,
              message: this.text.rules.phoneRequired,
              trigger: "blur",
            },
          ],
          industryStage: [
            {
              required: true,
              message: this.text.rules.stageRequired,
              trigger: "change",
            },
          ],
          industryTimeline: [
            {
              type: "date",
              required: true,
              message: this.text.rules.timelineRequired,
              trigger: "change",
            },
          ],
          industryBudget: [
            {
              required: true,
              message: this.text.rules.budgetRequired,
              trigger: "change",
            },
          ],
          industryType: [
            {
              type: "array",
              required: true,
              message: this.text.rules.typeRequired,
              trigger: "change",
            },
          ],
          industryGoals: [
            {
              required: true,
              message: this.text.rules.goalsRequired,
              trigger: "blur",
            },
          ],
        };
      }

      return {
        name: [
          {
            required: true,
            message: this.text.rules.nameRequired,
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: this.text.rules.nameLength,
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: this.text.rules.regionRequired,
            trigger: "change",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: this.text.rules.date1Required,
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: this.text.rules.date2Required,
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: this.text.rules.interestsRequired,
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: this.text.rules.resourceRequired,
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: this.text.rules.descRequired,
            trigger: "blur",
          },
        ],
      };
    },
  },
  watch: {
    "$route.query.type"() {
      this.syncFormModeFromRoute();
    },
  },
  mounted() {
    this.initLanguage();
    this.syncFormModeFromRoute();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
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
    syncFormModeFromRoute() {
      const nextMode = this.$route.query.type === "industry" ? "industry" : "graduate";
      if (nextMode === this.formMode) {
        return;
      }
      this.formMode = nextMode;
      this.ruleForm = createDefaultForm();
      this.$nextTick(() => {
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.clearValidate();
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success(this.text.submitSuccess);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.application-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);
}

.form-section {
  .form-shell {
    background: linear-gradient(165deg, #ffffff 0%, #fbf6ff 100%);
    border: 1px solid rgba(102, 46, 125, 0.22);
    border-radius: 26px;
    padding: 28px;
    box-shadow: 0 14px 30px rgba(102, 46, 125, 0.12);
  }
}

.action-row {
  margin-top: 24px;
}

::v-deep .el-form-item__label {
  color: var(--lumia-primary);
  font-weight: 700;
  line-height: 1.4;
  padding-bottom: 8px;
}

::v-deep .el-input__inner,
::v-deep .el-textarea__inner {
  border-radius: 12px;
  border-color: rgba(102, 46, 125, 0.25);
  min-height: 44px;
}

::v-deep .el-input__inner:focus,
::v-deep .el-textarea__inner:focus {
  border-color: var(--lumia-primary);
}

::v-deep .el-select {
  width: 100%;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
::v-deep .el-radio__input.is-checked .el-radio__inner,
::v-deep .el-switch.is-checked .el-switch__core {
  border-color: var(--lumia-primary);
  background-color: var(--lumia-primary);
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label,
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: var(--lumia-primary);
}

::v-deep .el-button--primary {
  background-color: var(--lumia-primary);
  border-color: var(--lumia-primary);
  border-radius: 999px;
  min-width: 120px;

  &:hover,
  &:focus {
    background-color: var(--lumia-primary-strong);
    border-color: var(--lumia-primary-strong);
  }
}

::v-deep .el-button--default {
  border-radius: 999px;
  color: var(--lumia-primary);
  border-color: rgba(102, 46, 125, 0.4);

  &:hover,
  &:focus {
    background: rgba(102, 46, 125, 0.08);
    border-color: var(--lumia-primary);
    color: var(--lumia-primary);
  }
}

@media (max-width: 649px) {
  .form-section {
    .form-shell {
      padding: 20px;
    }
  }
}
</style>
