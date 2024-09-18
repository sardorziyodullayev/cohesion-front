export type HolidayByIdParams = {
   id: string | undefined; // id bo'sh bo'lishi mumkin
};

export type HolidayUser = {
   id: number;
   name: string;
   surname: string;
};

export type HolidayByIdResponse = {
   id: number;
   createdAt: string; // format: "2024-09-15T17:26:58.194973"
   updatedAt: string | null; // `null` bo'lishi mumkin
   user: HolidayUser;
   startDate: string; // format: "2024-01-15"
   endDate: string; // format: "2024-09-15"
   type: "VACATION"; // yoki boshqa turlar mavjud bo'lsa, ularni ham qo'shing
   status: "PENDING" | "APPROVED" | "REJECTED"; // status qiymatlari misol
   reason: string;
   approvalNote: string | null; // `null` bo'lishi mumkin
};
