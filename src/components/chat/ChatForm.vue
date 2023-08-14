<script lang="ts" setup>
import moment from 'moment';
import { storeToRefs } from 'pinia';
import {
  computed, onMounted, onUpdated, ref,
} from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { fileListIds, fileId } = storeToRefs(userStore);
const { uploadFile } = userStore;

interface FileItem {
  name: string;
  id: string | null;
}

const showTimeDialog = ref(false);

// Audio
// const isRecording = ref(false);
// const recordFile = ref();
// const recordFileState = ref(false);
// const record = ref();
// const recordTimer = ref();
// const recordTimerCount = ref(0);
// const recordLineCount = ref(0);
// const recordInterval = ref();
// const fileToSendLocal = ref();

// Files
const files = ref([]);
const fileNames = ref<FileItem[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const chatContainer = ref<HTMLDivElement | null>(null);

const props = defineProps({
  currentChat: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: String,
    default: '',
  },
  closed: {
    type: Boolean,
    default: false,
  },
  idValue: {
    type: String,
    default: '',
  },
  isTimeChange: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click', 'update:modelValue']);
const changeDate = () => {
  showTimeDialog.value = true;
};

const message = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onUpdated(scrollToBottom);

onMounted(scrollToBottom);

const sendBtn = (event: any) => {
  if (message.value || fileNames.value.length) {
    fileNames.value = [];
    emit('click', event);
  }
};

// Audio

// const stopRecord = () => {
//   let fileToSendLocalValue;
//   clearInterval(recordInterval.value);
//   clearTimeout(recordTimer.value);
//   record.value.stop().getMp3()
//     .then(([buffer, blob]) => {
//       const file = new File(buffer, 'me-at-thevoice.mp3', {
//         type: blob.type,
//         lastModified: Date.now(),
//       });

//       recordFile.value = new Audio(URL.createObjectURL(file));
//       recordFile.value.onended = () => {
//         recordFileState.value = false;
//       };

//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onloadend = () => {
//         const base64data = reader.result;
//         fileToSendLocalValue = {
//           file: base64data,
//           file_name: `${new Date().toDateString() + window.location.host}.mp3`,
//         };
//         fileToSendLocal.value = fileToSendLocalValue;
//       };
//     })
//     .catch((e: any) => {
//       alert('We could not retrieve your message');
//       console.log(e);
//     });
// };

// const startRecord = () => {
//   if (isRecording.value) {
//     return;
//   }
//   recordFile.value = null;
//   recordFileState.value = false;
//   record.value = new MR({
//     bitRate: 128,
//   });

//   record.value.start()
//     .then(() => {
//       recordTimer.value = setTimeout(() => {
//         stopRecord();
//       }, 60000);
//       recordTimerCount.value = 60;
//       recordLineCount.value = 0;
//       recordInterval.value = setInterval(() => {
//         recordTimerCount.value -= 0.1;
//         recordLineCount.value += 0.1;
//       }, 100);
//       isRecording.value = true;
//     })
//     .catch((e) => {
//       console.log(e, 'error');
//     });
// };

// watch(isRecording, (newValue) => {
//   if (!newValue) {
//     // Do something when recording stops
//   }
// });

// onBeforeUnmount(() => {
//   // Clean up any timers or resources before component unmounts
//   clearInterval(recordInterval.value);
//   clearTimeout(recordTimer.value);
// });

// Files
const openFile = () => {
  fileInput.value?.click();
};
const convertFileToBase64 = (file: any, callback: any) => {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
};

const changeFile = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  const file = e.target.files[0];
  if (files.value.length < 8) {
    convertFileToBase64(file, (resp: any) => {
      const fileToSend = {
        file: resp.currentTarget.result,
        file_name: file.name,
      };
      uploadFile(fileToSend);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      files.value.push(fileId.value);
      fileListIds.value = files.value;
      fileNames.value.push({ name: file.name, id: fileId.value });
    });
  }
};
const remove = (index: number) => {
  files.value.splice(index, 1);
  fileListIds.value = files.value;
  fileNames.value.splice(index, 1);
};
</script>
<template>
  <div class="chat__dialog">
    <div class="chat__dialog-header">
      <div class="ava">
        П
      </div>
      <div class="data">
        <div class="num">
          №{{ idValue }}
        </div>
        <div class="title">
          Письменная консультация в чате
        </div>
        <div
          v-if="isTimeChange"
          class="link"
          @click="changeDate"
        >
          Перенести консультацию
        </div>
      </div>
    </div>
    <div
      ref="chatContainer"
      class="chat__dialog-history"
    >
      <ul>
        <li
          v-for="(message, index) in currentChat.messages"
          :key="index"
          :class="message.kind === 'customer' ? 'my-message' : 'other-message'"
        >
          <div
            v-if="message.type === 'text'"
            class="item"
          >
            <div
              class="text"
              v-html="message.value"
            />
            <div class="time">
              {{ moment(message.dt_created).format('H:mm') }}
            </div>
          </div>
          <div
            v-if="message.type === 'file'"
            class="item file"
          >
            <div class="item__container">
              <a :href="message.link">
                <img
                  src="@/assets/icons/download.svg"
                  alt="download"
                  class="c-pointer"
                >
              </a>
              <div class="item__text">
                <div class="text">
                  {{ message.value }}
                </div>
                <div class="size">
                  {{ message.file_size }}
                </div>
              </div>
            </div>
            <div class="time">
              {{ moment(message.dt_created).format('H:mm') }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="fileNames && fileNames.length"
      class="chat__dialog-files"
    >
      <div
        v-for="(file, index) in fileNames"
        :key="index"
        class="file"
      >
        <div class="text">
          {{ file.name }}
        </div>
        <div
          class="close-icon"
          @click="remove(index)"
        >
          <img
            src="@/assets/icons/close_attachment.svg"
            alt="close"
          >
        </div>
      </div>
    </div>
    <div
      v-if="!closed"
      class="chat__dialog-message"
    >
      <div class="icon file">
        <input
          id="fileInput"
          ref="fileInput"
          style="display: none"
          type="file"
          @change="changeFile"
        >
        <img
          src="@/assets/icons/file.svg"
          alt="Attach File"
          @click="openFile"
        >
      </div>
      <input
        v-model="message"
        type="text"
      >
      <!-- <div class="icon audio" @click="startRecord">
        <img
          src="@/assets/icons/microphone.svg"
          alt="microphone"
        >
      </div> -->
      <div
        class="icon send"
        :class="message || fileNames.length ? '' : 'disabled'"
        @click="sendBtn"
      >
        <img
          src="@/assets/icons/send.svg"
          alt="send"
        >
      </div>
    </div>
    <TimeDialog
      v-model="showTimeDialog"
      changeTimeStatus
      :chat-id="idValue"
    />
  </div>
</template>
<style lang="scss">
  .chat {
    &__dialog {
      height: 100%;
      padding: 20px;
      &-header {
        display: flex;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #CACACA;
        .ava {
          font-family: 'GothamPro-bold',sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #9A1E2D;
          font-weight: 700;
          font-size: 17px;
          line-height: 140%;
          color: white;
        }
        .num {
          font-family: 'GothamPro-bold',sans-serif;
          font-weight: 700;
          font-size: 20px;
          line-height: 140%;
        }
      }
      &-files {
        width: 100%;
        max-width: 500px;
        margin-bottom: 12px;
        .file {
          display: flex;
          align-items: center;
          gap: 16px;
          .text {
            font-weight: 400;
            font-size: 14px;
            line-height: 140%;
            display: block;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            background-position: relative;
            overflow: hidden;
            -webkit-line-clamp: 1;
          }
          .close-icon {
            display: flex;
            cursor: pointer;
          }
        }
      }
      &-history {
        height: 490px;
        margin: 20px 0;
        background: white;
        border-radius: 10px;
        padding: 20px 40px;
        overflow-y: auto;
        ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          li {
            .item {
              max-width: 500px;
              width: fit-content;
              padding: 12px 16px;
              background: #F7F7F7;
              border-radius: 15px;
              &__container {
                display: flex;
                gap: 10px;
                align-items: flex-start;
                overflow: hidden;
              }
              .time {
                font-weight: 400;
                font-size: 10px;
                line-height: 10px;
                display: flex;
                justify-content: end;
                margin-top: 16px;
              }
              .text {
                word-wrap: break-word;
              }
              a {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffffff60;
                min-width: 40px;
                height: 40px;
                border-radius: 12px;
                transition: 0.2s;
                &:hover {
                  background: #ffffff;
                }
              }
              &.file {
                .size {
                  margin-top: 6px;
                  font-size: 14px;
                }
              }
            }
            &.other-message {
              .item {
                .time {
                  justify-content: end;
                }
              }
            }
            &.my-message {
              display: flex;
              justify-content: end;
              .item {
                background: #fdd;
              }
            }
          }
        }
      }
      &-message {
        display: flex;
        align-items: center;
        gap: 20px;
        background: white;
        height: 70px;
        width: 100%;
        padding: 0 15px;
        border-radius: 10px;
        input {
          width: 100%;
          border: none;
          outline: none;
        }
        .icon {
          cursor: pointer;
          width: 36px;
          height: 36px;
        }
        .send {
          &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
