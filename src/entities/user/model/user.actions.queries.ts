import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/shared/api/user.ts";

/**
 * A custom hook that provides a set of user-related actions utilizing mutations.
 * This hook can be used to perform various operations related to user management.
 *
 * @returns {Object} An object containing the following methods:
 * - updateUser: Function to update user information.
 * - updateUserInfo: Function to update specific user information.
 * - updateUserPassword: Function to update user's password.
 * - addUser: Function to add a new user.
 * - deleteUser: Function to delete an existing user.
 */
export const useUserActions = () => {
  const updateUser = useMutation({
    mutationFn: () => userApi.getAllUser(),
  });

  const updateUserInfo = useMutation({
    mutationFn: () => userApi.getAllUser(),
  });

  const updateUserPassword = useMutation({
    mutationFn: () => userApi.getAllUser(),
  });

  const addUser = useMutation({
    mutationFn: userApi.userAdd,
  });

  const deleteUser = useMutation({
    mutationFn: () => userApi.getAllUser(),
  });

  return {
    updateUser,
    updateUserInfo,
    updateUserPassword,
    addUser,
    deleteUser,
  };
};
