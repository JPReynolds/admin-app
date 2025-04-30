import { User } from "../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";

export function UserCard({ user }: { user: User }) {
    return (
        <Card sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
        }}>
            <CardContent>
                <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                <Typography variant="body2">{user.dateOfBirth}</Typography>
            </CardContent>
            <CardActions>
                <EditUserDialog user={user} />
                <DeleteUserDialog userId={user.id} />
            </CardActions>
        </Card>
    );
}
