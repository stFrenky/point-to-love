<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    type: string;
    placeholder?: string;
    label?: string;
    about?: string;
    certificateInput?: boolean;
    certificateTel?: boolean;
    paymentInfo?: boolean;
    paymentCertificate?: boolean;
    profileInput?: boolean;
    modelValue?: string | null;
    disabled?: boolean | false;
    value?: string | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>
<template>
  <div
    class="tl-input__wrap"
    :class="{ paymentInfo: paymentInfo, paymentCertificate: paymentCertificate, profileInput: profileInput}"
  >
    <label
      v-if="label"
      class="tl-input__label"
    >{{ label }}</label>
    <input
      v-if="type === 'dateBirthDate'"
      ref="el"
      v-model="mValue"
      class="tl-input"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ certificateInput: certificateInput, certificateTel: certificateTel, profileInput: profileInput }"
    >
    <input
      v-else
      v-model="mValue"
      class="tl-input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ certificateInput: certificateInput, certificateTel: certificateTel, profileInput: profileInput }"
    >
    <!-- <input
      v-else
      ref="el"
      v-model="mValue"
      class="tl-input 1"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ certificateInput: certificateInput, certificateTel: certificateTel, profileInput: profileInput }"
    > -->
    <div />
    <div
      v-if="about"
      class="tl-input__about"
    >
      {{ about }}
    </div>
  </div>
</template>

<style lang="scss">
.el-form-item {
  width: 100%;
  .el-form-item__content {
    width: 100%;
  }
.el-date-editor--date {
  width: 100%!important;
  height: 44px!important;
  font-size: 16px;
  line-height: 140%;
  color: #373737;
  .el-input__wrapper {
    width: 100%;
    padding: 10px 15px;
  }
  .el-input__prefix {
    display: none;
  }
}
}
.el-form-item--default {
  margin-bottom: 0!important;
  .el-form-item {
    margin-bottom: 0!important;
    &__content {
      margin-left: 0!important;
    }
  }
}

  .tl-input {
    width: 100%;
    height: 46px;
    border: none;
    appearance: none;
    outline: none;
    font-size: 24px;
    line-height: 150%;
    &:disabled {
      color: #a8abb2 !important;
      background-color: #f5f7fa;
    }
    &__wrap {
      border-bottom: 2px solid #2E2E2E;
      position: relative;
    }

    &__wrap.profileInput {
      border: none;
      border-radius: 5px;
      overflow: hidden;
      width: 100%;
      .tl-input {
        border: 1px solid #E9EBED;
        border-radius: 5px;
        &:focus {
          border-color: #9A1E2D;
        }
      }
    }

    &__wrap.paymentCertificate {
      border-bottom: 2px solid #DDDDDD;
    }

    &__label {
      position: absolute;
      top: -15px;
      font-size: 13px;
      line-height: 12px;
      color: #3C3C3C;
    }

    &__about {
      position: absolute;
      font-size: 14px;
      bottom: -25px;
      transform: translateX(-50%);
      line-height: 13px;
      text-align: center;
      left: 50%;
      width: 100%;
      color: #808080;
    }
  }

  .tl-input.certificateInput {
    font-size: 15px;
    line-height: 14px;
    height: 25px;
    background: #F7F7F7;
  }

  .tl-input.certificateTel {
    padding-left: 25px;
  }

  .tl-input.profileInput {
    font-size: 16px;
    line-height: 140%;
    color: #373737;
    padding: 10px 15px;
    height: 42px;

  }

  .tl-input.profileInput::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #c3c2c2;
  }
</style>
