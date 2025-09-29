import { render, screen } from "@testing-library/react";
import Description from "@/app/p/[id]/components/description";
import "@testing-library/jest-dom";

// Mock do ContentLimiter para isolar o componente Description.
// Assumimos que o ContentLimiter já tem seus próprios testes unitários.
jest.mock("../../components/content-limiter", () => {
  // eslint-disable-next-line react/display-name
  return ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="mocked-content-limiter" data-label={label}>
      {children}
    </div>
  );
});

describe("Description component", () => {
  const mockDescription =
    "<p>This is a rich HTML description</p><ul><li>Feature 1</li><li>Feature 2</li></ul>";
  const defaultProps = {
    description: mockDescription,
  };

  it("should render without crashing", () => {
    render(<Description {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /descrição/i })
    ).toBeInTheDocument();
  });

  it("should render the heading 'Descrição'", () => {
    render(<Description {...defaultProps} />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /descrição/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Descrição");
  });

  it("should render the description inside the ContentLimiter", () => {
    render(<Description {...defaultProps} />);
    // Verifica se o ContentLimiter mockado está sendo renderizado
    expect(screen.getByTestId("mocked-content-limiter")).toBeInTheDocument();

    // Verifica se o ContentLimiter recebe a prop 'label' correta
    expect(screen.getByTestId("mocked-content-limiter")).toHaveAttribute(
      "data-label",
      "descrição"
    );
  });

  it("should correctly render the HTML content using dangerouslySetInnerHTML", () => {
    render(<Description {...defaultProps} />);

    // Procuramos o conteúdo. Como ele é injetado via `dangerouslySetInnerHTML`,
    // procuramos um elemento que viria do HTML (e.g., um parágrafo ou item de lista).
    // Usamos `queryByText` com `exact: false` para ser mais flexível em relação a espaços/pontuação
    // e garantir que o HTML foi processado.

    // Verifica se o texto do HTML foi renderizado (procura por um item de lista, por exemplo)
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();

    // O parágrafo não é visível diretamente na árvore de acessibilidade
    // mas verificamos se o conteúdo está no DOM.
    const descriptionContainer = screen.getByText("Feature 1").parentElement; // pega o div pai que contem o innerHTML

    // A maneira mais segura de testar `dangerouslySetInnerHTML` é verificar
    // se o conteúdo HTML correto foi inserido no DOM.
    expect(descriptionContainer).toBeInTheDocument();
  });

  it("should render a different description content", () => {
    const customDescription = "<div>New text for testing.</div>";
    render(<Description description={customDescription} />);

    // Verifica o novo conteúdo
    expect(screen.getByText("New text for testing.")).toBeInTheDocument();
  });

  it("should handle an empty description string", () => {
    render(<Description description="" />);

    // O cabeçalho deve continuar lá
    expect(
      screen.getByRole("heading", { level: 2, name: /descrição/i })
    ).toBeInTheDocument();

    // O div com dangerouslySetInnerHTML deve estar vazio, mas presente.
    const container = screen
      .getByRole("heading", { level: 2 })
      .parentElement?.parentElement?.querySelector(".text-lg.text-gray");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
