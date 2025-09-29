import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import mockPaymentMethods from "./mocks/payment-method.json";
import PaymentMethods from "@/app/p/[id]/components/sidebar/payment-methods";

const getPaymentMethodsMock = jest.fn(() =>
  Promise.resolve(mockPaymentMethods)
);

jest.mock("../services/requests", () => ({
  getPaymentMethods: () => getPaymentMethodsMock(),
}));

describe("PaymentMethods", () => {
  it("deve chamar getPaymentMethodsMock ao ser renderizado", async () => {
    render(await PaymentMethods());

    expect(getPaymentMethodsMock).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar o título principal e a mensagem de desconto estática", async () => {
    render(await PaymentMethods());

    expect(screen.getByText("Meios de pagamento")).toBeInTheDocument();

    const discountText = screen.getByText(/Pague em/i);
    expect(discountText).toBeInTheDocument();

    expect(discountText.querySelector("span")).toHaveTextContent(
      "até 18x sem juros"
    );
  });

  it("deve renderizar os títulos dos métodos de pagamento e todas as imagens retornadas", async () => {
    render(await PaymentMethods());

    // 1. Verifica os títulos dos métodos (usando o data-testid)
    const titles = screen.getAllByTestId("payment-method-title");
    expect(titles).toHaveLength(mockPaymentMethods.length); // Deve ser 4
    expect(titles[0]).toHaveTextContent("Linha de Crédito");
    expect(titles[1]).toHaveTextContent("Cartões de crédito");
    expect(titles[2]).toHaveTextContent("Pix");
    expect(titles[3]).toHaveTextContent("Boleto");

    // 2. Verifica as imagens renderizadas (Deve ser 7 imagens no total)
    const images = screen.getAllByRole("img");
    const totalImages = mockPaymentMethods.reduce(
      (count, method) => count + method.images.length,
      0
    );
    expect(images).toHaveLength(totalImages);

    // 3. Verifica as propriedades das imagens para garantir que os dados foram passados corretamente
    // Imagem 1 (Índice 0: Linha de Crédito - Mercado Pago)
    expect(images[0]).toHaveAttribute(
      "src",
      "http://localhost:3001/images/payment-methods/mercado-pago.svg"
    );
    expect(images[0]).toHaveAttribute("alt", "Mercado Pago");

    // Imagem 3 (Índice 2: Cartões de crédito - Elo)
    expect(images[2]).toHaveAttribute(
      "src",
      "http://localhost:3001/images/payment-methods/elo.svg"
    );
    expect(images[2]).toHaveAttribute("alt", "Elo");

    // Imagem 4 (Índice 3: Cartões de crédito - Visa) - Adicionado
    expect(images[3]).toHaveAttribute(
      "src",
      "http://localhost:3001/images/payment-methods/visa.svg"
    );
    expect(images[3]).toHaveAttribute("alt", "Visa");

    // Imagem 6 (Índice 5: Pix) - Adicionado
    expect(images[5]).toHaveAttribute(
      "src",
      "http://localhost:3001/images/payment-methods/pix.svg"
    );
    expect(images[5]).toHaveAttribute("alt", "Pix");

    // Última imagem (Índice 6: Boleto)
    expect(images[6]).toHaveAttribute(
      "src",
      "http://localhost:3001/images/payment-methods/boleto.svg"
    );
    expect(images[6]).toHaveAttribute("alt", "Boleto");
  });

  // Teste 4: Verifica o link de navegação
  it('deve renderizar o link "Confira outros meios de pagamento" com o href correto', async () => {
    render(await PaymentMethods());

    const link = screen.getByRole("link", {
      name: /confira outros meios de pagamento/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("text-blue-primary"); // Verifica a classe CSS do link
  });

  // Teste 5: Verifica o cenário de dados vazios
  it("deve renderizar corretamente o conteúdo estático quando não há métodos de pagamento", async () => {
    // Mocka o retorno para um array vazio, simulando "nenhum dado"
    getPaymentMethodsMock.mockResolvedValueOnce([]);

    render(await PaymentMethods());

    // O título estático e o desconto ainda devem estar presentes
    expect(screen.getByText("Meios de pagamento")).toBeInTheDocument();
    expect(screen.getByText(/18x sem juros/i)).toBeInTheDocument();

    // Não deve haver nenhum título de método de pagamento dinâmico
    expect(screen.queryAllByTestId("payment-method-title")).toHaveLength(0);

    // O link de "outros meios" ainda deve estar presente
    expect(
      screen.getByRole("link", { name: /confira outros meios de pagamento/i })
    ).toBeInTheDocument();
  });
});
