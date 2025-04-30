import { useQuery } from "@tanstack/react-query";
import { usersOptions } from "../lib/queryOptions";
import { AddUserDialog } from "./AddUserDialog";
import { UserCard } from "./UserCard";
export function UserList() {
    const { data } = useQuery(usersOptions());
    return (
        <section>
            <header>
                <h2>Users</h2>
                <AddUserDialog />
            </header>
            <ul>
                {data?.users.map((user) => (
                    <li key={user.id}>
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
