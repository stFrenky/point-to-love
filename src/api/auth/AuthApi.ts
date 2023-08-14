import { BaseApi } from '@/api/BaseApi';
import type { SendPhoneResponse } from './models';

export abstract class AuthApi extends BaseApi {
  public static async sendPhone(phone: string, smartToken: string): Promise<SendPhoneResponse> {
    return this.doRequest({
      method: 'POST',
      url: '/api/client/v1/auth/send_otp',
      data: {
        phone,
        'smart-token': smartToken,
      },
    });
  }
}
