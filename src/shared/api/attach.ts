import { api } from "./base";

class AttachApi {
  async upload(param) {
    const { data } = await api.post(`attach/upload/${param.name}`, param.formData, {
      headers: {
        "Content-Type": "applicatoin/x-www-form-urlencoded",
      },
    });

    return data;
  }
}

export const attachApi = new AttachApi();
