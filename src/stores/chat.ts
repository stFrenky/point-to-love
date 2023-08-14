import { defineStore } from 'pinia';
import axios from 'axios';
import {
  AuthApi, CheckOtp,
} from '@/api';
import type { ChatState } from './types/ChatTypes';
import router from '@/app/router';

export const useChatStore = defineStore('chat', {
  state: () => <ChatState>({
  }),
  getters: {

  },
  actions: {
  },
});
