<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { changeTime, getTime } = userStore;
const { timeList } = storeToRefs(userStore);

const dateValue = ref('');
const activeIndex = ref(-1);
const disabledDays = ref([]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  chatId: {
    type: Number,
    default: null,
  },
  changeTimeStatus: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'selectedTime']);
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
const sendRequest = () => {
  const selectedTime = timeList.value[activeIndex.value].start * 1000;
  const formattedSelectedTime = dayjs(selectedTime).format();
  if (props.changeTimeStatus) {
    const time = {
      start_time: formattedSelectedTime,
    };
    changeTime(props.chatId, time);
  } else if (activeIndex.value !== -1) {
    emit('selectedTime', formattedSelectedTime);
  }
  dialogVisible.value = false;
};
const formattedTime = (timeRange: { start: number; end: number }) => {
  const start = dayjs(timeRange.start * 1000);
  const end = dayjs(timeRange.end * 1000);

  const startTime = start.format('H:mm');
  const endTime = end.format('H:mm');

  return `${startTime}-${endTime}`;
};
const chooseTime = (time: any, index: any) => {
  activeIndex.value = index;
  console.log(time.start);
};

watch(dateValue, () => {
  getTime(2, dayjs(dateValue.value).format('YYYY-MM-DD'));
});
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    width="50%"
    class="timeDialog"
  >
    <template #header="{ close }">
      <div class="dialog__container">
        <div class="title">
          Выберите дату
        </div>
        <img
          src="@/assets/icons/close-popup.svg"
          alt="close"
          class="c-pointer"
          @click="close"
        >
      </div>
    </template>
    <div class="timeDialog__container">
      <!-- <el-config-provider :locale="ru">
        <el-date-picker
          v-model="dateValue"
          type="datetime"
          format="DD.MM.YYYY HH:mm:ss"
          placeholder="Выберите дату"
        />
      </el-config-provider> -->
      <VDatePicker
        v-model="dateValue"
        mode="date"
        :disabled-dates="disabledDays"
      />
      <div class="timeDialog__time">
        <div
          v-for="(timeRange, index) in timeList"
          :key="index"
          class="item"
          :class="{ active: activeIndex === index }"
          @click="chooseTime(timeRange, index)"
        >
          {{ formattedTime(timeRange) }}
        </div>
      </div>
    </div>
    <template #footer>
      <TLBtn
        class="cancel"
        text="Отменить"
        @click="dialogVisible = false"
      />
      <TLBtn
        text="Подтвердить"
        @click="sendRequest"
      />
    </template>
  </el-dialog>
</template>
<style lang="scss">
  .timeDialog {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    &__time {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      .item {
        padding: 4px 6px;
        border-radius: 12px;
        border: 1px solid #dfdfdf;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        font-size: 16px;
        font-weight: 500;
        &.active {
          background: $main;
          color: white;
          &:hover {
            background: $main;
          }
        }
        &:hover {
          background: #f1f1f1;
        }
      }
    }
    .vc-day-content {
      width: 50px;
      height: 50px;
      font-size: 18px;
    }
    .vc-weekday {
      line-height: 28px;
    }
    .vc-highlight {
      width: 40px;
      height: 40px;
      background: $main;
    }
    .vc-title {
      background: inherit;
    }
    .el-dialog__footer {
      display: flex;
      justify-content: center;
      gap: 20px;
      .tl-btn {
        margin: inherit;
      }
    }
  }
</style>
