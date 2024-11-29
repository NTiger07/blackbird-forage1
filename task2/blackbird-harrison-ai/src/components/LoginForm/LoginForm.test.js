import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./index";

describe("LoginForm Validation Logic", () => {
  test("validates email correctly", () => {
    render(<LoginForm />);
    const emailField = screen.getByLabelText(/email address/i);

    // Invalid email
    fireEvent.change(emailField, { target: { value: "invalidemail" } });
    expect(screen.getByText("Email is not valid")).toBeInTheDocument();

    // Valid email
    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    expect(screen.queryByText("Email is not valid")).not.toBeInTheDocument();
  });

  test("validates password correctly", () => {
    render(<LoginForm />);
    const passwordField = screen.getByLabelText(/password/i);

    // Invalid password (no uppercase)
    fireEvent.change(passwordField, { target: { value: "weakpassword1!" } });
    expect(
      screen.getByText("Password doesn't meet requirements")
    ).toBeInTheDocument();

    // Valid password
    fireEvent.change(passwordField, { target: { value: "StrongPass1!" } });
    expect(
      screen.queryByText("Password doesn't meet requirements")
    ).not.toBeInTheDocument();
  });
});
