import { describe, it, expect } from "vitest";
import { render } from "../test/test-utils";
import { UserCard } from "./user-card";
import { mockUser } from "../test/mockData";

describe("UserCard", () => {
  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);
    const { container } = render(<UserCard user={mockUser} />);
    expect(container).toHaveTextContent("John Doe");
    expect(container).toHaveTextContent("1990-01-01");

  });
});
