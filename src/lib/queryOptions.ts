import { queryOptions } from "@tanstack/react-query";
import { getUsers, getUser } from "./api";

export const usersOptions = () => queryOptions({
  queryKey: ["users"],
  queryFn: () => getUsers(),
});

export const userOptions = (id: string) =>
  queryOptions({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });

