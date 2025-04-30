import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DialogActions from "@mui/material/DialogActions";
import { UpdateUserPayload, User } from "../types";
import { updateUser } from "../lib/api";

export function EditUserDialog({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const { mutate } = useMutation({
        mutationFn: (user: UpdateUserPayload) => updateUser(user),
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
        mutate({ id: user.id, firstName, lastName, dateOfBirth });
        handleClose();
    };

    return (
        <>
            <Button variant="text" color="primary" onClick={handleOpen}>Edit</Button>
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
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        name="firstName"
                        label="First Name"
                        defaultValue={user.firstName}
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        required
                        defaultValue={user.lastName}
                    />
                    <DatePicker
                        name="dateOfBirth"
                        label="Birth Date"
                        defaultValue={dayjs(user.dateOfBirth)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
