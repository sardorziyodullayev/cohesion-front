import { api } from "./base";

class InviteApi {
  async availableInviteLink(inviteId: string) {
    const { data } = await api.get(`invited-link/available/${inviteId}`);

    return data;
  }
}

export const inviteApi = new InviteApi();
