import ApiService from "../components/utils/base-api/api-service";

class GroupService extends ApiService {
  constructor() {
    super({
      baseURL: `http://localhost/internet-applications/public`,
    });
  }

  getUserGroups() {
    return this.get("/api/getMyGroups");
  }

  addNewGroup(group) {
    return this.post("/api/addGroup", group);
  }
}

export const groupService = new GroupService();
