import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCards, deleteCard as deleteCardApi } from "./apiMyCards";
import { useNavigate } from "react-router-dom";
import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
  getCurrentUser as getUserApi,
} from "./apiAuth";
import {
  updateAvatar as updateAvatarApi,
  updatePassword as updatePasswordApi,
} from "./apiUpdateUser";

import toast from "react-hot-toast";

export function useGetMyCards(userId) {
  const {
    isLoading,
    data: usersCards,
    error,
  } = useQuery({
    queryKey: ["myCards", userId],
    queryFn: () => getCards(userId),
  });

  return { isLoading, error, usersCards };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"]);
      navigate("/main", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Account successfully created!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logout, isLoading };
}

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export function useDeleteCard(uniqueCardId) {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCard } = useMutation({
    mutationFn: (uniqueCardId) => deleteCardApi(uniqueCardId),
    onSuccess: () => {
      toast.success("Card successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["myCards"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCard };
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePass, isLoading: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePass, isUpdating };
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isLoading: isUpdatingAvatar } = useMutation({
    mutationFn: ({ avatar, userId, currentUserAvatar }) =>
      updateAvatarApi(avatar, userId, currentUserAvatar),
    onSuccess: ({ user }) => {
      toast.success("Avatar successfully updated");
      queryClient.invalidateQueries("user");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateAvatar, isUpdatingAvatar };
}
