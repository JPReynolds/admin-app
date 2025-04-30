import { CreateUserPayload, UpdateUserPayload, User, Users } from "../types";

export async function getUsers(): Promise<Users> {
    const response = await fetch("https://example.com/user");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data as Users;
}
  
export async function getUser(id: string): Promise<User> {
    const response = await fetch(`https://example.com/user/${id}`);
        if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    const data = await response.json();
    return data as User;
}

export async function createUser(userData: CreateUserPayload): Promise<User> {
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

    const newUser = await response.json();
    return newUser as User;
}

export async function updateUser(userData: UpdateUserPayload): Promise<User> {
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

    const updatedUser = await response.json();
    return updatedUser as User;
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
