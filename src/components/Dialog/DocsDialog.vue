<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { docList, profileInfoData } = storeToRefs(userStore);
const { putEmployees, getProfileInfo } = userStore;
const selectedValue = ref('');
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
const sendRequest = () => {
  putEmployees((profileInfoData.value.preferred_employee.id).toString());
  getProfileInfo();
  dialogVisible.value = false;
};
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    width="50%"
    :show-close="false"
    class="docsDialog"
  >
    <template #header="{ close }">
      <div class="dialog__container">
        <div class="title">
          Ваш приоритетный психолог
        </div>
        <img
          src="@/assets/icons/close-popup.svg"
          alt="close"
          class="c-pointer"
          @click="close"
        >
      </div>
    </template>
    <el-select
      v-model="profileInfoData.preferred_employee.id"
      placeholder="Выберите психолога"
      size="large"
      style="width: 100%"
    >
      <el-option
        v-for="item in docList"
        :key="item.id"
        :label="item.full_name"
        :value="item.id"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <TLBtn
          text="Отменить"
          @click="dialogVisible = false"
        />
        <TLBtn
          text="Выбрать"
          @click="sendRequest"
        />
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss">
  .docsDialog {
    .dialog-footer {
      display: inline-flex;
      gap: 20px;
    }
  }
</style>
