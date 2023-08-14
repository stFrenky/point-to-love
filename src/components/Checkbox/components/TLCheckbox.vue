<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  idFor: string;
  popupCheckbox?: boolean;
  modelValue: boolean | false;
}
const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <div class="tl-checkbox">
    <!-- <input
      id="tl-checkbox"
      v-model="selected"
      class="tl-checkbox__input"
      type="checkbox"
      :class="{popupCheckbox: popupCheckbox}"
    >
    <label
      :class="{popupCheckbox: popupCheckbox}"
      class="tl-checkbox__label"
      for="tl-checkbox"
    ><slot /></label> -->
    <input
      :id="idFor"
      v-model="selected"
      type="checkbox"
      class="tl-checkbox__input"
    >
    <label
      :for="idFor"
      class="tl-checkbox__label"
    >
      <slot />
    </label>
  </div>
</template>

<style lang="scss">

.tl-checkbox {
  &__input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    &:checked + label {
      &:before {
        transform: scale(1);
      }
    }
  }

  &__label {
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    a {
      color: #9F2016;
      text-decoration: underline;
    }
    &::before, &::after {
      content: "";
      height: 20px;
      width: 20px;
      display: flex;
      justify-content: center;
      border-radius: 2px;
      background: #E6E6E6;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    &::before {
      content: url("@/assets/icons/check-mark.svg");
      background: #9F2016;
      transform: scale(0);
      transition: all .3s;
      z-index: 1;
    }
  }
}

.popupCheckbox::before {
    border: 1px solid #9A1E2D;
  }

</style>
