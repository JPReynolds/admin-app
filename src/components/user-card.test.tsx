import { describe, it, expect } from "vitest";
import { render } from "../test/test-utils";
import { UserCard } from "./user-card";
import { User } from "../types";

describe("UserCard", () => {
  const mockUser: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
  };

  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);
    const { container } = render(<UserCard user={mockUser} />);
    expect(container).toHaveTextContent("John Doe");
    expect(container).toHaveTextContent("1990-01-01");
  });
});
