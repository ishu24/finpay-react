/// <reference types="jest" />

import React from "react";
import { render } from "../../tests/test-utils";
import SignIn from "./SignIn";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "../../store";

describe("SignIn", () => {
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    dispatchSpy = jest.spyOn(store, "dispatch");
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  test("renders headings and helper text", () => {
    render(<SignIn />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Hello there, sign in to continue/i),
    ).toBeInTheDocument();
    // top bar title - use heading role to avoid matching the button label
    expect(
      screen.getByRole("heading", { name: /^Sign in$/i }),
    ).toBeInTheDocument();
  });

  test("inputs accept text and password is masked", async () => {
    render(<SignIn />);

    const textInput = screen.getByPlaceholderText(
      /Text input/i,
    ) as HTMLInputElement;
    const pwdInput = screen.getByPlaceholderText(
      /Password/i,
    ) as HTMLInputElement;

    // user-event v13: use userEvent.type directly
    await userEvent.type(textInput, "john.doe");
    await userEvent.type(pwdInput, "secret");

    expect(textInput.value).toBe("john.doe");
    expect(pwdInput.value).toBe("secret");
    expect(pwdInput).toHaveAttribute("type", "password");
  });

  test("sign in button is disabled by default", () => {
    render(<SignIn />);
    const btn = screen.getByRole("button", { name: /^Sign in$/i });
    expect(btn).toBeDisabled();
  });

  test("sign up control is present", () => {
    render(<SignIn />);
    expect(
      screen.getByRole("button", { name: /Sign Up/i }),
    ).toBeInTheDocument();
  });

  test("forgot password text visible", () => {
    render(<SignIn />);
    expect(screen.getByText(/Forgot your password \?/i)).toBeInTheDocument();
  });

  test("does not dispatch actions on initial render", () => {
    render(<SignIn />);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
