import { defineStore } from 'pinia';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus';
import {
  AuthApi, CheckOtp,
} from '@/api';
import type { UserState } from './types/ClientTypes';
import router from '@/app/router';

export const useUserStore = defineStore('user', {
  state: () => <UserState>({
    tel: null,
    email: null,
    token: null,
    sms: false,
    editStatus: true,
    acceptedCons: true,
    profileInfoData: {},
    docList: {},
    docCurrent: {},
    requestChat: {},
    currentChat: {},
    fileListIds: [],
    fileId: null,
    timeList: {},
  }),
  getters: {

  },
  actions: {
    /**
     * Установка токена
     * @param token
     * @param sms
     * @param editStatus
     * @param profileInfoData
     */
    setToken(token:string) {
      this.token = token;
      axios.defaults.headers.common.Authorization = `Token ${token}`;
    },
    /**
     * Метод отправки клиенту OTP кода на телефон
     * @param phone
     * @param smartToken
     */
    async sendPhone(phone: string, smartToken: string) {
      try {
        this.sms = true;
        const response = await AuthApi.sendPhone(phone, smartToken);
        ElMessage({
          message: response.detail,
          type: 'success',
        });
      } catch (error) {
        console.log(error);
        ElMessage({
          message: error,
          type: 'error',
        });
      }
    },
    async checkOtp(phone: string, code: string) {
      try {
        const result = await CheckOtp.checkOtp(phone, code);

        this.setToken(result.token);
        localStorage.setItem('token', result.token);
        router.go(0);
      } catch (error: any) {
        const preview = error.response?.data?.otp[0] || null;
        ElMessage({
          message: preview,
          type: 'error',
        });
      }
    },
    async getProfileInfo() {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get('/api/client/v1/user/info', { headers });
        this.profileInfoData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async editProfileInfo(data: object) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.put('/api/client/v1/user/info', data, { headers });
        this.editStatus = true;
      } catch (error) {
        // error
      }
    },
    async getEmployees() {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get('/api/client/v1/employees', { headers });
        this.docList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async putEmployees(docId: string) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.post('/api/client/v1/user/preferred-employee', { employee: docId }, { headers });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmployees() {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.delete('/api/client/v1/user/preferred-employee', { headers });
        router.go(0);
      } catch (error) {
        console.error(error);
      }
    },
    async getTime(id: number, day: string) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get(`/api/client/v1/slots/available/${id}/?day=${day}`, { headers });
        this.timeList = response.data;
      } catch (error) {
        this.timeList = [];
        ElMessage({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: error.response.data.day[0],
          type: 'error',
        });
      }
    },
    async getListChat() {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get('/api/client/v1/user/request?limit=100&offset=0', { headers });
        this.requestChat = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async entryCons(data: object) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.post('/api/client/v1/user/request', data, { headers });
        this.acceptedCons = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getCurrentChat(id: number) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get(`/api/client/v1/user/request/${id}`, { headers });
        this.currentChat = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async changeTime(id: number, data: object) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.put(`/api/client/v1/user/request/${id}/change-time-slot`, data, { headers });
        router.go(0);
      } catch (error) {
        console.error(error);
      }
    },
    async sendMessage(data: object) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        await axios.post('/api/client/v1/message', data, { headers });
        this.fileId = null;
      } catch (error) {
        console.error(error);
        this.fileId = null;
      }
    },
    async uploadFile(data: object) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const repsonse = await axios.post('/api/client/v1/file', data, { headers });
        this.fileId = repsonse.data.file_id;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
