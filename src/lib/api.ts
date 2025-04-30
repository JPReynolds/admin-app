import { CreateUserPayload, UpdateUserPayload, UsersResponse, UserResponse } from "../types";

export async function getUsers(): Promise<UsersResponse> {
    const response = await fetch("https://example.com/user");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data as UsersResponse;
}
  
export async function getUser(id: string): Promise<UserResponse> {
    const response = await fetch(`https://example.com/user/${id}`);
        if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    const data = await response.json();
    return data as UserResponse;
}

export async function createUser(userData: CreateUserPayload): Promise<void> {
    const response = await fetch("https://example.com/user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

}

export async function updateUser(userData: UpdateUserPayload): Promise<void> {
    const { id, ...updateData } = userData;
    const response = await fetch(`https://example.com/user/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
}
  
export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`https://example.com/user/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
}
