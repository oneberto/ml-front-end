import ProductDetails from "@/app/p/[id]/page";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import productDetailsMock from "./mocks/product-details.json";
import sellerMock from "./mocks/seller.json";
import paymentMethodMock from "./mocks/payment-method.json";

jest.mock("../services/requests", () => ({
  getProduct: () => Promise.resolve(productDetailsMock),
  getSeller: () => Promise.resolve(sellerMock),
  getPaymentMethods: () => Promise.resolve(paymentMethodMock),
}));

jest.mock("../app/p/[id]/components/sidebar/payment-methods", () => {
  return function MockedPaymentMethods() {
    return <div data-testid="payment-methods" />;
  };
});

describe("ProductDetails", () => {
  it("renders title", async () => {
    await act(async () => {
      render(await ProductDetails({ params: { id: "MLB1055308835" } }));
    });

    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});
