import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "../test/test-utils";
import { AddUserDialog } from "./add-user-dialog";
import { CreateUserPayload } from "../types";

import * as api from "../lib/api";

let createUserMock: MockInstance<(userData: CreateUserPayload) => Promise<void>>;

describe("AddUserDialog", () => {
    beforeEach(() => {
        createUserMock = vi.spyOn(api, "createUser");
    });

    afterEach(() => {
        createUserMock.mockRestore();
    });

    it("should render the add user button", () => {
        render(<AddUserDialog />);
        const addUserButton = screen.getByText("Add User");
        expect(addUserButton).toBeInTheDocument();
    });

    it("should open the dialog when the button is clicked", async () => {
        render(<AddUserDialog />);
        const addUserButton = screen.getByText("Add User");
        await userEvent.click(addUserButton);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByRole("group", { name: "Date of Birth" })).toBeInTheDocument();
    });

    it("should show validation errors when the form is submitted with no last name", async () => {
        render(<AddUserDialog />);
        const addUserButton = screen.getByText("Add User");
        await userEvent.click(addUserButton);
        const submitButton = screen.getByRole("button", { name: "Add" });
        await userEvent.click(submitButton);
        expect(screen.getByText("Last Name is required")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toHaveAttribute("aria-invalid", "true");
    });

    it("should not call API when form is invalid", async () => {
        render(<AddUserDialog />);
        
        await userEvent.click(screen.getByText("Add User"));
        const submitButton = screen.getByRole("button", { name: "Add" });
        await userEvent.click(submitButton);
    
        expect(createUserMock).not.toHaveBeenCalled();
    });

    it("should submit the form when all fields are valid", async () => {
        render(<AddUserDialog />);
        const addUserButton = screen.getByText("Add User");
        await userEvent.click(addUserButton);

        await userEvent.type(screen.getByLabelText("First Name"), "John");
        await userEvent.type(screen.getByLabelText("Last Name"), "Doe");
        
        const dateInput = screen.getByRole("group", { name: "Date of Birth" })
        await userEvent.type(dateInput, "01/01/2000");

        const submitButton = screen.getByRole("button", { name: "Add" });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(createUserMock).toHaveBeenCalledWith({
                firstName: "John",
                lastName: "Doe",
                dateOfBirth: "01/01/2000",
            });
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("should close the dialog when the cancel button is clicked", async () => {
        render(<AddUserDialog />);
        const addUserButton = screen.getByText("Add User");
        await userEvent.click(addUserButton);
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        await userEvent.click(cancelButton);
        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });
});

