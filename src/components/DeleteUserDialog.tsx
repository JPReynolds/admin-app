import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { deleteUser } from "../lib/api";
import DialogContentText from "@mui/material/DialogContentText";

export function DeleteUserDialog({ userId }: { userId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const { mutate } = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return (
        <>
            <Button variant="text" color="error" onClick={handleOpen}>Delete</Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => mutate(userId)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
