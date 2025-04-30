import { User } from "../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
export function UserCard({ user }: { user: User }) {
    return (
        <Card>
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
