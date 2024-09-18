import { api } from "./base";

class PositionApi {
  async getAllPositions() {
    const { data } = await api.get("position/get-all");

    return data;
  }
}

export const positionApi = new PositionApi();
