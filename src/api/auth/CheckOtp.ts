import { BaseApi } from '@/api/BaseApi';
import type { SendPhoneResponse } from './models';

export abstract class CheckOtp extends BaseApi {
  public static async checkOtp(phone: string, otp: string): Promise<SendPhoneResponse> {
    return this.doRequest({
      method: 'POST',
      url: '/api/client/v1/auth/check_otp',
      data: {
        phone,
        otp,
      },
    });
  }
}
