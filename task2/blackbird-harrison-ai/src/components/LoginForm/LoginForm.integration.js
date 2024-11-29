import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./index";

describe("LoginForm Integration Tests", () => {
  test("shows success message on valid form submission", () => {
    render(<LoginForm />);
    const emailField = screen.getByLabelText(/email address/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Enter valid email and password
    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.change(passwordField, { target: { value: "StrongPass1!" } });

    // Submit form
    fireEvent.click(submitButton);

    // Check success message
    expect(screen.getByText("Login Successful")).toBeInTheDocument();
  });

  test("shows error message on invalid form submission", () => {
    render(<LoginForm />);
    const emailField = screen.getByLabelText(/email address/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Enter invalid email and password
    fireEvent.change(emailField, { target: { value: "invalidemail" } });
    fireEvent.change(passwordField, { target: { value: "weakpass" } });

    // Submit form
    fireEvent.click(submitButton);

    // Check error message
    expect(screen.getByText("Login Unsuccessful")).toBeInTheDocument();
  });

  test("clears alert message after timeout", async () => {
    jest.useFakeTimers(); // Mock timers
    render(<LoginForm />);
    const emailField = screen.getByLabelText(/email address/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Enter valid email and password
    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.change(passwordField, { target: { value: "StrongPass1!" } });

    // Submit form
    fireEvent.click(submitButton);

    // Wait for the alert message to show up
    expect(screen.getByText("Login Successful")).toBeInTheDocument();

    // Fast forward the timer
    jest.runAllTimers();

    // Check if the alert message disappears
    expect(screen.queryByText("Login Successful")).not.toBeInTheDocument();
  });
});
