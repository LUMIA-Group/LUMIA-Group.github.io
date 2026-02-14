<template>
  <div class="application-page">
    <section class="lumia-section application-hero">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">{{ text.eyebrow }}</p>
        <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">{{ text.title }}</h1>
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
            <div class="lumia-grid-2">
              <el-form-item :label="text.nameLabel" prop="name">
                <el-input v-model="ruleForm.name" :placeholder="text.namePlaceholder" />
              </el-form-item>

              <el-form-item :label="text.trackLabel" prop="region">
                <el-select v-model="ruleForm.region" :placeholder="text.trackPlaceholder">
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
const I18N = {
  en: {
    eyebrow: "Application",
    title: "Join the Lab",
    subtitle: "Tell us about your background, research interests, and collaboration goals.",
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
    statementPlaceholder: "Describe your background, goals, and planned research.",
    submit: "Submit",
    reset: "Reset",
    submitSuccess: "Submitted successfully. We will contact you soon.",
    trackOptions: [
      { label: "PhD", value: "phd" },
      { label: "Master", value: "master" },
      { label: "Internship", value: "intern" },
      { label: "Research Collaboration", value: "collab" },
    ],
    interestOptions: [
      { label: "Large Language Models", value: "llm" },
      { label: "Multimodal Learning", value: "multimodal" },
      { label: "Graph Learning", value: "graph" },
      { label: "Speech & Audio", value: "speech" },
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
  zh: {
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
    submit: "提交申请",
    reset: "重置",
    submitSuccess: "提交成功，稍后我们会联系你。",
    trackOptions: [
      { label: "博士", value: "phd" },
      { label: "硕士", value: "master" },
      { label: "实习", value: "intern" },
      { label: "科研合作", value: "collab" },
    ],
    interestOptions: [
      { label: "大语言模型", value: "llm" },
      { label: "多模态学习", value: "multimodal" },
      { label: "图学习", value: "graph" },
      { label: "语音与音频", value: "speech" },
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
};

export default {
  data() {
    return {
      currentLanguage: "zh",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    trackOptions() {
      return this.text.trackOptions;
    },
    interestOptions() {
      return this.text.interestOptions;
    },
    resourceOptions() {
      return this.text.resourceOptions;
    },
    rules() {
      return {
        name: [
          { required: true, message: this.text.rules.nameRequired, trigger: "blur" },
          { min: 2, max: 30, message: this.text.rules.nameLength, trigger: "blur" },
        ],
        region: [{ required: true, message: this.text.rules.regionRequired, trigger: "change" }],
        date1: [
          { type: "date", required: true, message: this.text.rules.date1Required, trigger: "change" },
        ],
        date2: [
          { type: "date", required: true, message: this.text.rules.date2Required, trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: this.text.rules.interestsRequired,
            trigger: "change",
          },
        ],
        resource: [{ required: true, message: this.text.rules.resourceRequired, trigger: "change" }],
        desc: [{ required: true, message: this.text.rules.descRequired, trigger: "blur" }],
      };
    },
  },
  mounted() {
    this.initLanguage();
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
      if (event && event.detail && (event.detail === "en" || event.detail === "zh")) {
        this.currentLanguage = event.detail;
      }
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
