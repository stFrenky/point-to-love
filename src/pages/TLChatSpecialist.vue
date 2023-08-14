<script lang="ts" setup="">
import {
  computed, onMounted, onUnmounted, ref, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TabsPaneContext } from 'element-plus';
import moment from 'moment';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { requestChat, currentChat, fileId } = storeToRefs(userStore);
const { getListChat, getCurrentChat, sendMessage } = userStore;

const message = ref('');
const idValue = ref();
const isTimeChange = ref(false);
const intervalRef = ref();
const closedArray = ref();
const openedArray = ref();
const activeName = ref('active');

getListChat();

const switchChat = (id: number, timeBoolean: boolean) => {
  idValue.value = id;
  isTimeChange.value = timeBoolean;
  getCurrentChat(id);
};
const filterArrays = () => {
  closedArray.value = requestChat.value.data.filter((item) => item.closed === true);
  openedArray.value = requestChat.value.data.filter((item) => item.closed === false);
};
filterArrays();

const updatedChatList = computed(() => (activeName.value !== 'active' ? closedArray.value : openedArray.value));
const currentIdOfChat = computed(() => (idValue.value ? idValue.value : requestChat.value.data[0].request_id));
if (requestChat.value.data.length) {
  getCurrentChat(requestChat.value.data[0].request_id);
}

const sendMessageBtn = () => {
  const messageData = {
    chat_id: currentIdOfChat.value,
    content: message.value,
    file_ids: [],
  };
  const messageDataWithFiles = {
    chat_id: currentIdOfChat.value,
    content: message.value,
    file_ids: [fileId.value],
  };
  if (fileId.value === null) {
    sendMessage(messageData);
  } else {
    sendMessage(messageDataWithFiles);
  }
  setTimeout(() => {
    getCurrentChat(currentIdOfChat.value);
  }, 200);
  message.value = '';
};

const updateMessage = () => {
  getCurrentChat(currentIdOfChat.value);
};

onMounted(() => {
  const interval = 10000;

  intervalRef.value = setInterval(updateMessage, interval);
});

onUnmounted(() => {
  clearInterval(intervalRef.value);
});
watch(activeName, () => {
  if (updatedChatList.value.length) {
    idValue.value = updatedChatList.value[0].request_id;
    console.log(updatedChatList.value);
    getCurrentChat(idValue.value);
  }
});
</script>

<template>
  <div class="chat">
    <div
      v-if="requestChat.data"
      class="chat__nav"
    >
      <template
        v-for="(user, index) in updatedChatList"
        :key="index"
      >
        <div
          class="user"
          :class="user.request_id === currentIdOfChat ? 'active' : ''"
          @click="switchChat(user.request_id, user.is_video_conference)"
        >
          <div class="user__ava">
            П
          </div>
          <div class="user__data">
            <div class="user__data-top">
              <div class="num">
                №{{ user.request_id }}
              </div>
              <div class="date">
                {{ moment(user.dt_created).format('DD.MM.YYYY') }}
              </div>
            </div>
            <div class="user__data-message">
              <!-- {{ user.service_name }} -->
              Общение с психологом
            </div>
          </div>
        </div>
      </template>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
    >
      <el-tab-pane
        label="Активные"
        name="active"
      >
        <div
          v-if="!openedArray.length"
          class="chat__default-text"
        >
          <div class="text">
            Вы еще не пользовались нашими услугами.
          </div>
          <span class="text">Для заказа услуги, пожалуйста, пройдите в раздел <a
            href="/"
            class="link"
          > мои пакеты.</a></span>
        </div>
        <ChatForm
          v-else
          v-model="message"
          :id-value="currentIdOfChat"
          :is-time-change="isTimeChange"
          :current-chat="currentChat"
          @click="sendMessageBtn"
        />
      </el-tab-pane>
      <el-tab-pane
        label="Завершенные"
        name="inactive"
      >
        <div
          v-if="!closedArray.length"
          class="chat__default-text"
        >
          <div class="text">
            У Вас нет активных заявок.
          </div>
          <span class="text">Для заказа услуги, пожалуйста, пройдите в раздел <a
            href="/"
            class="link"
          > мои пакеты.</a></span>
        </div>
        <ChatForm
          v-else
          v-model="message"
          closed
          :id-value="idValue"
          :current-chat="currentChat"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
.chat {
  display: flex;
  width: 100%;
  max-width: 1080px;
  height: 100%;
  margin: 40px 0 30px;
  padding: 0 15px;
  gap: 20px;
  .el-tab-pane {
    height: 100%;
  }
  .el-tabs--card {
    height: 100%;
    &>.el-tabs__header {
      height: 60px;
      margin: 0;
      .el-tabs__nav.is-top {
        border: none;
      }
      .el-tabs__item {
        font-family: 'GothamPro-bold',sans-serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 140%;
        padding-right: 120px!important;
        padding-left: 120px!important;
        width: 100%;
        height: 60px;
        color: #767676;
        background: #B1B1B1;
        border-radius: 20px 20px 0 0;
        &.is-active {
          color: #000000;
          background: #F7F7F7;
          border: none;
        }
      }
    }
    .el-tabs__content {
      height: calc(100% - 60px);
      background: #F7F7F7;
    }
  }
  &__default-text {
    font-family: 'GothamPro-bold',sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    padding: 50px 40px;
    .text {
      &:first-child {
        margin-bottom: 30px;
      }
    }
  }
  &__nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 220px;
    width: 220px;
    height: 780px;
    overflow-y: auto;
    padding: 12px;
    background: #F7F7F7;
    border-radius: 20px;
    .user {
      display: flex;
      cursor: pointer;
      gap: 12px;
      padding: 8px;
      border-radius: 12px;
      &__ava {
        font-family: 'GothamPro-bold',sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #9A1E2D;
        font-weight: 700;
        font-size: 17px;
        line-height: 140%;
        color: white;
      }
      &__data {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 3px;
        &-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .num {
            font-family: 'GothamPro-bold',sans-serif;
            font-weight: 700;
            font-size: 16px;
            line-height: 140%;
          }
          .date {
            font-weight: 400;
            font-size: 12px;
            line-height: 140%;
          }
        }
        &-message {
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
      }
      &.active {
        background: white;
      }
    }
  }
}
</style>
