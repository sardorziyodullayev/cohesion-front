/**
 * Calculates the total number of pages required to display all items.
 *
 * @param {number} totalItems - The total number of items to be paginated.
 * @param {number} [limit=10] - The number of items to display per page.
 * @returns {number} The total number of pages required.
 */
export const getTotal = (totalItems: number, limit: number = 10): number => {
  return Math.ceil(totalItems / limit);
};
