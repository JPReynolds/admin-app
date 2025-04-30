import { User } from "../types";

export const mockUser: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
};

export const mockUsers: User[] = [mockUser, {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
},
];
