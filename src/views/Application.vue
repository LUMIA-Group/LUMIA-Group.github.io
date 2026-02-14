<template>
  <div class="application-page">
    <section class="mila-section application-hero">
      <div class="mila-container">
        <p class="mila-eyebrow mila-fade-up" style="--delay: 80ms">Application</p>
        <h1 class="mila-title mila-fade-up" style="--delay: 120ms">Join the Lab</h1>
        <p class="mila-subtitle mila-fade-up" style="--delay: 160ms">
          Tell us about your background, research interests, and collaboration goals.
        </p>
      </div>
    </section>

    <section class="mila-section form-section">
      <div class="mila-container">
        <div class="form-shell mila-fade-up" style="--delay: 200ms">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-position="top"
            class="demo-ruleForm"
          >
            <div class="mila-grid-2">
              <el-form-item label="姓名 / Name" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入你的姓名" />
              </el-form-item>

              <el-form-item label="申请方向 / Track" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择申请方向">
                  <el-option label="PhD" value="phd" />
                  <el-option label="Master" value="master" />
                  <el-option label="Internship" value="intern" />
                  <el-option label="Research Collaboration" value="collab" />
                </el-select>
              </el-form-item>
            </div>

            <div class="mila-grid-2">
              <el-form-item label="可开始时间 / Start Date" prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item label="可联系时间 / Best Contact Time" prop="date2">
                <el-time-picker
                  v-model="ruleForm.date2"
                  placeholder="选择时间"
                  style="width: 100%"
                />
              </el-form-item>
            </div>

            <el-form-item label="是否可远程 / Remote Friendly" prop="delivery">
              <el-switch v-model="ruleForm.delivery" />
            </el-form-item>

            <el-form-item label="研究兴趣 / Interests" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="Large Language Models" name="type" />
                <el-checkbox label="Multimodal Learning" name="type" />
                <el-checkbox label="Graph Learning" name="type" />
                <el-checkbox label="Speech & Audio" name="type" />
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="资源支持 / Resource" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="需要导师指导" />
                <el-radio label="已有合作项目" />
              </el-radio-group>
            </el-form-item>

            <el-form-item label="补充说明 / Statement" prop="desc">
              <el-input
                v-model="ruleForm.desc"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8 }"
                placeholder="介绍你的背景、目标和想做的研究"
              />
            </el-form-item>

            <el-form-item class="action-row">
              <el-button type="primary" @click="submitForm('ruleForm')">
                提交申请
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
        ],
        region: [{ required: true, message: "请选择方向", trigger: "change" }],
        date1: [
          { type: "date", required: true, message: "请选择开始日期", trigger: "change" },
        ],
        date2: [
          { type: "date", required: true, message: "请选择联系时间", trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个研究兴趣",
            trigger: "change",
          },
        ],
        resource: [{ required: true, message: "请选择资源需求", trigger: "change" }],
        desc: [{ required: true, message: "请填写补充说明", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success("提交成功，稍后我们会联系你。");
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
  border-bottom: 1px solid var(--mila-border);
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
  color: var(--mila-primary);
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
  border-color: var(--mila-primary);
}

::v-deep .el-select {
  width: 100%;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
::v-deep .el-radio__input.is-checked .el-radio__inner,
::v-deep .el-switch.is-checked .el-switch__core {
  border-color: var(--mila-primary);
  background-color: var(--mila-primary);
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label,
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: var(--mila-primary);
}

::v-deep .el-button--primary {
  background-color: var(--mila-primary);
  border-color: var(--mila-primary);
  border-radius: 999px;
  min-width: 120px;

  &:hover,
  &:focus {
    background-color: var(--mila-primary-strong);
    border-color: var(--mila-primary-strong);
  }
}

::v-deep .el-button--default {
  border-radius: 999px;
  color: var(--mila-primary);
  border-color: rgba(102, 46, 125, 0.4);

  &:hover,
  &:focus {
    background: rgba(102, 46, 125, 0.08);
    border-color: var(--mila-primary);
    color: var(--mila-primary);
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
