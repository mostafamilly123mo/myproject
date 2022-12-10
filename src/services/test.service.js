import ApiService from "../components/utils/base-api/api-service";


class TestService extends ApiService {
  constructor() {
    super({
      baseURL: `https://reqres.in/api`,
    });
  }

  testGet() {
    return this.get("/users?page=2");
  }

  
}

export const testService = new TestService();
