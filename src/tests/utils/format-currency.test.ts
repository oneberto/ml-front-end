import { formatCurrency } from "@/utils";

Expected: "R$ 100,00";
Received: "R$ 100,00";

describe("formatCurrency", () => {
  // Testa um valor inteiro positivo (por exemplo, 10000 que representa R$ 100,00)
  it("should correctly format a positive integer amount", () => {
    // 10000 / 100 = 100
    const result = formatCurrency(10000);
    expect(result).toBe("R$ 100,00");
  });

  // Testa um valor com centavos (por exemplo, 12345 que representa R$ 123,45)
  it("should correctly format an amount with cents", () => {
    // 12345 / 100 = 123.45
    const result = formatCurrency(12345);
    expect(result).toBe("R$ 123,45");
  });

  // Testa um valor próximo de zero, mas positivo (por exemplo, 5 que representa R$ 0,05)
  it("should correctly format an amount less than one real (cents)", () => {
    // 5 / 100 = 0.05
    const result = formatCurrency(5);
    expect(result).toBe("R$ 0,05");
  });

  // Testa o valor zero (comportamento padrão quando nenhum argumento é passado)
  it("should format zero when no argument is provided", () => {
    // 0 / 100 = 0 (usando o valor padrão 'amount = 0')
    const result = formatCurrency();
    expect(result).toBe("R$ 0,00");
  });

  // Testa o valor zero explicitamente
  it("should format zero when 0 is passed", () => {
    // 0 / 100 = 0
    const result = formatCurrency(0);
    expect(result).toBe("R$ 0,00");
  });

  // Testa um valor grande (com separadores de milhar)
  it("should correctly format a large amount with thousands separator", () => {
    // 123456789 / 100 = 1234567.89
    const result = formatCurrency(123456789);
    expect(result).toBe("R$ 1.234.567,89");
  });

  // Testa valores negativos (se o seu sistema de negócio permitir)
  it("should correctly format a negative amount", () => {
    // -5000 / 100 = -50
    const result = formatCurrency(-5000);
    // Nota: O formato de moeda Intl.NumberFormat para pt-BR geralmente exibe o sinal de menos.
    expect(result).toBe("-R$ 50,00");
  });
});
