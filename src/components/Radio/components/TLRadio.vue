<script setup lang="ts">

import { computed } from 'vue';

interface Props {
  label: string;
  id: string;
  name: string;
  modelValue: string;
  type: string;
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
  <div class="tl-radio">
    <label
      class="tl-radio__label"
      :for="id"
    ><input
      :id="id"
      v-model="mValue"
      :value="type"
      type="radio"
      :name="name"
    ><div class="tl-radio__custom" />{{ label }}</label>
  </div>
</template>

<style lang="scss">
  .tl-radio {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;

    @media (max-width:425px) {
      font-size: 18px;
    }

    &__label {
      cursor: pointer;
    }

    &__custom {
      display: inline-block;
      border: 2px solid #000;
      width: 42px;
      height: 42px;
      position: relative;
      vertical-align: middle;
      box-sizing: border-box;
      border-radius: 300px;
      background-color:#ffffff;
      margin-right: 15px;
      cursor: pointer;

      &::before {
        content: '';
        background: #9F2016;
        width: 24px;
        height: 24px;
        opacity: 0;
        transition: 0.3s;
        position: absolute;
        top: 7px;
        left: 7px;
        border-radius: 300px;
      }

    }

    input {
      display: none;
    }

    input:checked + .tl-radio__custom:before {
      opacity: 1;
    }
    input:checked + .tl-radio__custom{
      border: 2px solid #9F2016;
    }
  }
</style>
