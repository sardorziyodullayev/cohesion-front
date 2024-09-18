import { api } from "./base";
import { GetAllMeetingsParams } from "@/shared/lib/types";

class HolidaysApi {
  async getAllHolidays({ page, size }: GetAllMeetingsParams) {
    const { data } = await api.get("time-off/all", {
      params: { page, size },
    });

    return data;
  }

  async createHoliday(param) {
    const { data } = await api.post("time-off/create", param);

    return data;
  }
}

export const holidaysApi = new HolidaysApi();
