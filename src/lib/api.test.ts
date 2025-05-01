import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./api";
import { CreateUserPayload, UpdateUserPayload } from "../types";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Functions", () => {
  describe("getUsers", () => {
    it("should fetch users successfully", async () => {
      const mockUsers = {
        users: [
          { id: "1", lastName: "Doe", dateOfBirth: "1990-01-01" },
          { id: "2", firstName: "Jane", lastName: "Smith", dateOfBirth: "1992-02-02" },
        ],
      };

      server.use(
        http.get("https://example.com/user", () => {
          return HttpResponse.json(mockUsers);
        })
      );

      const result = await getUsers();
      expect(result).toEqual(mockUsers);
    });

    it("should throw error when fetch fails", async () => {
      server.use(
        http.get("https://example.com/user", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(getUsers()).rejects.toThrow("Failed to fetch users");
    });
  });

  describe("getUser", () => {
    it("should fetch a single user successfully", async () => {
      const mockUser = {
        user: { id: "1", lastName: "Doe", dateOfBirth: "1990-01-01" },
      };

      server.use(
        http.get("https://example.com/user/:id", () => {
          return HttpResponse.json(mockUser);
        })
      );

      const result = await getUser("1");
      expect(result).toEqual(mockUser);
    });

    it("should throw error when fetch fails", async () => {
      server.use(
        http.get("https://example.com/user/:id", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(getUser("1")).rejects.toThrow("Failed to fetch user with id 1");
    });
  });

  describe("createUser", () => {
    it("should create user successfully", async () => {
      let requestBody: CreateUserPayload = {
        lastName: "",
        dateOfBirth: "",
      };
      
      server.use(
        http.post("https://example.com/user", async ({ request }) => {
          requestBody = await request.json() as CreateUserPayload;
          return new HttpResponse(null, { status: 201 });
        })
      );

      const userData: CreateUserPayload = {
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        firstName: "John",
      };

      await createUser(userData);
      expect(requestBody).toEqual(userData);
    });

    it("should throw error when creation fails", async () => {
      server.use(
        http.post("https://example.com/user", () => {
          return new HttpResponse(null, { status: 400 });
        })
      );

      const userData: CreateUserPayload = {
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
      };

      await expect(createUser(userData)).rejects.toThrow("Failed to create user");
    });
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      let requestBody: Omit<UpdateUserPayload, "id"> = {};

      server.use(
        http.put("https://example.com/user/:id", async ({ request }) => {
          requestBody = await request.json() as Omit<UpdateUserPayload, "id">;
          return new HttpResponse(null, { status: 200 });
        })
      );

      const userData: UpdateUserPayload = {
        id: "1",
        lastName: "Doe Updated",
      };

      await updateUser(userData);
      expect(requestBody).toEqual({ lastName: "Doe Updated" });
    });

    it("should throw error when update fails", async () => {
      server.use(
        http.put("https://example.com/user/:id", () => {
          return new HttpResponse(null, { status: 400 });
        })
      );

      const userData: UpdateUserPayload = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
      };

      await expect(updateUser(userData)).rejects.toThrow("Failed to update user");
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      server.use(
        http.delete("https://example.com/user/:id", () => {
          return new HttpResponse(null, { status: 200 });
        })
      );

      await expect(deleteUser("1")).resolves.not.toThrow();
    });

    it("should throw error when deletion fails", async () => {
      server.use(
        http.delete("https://example.com/user/:id", () => {
          return new HttpResponse(null, { status: 400 });
        })
      );

      await expect(deleteUser("1")).rejects.toThrow("Failed to delete user");
    });
  });
});
