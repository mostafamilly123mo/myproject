import ApiProvider from "./api-provider";

export default class ApiService {
  provider;

  constructor(config) {
    this.provider = new ApiProvider(config);
  }

  get(url, config){
    const method = "GET";
    return this.provider.request({ method, url, ...config });
  }

  delete(url, config) {
    const method = "DELETE";
    return this.provider.request({ method, url, ...config });
  }

  post(
    url,
    data,
    config
  ){
    const method = "POST";
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  put(
    url,
    data,
    config
  ) {
    const method = "PUT";
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  patch(
    url,
    data,
    config
  ) {
    const method = "PATCH";
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }
}
