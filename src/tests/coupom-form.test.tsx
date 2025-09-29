/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CouponForm from "@/app/p/[id]/components/sidebar/coupon/form";

// --- Mocks Setup ---

// 1. Mock the server action (though controlled by useActionState mock)
const mockSendCoupon = jest.fn();

jest.mock("../app/p/[id]/components/sidebar/coupon/actions", () => ({
  sendCoupon: () => mockSendCoupon,
}));

// 2. Control variables for useActionState mock
let mockState: any = { message: "", success: undefined };
let mockPending = false;
const mockFormAction = jest.fn();

// 3. Mock the 'react' module to control useActionState
// We return a controlled set of values for state, action, and pending status.
jest.mock("react", () => {
  const original = jest.requireActual("react");
  return {
    ...original,
    useActionState: jest.fn((action, initialState) => [
      mockState,
      mockFormAction, // This mock function represents the action wrapper
      mockPending,
    ]),
  };
});

// 4. Mock external components for isolation
// jest.mock("@/components/button", () => ({ children, ...props }) => (
//   <button data-testid="Button" {...props}>
//     {children}
//   </button>
// ));
// jest.mock("../card", () => ({ children, ...props }) => (
//   <div data-testid="SidebarCard" {...props}>
//     {children}
//   </div>
// ));
// jest.mock("@/components/tag", () => ({ children, color, ...props }) => (
//   <div data-testid="tag" data-color={color} {...props}>
//     {children}
//   </div>
// ));

describe("CouponForm", () => {
  const defaultProps = {
    productId: "prod123",
    className: "custom-class",
    savedCoupon: undefined,
  };

  // Reset the mock state before each test
  beforeEach(() => {
    jest.clearAllMocks();
    mockState = { message: "", success: undefined };
    mockPending = false;
  });

  // Test Case 1: Initial rendering when no coupon is saved (Send mode)
  it("should render the form to send a coupon when no coupon is saved", () => {
    render(<CouponForm {...defaultProps} />);

    // Check for the heading
    expect(screen.getByText("Cupom de desconto")).toBeInTheDocument();

    // Check for the input field
    expect(
      screen.getByPlaceholderText("Insira o cupom de desconto")
    ).toBeInTheDocument();
    expect(screen.getByTestId("coupon-input")).toHaveAttribute("name", "code");

    // Check for the "Enviar" button
    const sendButton = screen.getByRole("button", { name: /enviar/i });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).not.toBeDisabled();

    // Check for the hidden input action
    const hiddenActionInput = screen.getByDisplayValue("send-coupon");
    expect(hiddenActionInput).toHaveAttribute("name", "action");

    // Tag should not be visible
    expect(screen.queryByTestId("tag")).not.toBeInTheDocument();
  });

  // Test Case 2: Initial rendering when a coupon IS saved (Remove mode)
  it("should render the form to remove a coupon when a coupon is saved", () => {
    const savedCouponProps = { ...defaultProps, savedCoupon: "TESTE10" };

    // Manually set the initial state based on the component's internal logic for this scenario
    mockState = {
      message: `Cupom TESTE10 adicionado!`,
      success: true,
    };

    render(<CouponForm {...savedCouponProps} />);

    // Check for the success message Tag
    const successTag = screen.getByTestId("tag");
    expect(successTag).toBeInTheDocument();
    expect(successTag).toHaveTextContent("Cupom TESTE10 adicionado!");
    expect(successTag).toHaveClass("bg-green");

    // Input field for coupon code should NOT be visible
    expect(
      screen.queryByPlaceholderText("Insira o cupom de desconto")
    ).not.toBeInTheDocument();

    // Check for the "Remover" button
    const removeButton = screen.getByRole("button", { name: /remover/i });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).not.toBeDisabled();

    // Check for the hidden input action for removal
    const hiddenActionInput = screen.getByDisplayValue("remove-coupon");
    expect(hiddenActionInput).toHaveAttribute("name", "action");
  });

  // Test Case 3: Displaying pending state during send action
  it('should show "Enviando..." and disable the button during pending state (send mode)', () => {
    // Simulate pending state
    mockPending = true;
    render(<CouponForm {...defaultProps} />);

    const sendButton = screen.getByRole("button", { name: /enviando\.\.\./i });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeDisabled();

    // Message Tag should not be visible when pending
    expect(screen.queryByTestId("tag")).not.toBeInTheDocument();
  });

  // Test Case 4: Displaying pending state during remove action
  it('should show "Removendo..." and disable the button during pending state (remove mode)', () => {
    const savedCouponProps = { ...defaultProps, savedCoupon: "TESTE10" };
    // Simulate initial success state and then pending state
    mockState = { message: `Cupom TESTE10 adicionado!`, success: true };
    mockPending = true;

    render(<CouponForm {...savedCouponProps} />);

    const removeButton = screen.getByRole("button", {
      name: /removendo\.\.\./i,
    });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toBeDisabled();

    // Initial success message should be hidden when pending
    expect(screen.queryByTestId("tag")).not.toBeInTheDocument();
  });

  // Test Case 5: Displaying success message after action completes
  it("should display a success message with green color Tag", () => {
    // Simulate the state returned after a successful action
    mockState = { message: "Coupon successfully applied!", success: true };
    mockPending = false; // Action is complete

    render(<CouponForm {...defaultProps} />);

    const successTag = screen.getByTestId("tag");
    expect(successTag).toBeInTheDocument();
    expect(successTag).toHaveTextContent("Coupon successfully applied!");
    expect(successTag).toHaveClass("bg-green");
  });

  // Test Case 6: Displaying error message after action completes
  it("should display an error message with red color Tag", () => {
    // Simulate the state returned after a failed action
    mockState = { message: "Coupon expired or invalid.", success: false };
    mockPending = false; // Action is complete

    render(<CouponForm {...defaultProps} />);

    const errorTag = screen.getByTestId("tag");
    expect(errorTag).toBeInTheDocument();
    expect(errorTag).toHaveTextContent("Coupon expired or invalid.");
    expect(errorTag).toHaveClass("bg-red-400");
  });
});
