import { defineStore } from 'pinia';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus';
import router from '@/app/router';
import { PackageApi } from '@/api';
import type { PackageState, SelectedPackage } from './types/PackagesTypes';

export const usePackageStore = defineStore('packages', {
  state: () => <PackageState><unknown>({
    packages: [],
    myActivePackages: [],
    myInactivePackages: [],
    buyPackages: [],
    promoData: {},
    selectedPackage: null,
    showOrderDialog: false,
    token: localStorage.getItem('token') || '',
  }),
  getters: {

  },
  actions: {

    async getPackage() {
      try {
        this.packages = await PackageApi.getPackage();
        // здесь мы хардкодим, делаем проверку и убираем все объекты где alias не относятся к tochkalub
        this.packages = this.packages.filter((item: any) => item.alias.startsWith("tochkalub"));
        this.promoData = { alias: '', price: '' };
      } catch (error) {
        // Сделать обработку ошибок
      }
    },
    updatePackage(selectedPackage: SelectedPackage) {
      this.selectedPackage = selectedPackage;
    },
    async myPackage(status: string) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      try {
        const response = await axios.get(`/api/client/v1/user/package/${status}`, { headers });
        if (status === 'active') {
          this.myActivePackages = response.data;
        } else {
          this.myInactivePackages = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async promoSetup(code: string, alias: string) {
      const headers = {
        Authorization: `Token ${this.token}`,
      };
      try {
        if (!this.token) {
          const response = await axios.get(`/api/client/v1/promo/setup?code=${code}&alias=${alias}`);
          this.promoData = response.data;
        } else {
          const response = await axios.get(`/api/client/v1/promo/setup?code=${code}&alias=${alias}`, { headers });
          this.promoData = response.data;
        }
        ElMessage({
          message: 'Промо-код успешно применен',
          type: 'success',
        });
      } catch (error) {
        ElMessage({
          message: 'Не удалось применить промо-код',
          type: 'error',
        });
      }
    },
    async buyWithPromocode(data: object) {
      const headers = {
        Authorization: `Token ${this.token}`,
      };
      try {
        if (!this.token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const response = await axios.post(`/api/client/v1/buy/anonymous`, data);
          window.location.href = response.data.data._url;
          setTimeout(() => {
            router.push('/my-packages');
          }, 500);
          this.promoData = { alias: '', price: '' };
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const response = await axios.get(`/api/client/v1/buy/${data.alias}`, { headers });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const urlData = await axios.post(`/api/client/v1/buy/${data.alias}/${response.data[0]}?promo=${data.code}`, data, { headers });
          window.location.href = urlData.data.data._url;
          setTimeout(() => {
            router.push('/my-packages');
          }, 500);
          this.promoData = { alias: '', price: '' };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getBuyPackage(alias: string) {
      const headers = {
        Authorization: `Token ${this.token}`,
      };
      try {
        const response = await axios.get(`/api/client/v1/partner-packages/${alias}`, { headers });
        this.buyPackages = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
