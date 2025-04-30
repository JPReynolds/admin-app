import { queryOptions } from "@tanstack/react-query";

export const usersOptions = queryOptions({
  queryKey: ["users"],
  queryFn: async () => {
    const response = await fetch("https://example.com/user");
    return response.json();
  },
});

export const userOptions = (id) =>
  queryOptions({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await fetch(`https://example.com/user/${id}`);
      return response.json();
    },
  });

