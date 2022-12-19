import ApiService from "../components/utils/base-api/api-service";


class FilesService extends ApiService {
  constructor() {
    super({
      baseURL: `http://localhost/internet-applications/public`,
    });
  }

  getFilesHistory() {
    return this.post("/api/getFileHistory");
  }

  
}

export const filesService = new FilesService();
