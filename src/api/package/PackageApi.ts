import { BaseApi } from '@/api/BaseApi';

export abstract class PackageApi extends BaseApi {
  public static async getPackage() {
    return this.doRequest({
      method: 'GET',
      url: '/api/client/v1/package',
    });
  }
}
