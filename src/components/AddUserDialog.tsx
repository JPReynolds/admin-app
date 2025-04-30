import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DialogActions from "@mui/material/DialogActions";
import { CreateUserPayload } from "../types";
import { createUser } from "../lib/api";

export function AddUserDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const { mutate } = useMutation({
        mutationFn: (user: CreateUserPayload) => createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const dateOfBirth = formData.get("dateOfBirth") as string;
        const user = { firstName, lastName, dateOfBirth };
        mutate(user);
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>Add User</Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: "form",
                        onSubmit: handleSubmit,
                    },
                }}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        name="firstName"
                        label="First Name"
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        required
                    />
                    <DatePicker
                        name="dateOfBirth"
                        label="Birth Date"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
