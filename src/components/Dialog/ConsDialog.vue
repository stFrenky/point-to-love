<script lang="ts" setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { usePackageStore } from '@/stores/package';
import router from '@/app/router';

const userStore = useUserStore();
const packageStore = usePackageStore();

const { selectedPackage } = storeToRefs(packageStore);
const { profileInfoData, acceptedCons } = storeToRefs(userStore);
const { entryCons } = userStore;

const selectedService = ref('');
const showTimeDialog = ref(false);
const dateValue = ref('');
const comment = ref('');
const formattedSelectedTime = ref('');
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  currentData: {
    type: Object,
    default: () => ({}),
  },
});
interface Service {
  id: number;
  name: string;
  description: string;
  is_video_conference: boolean;
}
const emit = defineEmits(['update:modelValue']);
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
const serviceData = computed(() => {
  const services = Object.values(props.currentData.services) as Service[];
  return services.find((service: any) => service.id === selectedService.value);
});
const sendRequest = (data: object) => {
  const consData = {
    assign_preferred: true,
    comment: comment.value,
    phone: profileInfoData.value.phone,
    service_id: serviceData?.value?.id,
  };
  const consDataWithTime = {
    assign_preferred: true,
    comment: comment.value,
    phone: profileInfoData.value.phone,
    service_id: serviceData?.value?.id,
    start_time: formattedSelectedTime.value,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  entryCons(data.is_video_conference ? consDataWithTime : consData);
};
const handleTimeSelected = (time: string) => {
  formattedSelectedTime.value = time;
};
const goToChat = async () => {
  await router.push('/chat-specialist');
  window.location.reload();
  dialogVisible.value = false;
  acceptedCons.value = true;
};
const openTimeModal = () => {
  showTimeDialog.value = true;
};
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    width="50%"
    class="consDialog"
  >
    <template #header="{ close }">
      <div class="dialog__container">
        <div class="title">
          Запись на консультацию
        </div>
        <img
          src="@/assets/icons/close-popup.svg"
          alt="close"
          class="c-pointer"
          @click="close"
        >
      </div>
    </template>
    <div class="consDialog__container">
      <div class="consDialog__title">
        {{ !acceptedCons ? 'Хотите перейти в чат?' : currentData.verbose_name }}
      </div>
      <el-select
        v-if="acceptedCons"
        v-model="selectedService"
        placeholder="Выберите услугу"
        size="large"
        style="width: 100%"
      >
        <el-option
          v-for="item in currentData.services"
          :key="item.id"
          :label="item.verbose_name"
          :value="item.id"
        />
      </el-select>
      <div
        v-if="acceptedCons"
        class="consDialog__textarea"
      >
        <textarea
          v-model="comment"
          placeholder="Помогите психологу подготовиться к консультации с вами, коротко опишите вашу проблему"
        />
        <div class="consDialog__textarea-text">
          <p>*не оставляйте поле пустым</p>
        </div>
      </div>
      <div
        v-if="acceptedCons && serviceData?.is_video_conference"
        class="consDialog__datePicker"
      >
        <span
          class="label c-pointer"
          @click="openTimeModal"
        >
          Назначить дату
          <img
            src="@/assets/icons/chevron.svg"
            alt="chevron"
          >
        </span>
        <p v-if="formattedSelectedTime">
          {{ dayjs(formattedSelectedTime).format('DD.MM.YYYY') }}
        </p>
      </div>
    </div>
    <template #footer>
      <TLBtn
        v-if="acceptedCons"
        text="Подтвердить"
        :disabled="!Boolean(serviceData?.is_video_conference ? formattedSelectedTime && comment && selectedService : (comment && selectedService))"
        @click="serviceData && sendRequest(serviceData)"
      />
      <TLBtn
        v-else
        text="Перейти"
        @click="goToChat"
      />
    </template>
  </el-dialog>
  <TimeDialog
    v-model="showTimeDialog"
    @selected-time="handleTimeSelected"
  />
</template>
<style lang="scss">
  .consDialog {
    .el-dialog__footer {
      .tl-btn {
        margin: 0 auto;
      }
    }
    &__container {
      width: 100%;
      max-width: 450px;
      margin: 0 auto;
    }
    &__title {
      display: flex;
      justify-content: center;
      font-weight: 700;
      font-size: 32px;
      line-height: 140%;
      color: #000000;
    }
    &__textarea {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 20px auto 0 auto;
      textarea {
        width: 100%;
        height: 211px;
        padding: 20px 10px;
        resize: none;
        border: 1px solid #CACACA;
        border-radius: 5px;
      }
      &-text {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-top: 12px;
      }
    }
    &__datePicker {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .label {
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        color: #000000;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: 0.2s;
        img {
          transition: 0.2s;
          width: 6px;
        }
        &:hover {
          img {
            transform: translate(5px);
          }
        }
      }
    }
  }
</style>
