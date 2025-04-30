import { User, Users } from "../types";

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