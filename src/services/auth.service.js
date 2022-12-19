import ApiService from "../components/utils/base-api/api-service";


class AuthService extends ApiService {
  constructor() {
    super({
      baseURL: `http://localhost/internet-applications/public`,
    });
  }

  register(userData) {
    return this.post("/api/register", userData);
  }

  login(userData) {
    return this.post("/api/login", userData);
  }

  
}

export const authService = new AuthService();
