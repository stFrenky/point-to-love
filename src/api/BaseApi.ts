import type { AxiosRequestConfig } from 'axios';
import { api } from '@/boot/axios';

export abstract class BaseApi {
  protected static async doRequest(config: AxiosRequestConfig) {
    const response = await api(config);
    return response.data;
  }
}
