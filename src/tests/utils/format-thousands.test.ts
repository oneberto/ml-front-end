import { formatThousands } from "@/utils";

// Define o escopo dos testes para a função formatThousands
describe("formatThousands", () => {
  // Teste 1: Valores menores que 1000
  it("should return the amount as a string if it is less than 1000", () => {
    expect(formatThousands(999)).toBe("999");
    expect(formatThousands(100)).toBe("100");
    expect(formatThousands(0)).toBe("0");
  });

  // Teste 2: Input undefined ou zero (usa o valor padrão 0)
  it('should return "0" for undefined or null input', () => {
    // Teste com undefined
    expect(formatThousands(undefined)).toBe("0");
    // Teste com valor padrão explícito (0)
    expect(formatThousands()).toBe("0");
  });

  // Teste 3: Milhares exatos
  it('should format exact thousands with "mil" suffix and no decimal', () => {
    expect(formatThousands(1000)).toBe("1 mil");
    expect(formatThousands(5000)).toBe("5 mil");
    // Verifica a formatação do separador de milhar pt-BR para números grandes (> 99999)
    expect(formatThousands(100000)).toBe("100 mil");
  });

  // Teste 4: Milhares com casas decimais (1 casa após a vírgula)
  it('should format thousands with one decimal place and "mil" suffix (pt-BR locale)', () => {
    // 1500 / 1000 = 1.5 -> "1,5 mil"
    expect(formatThousands(1500)).toBe("1,5 mil");
    // 95500 / 1000 = 95.5 -> "95,5 mil"
    expect(formatThousands(95500)).toBe("95,5 mil");
  });

  // Teste 5: Milhares e arredondamento
  it("should correctly handle rounding up in thousands range", () => {
    // 1999 / 1000 = 1.999. Com max 1 decimal, arredonda para 2.0 -> "2 mil"
    expect(formatThousands(1999)).toBe("2 mil");
    // 1550 / 1000 = 1.55. Com max 1 decimal, arredonda para 1.6 -> "1,6 mil"
    expect(formatThousands(1550)).toBe("1,6 mil");
  });

  // Teste 6: Caso limite (número muito próximo de 1 milhão)
  it("should handle amount close to 1 million correctly in thousands format", () => {
    // 999999 / 1000 = 999.999. Arredonda para 1000. toLocaleString('pt-BR') de 1000 é "1.000".
    expect(formatThousands(999999)).toBe("1.000 mil");
  });

  // Teste 7: Milhões exatos
  it('should format exact millions with "M" suffix and no decimal', () => {
    expect(formatThousands(1000000)).toBe("1 M");
    expect(formatThousands(5000000)).toBe("5 M");
    expect(formatThousands(10000000)).toBe("10 M");
  });

  // Teste 8: Milhões com casas decimais (1 casa após a vírgula)
  it('should format millions with one decimal place and "M" suffix (pt-BR locale)', () => {
    // 1500000 / 1000000 = 1.5 -> "1,5 M"
    expect(formatThousands(1500000)).toBe("1,5 M");
    // 1234567 / 1000000 = 1.234567 -> arredonda para 1.2 -> "1,2 M"
    expect(formatThousands(1234567)).toBe("1,2 M");
  });

  // Teste 9: Milhões e arredondamento
  it("should correctly handle rounding and decimal limits in millions range", () => {
    // 1999999 / 1000000 = 1.999999. Arredonda para 2.0 -> "2 M"
    expect(formatThousands(1999999)).toBe("2 M");
    // 1250000 / 1000000 = 1.25. Arredonda para 1.3 -> "1,3 M"
    expect(formatThousands(1250000)).toBe("1,3 M");
  });
});
