import { useQuery } from "@tanstack/react-query";
import { meetingsApi } from "@/shared/api/meetings.ts";
import { meetingKeys } from "@/shared/config/query-keys/meetings.ts";
import { GetAllMeetingsParams } from "@/shared/lib/types";

/**
 * Fetches all meetings based on pagination parameters.
 *
 * Retrieves a list of meetings using the provided pagination options `page` and `size`.
 * Utilizes the `useQuery` hook to manage and cache the query results.
 * The `meetingKeys.getAllMeetings` function generates the cache key, and
 * the query function calls `meetingsApi.getAllMeetings` with the same parameters.
 *
 * This function is typically used within a React component to access meeting data.
 *
 * @param {Object} params - Pagination parameters.
 * @param {number} params.page - The current page number to fetch.
 * @param {number} params.size - The number of items to fetch per page.
 * @returns {Object} Query result object with data, error, and loading state.
 */
export const useGetAllMeetings = ({ page, size }: GetAllMeetingsParams) =>
  useQuery({
    ...meetingKeys.getAllMeetings(page, size),
    queryFn: () => meetingsApi.getAllMeetings({ page, size }),
  });
