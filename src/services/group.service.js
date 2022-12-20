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

  getGroupMembers(groupId, search) {
    return this.post("/api/getGroupMembers", {
      group_id: groupId,
      search_query: search,
    });
  }

  deleteMember(groupId, userId) {
    return this.get("/api/deleteUser", {
      params: { user_id: userId, group_id: groupId },
    });
  }
}

export const groupService = new GroupService();
