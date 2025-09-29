import { render, screen, fireEvent } from "@testing-library/react";
import ContentLimiter from "@/components/content-limiter"; // Ajuste o caminho de importação conforme necessário
import "@testing-library/jest-dom"; // Importe para ter acesso aos matchers de Jest DOM

// Mock do componente IconArrowDown, pois ele não é o foco deste teste
// Isso evita erros caso o ícone não esteja disponível ou tenha dependências externas
jest.mock("../components/icons/arrow-down", () => ({
  IconArrowDown: () => <svg data-testid="icon-arrow-down" />,
}));

describe("ContentLimiter", () => {
  const mockLabel = "Detalhes";
  const mockContent = "Este é o conteúdo a ser limitado.";

  // Função auxiliar para renderizar o componente
  const setup = (props = {}) => {
    return render(
      <ContentLimiter label={mockLabel} {...props}>
        <div data-testid="limited-content">{mockContent}</div>
      </ContentLimiter>
    );
  };

  // ---
  // Teste 1: Renderização Inicial (Fechado)
  // ---
  test("deve renderizar o conteúdo e o botão 'Ver completos' na montagem inicial", () => {
    setup();

    // Verifica se o conteúdo está presente
    expect(screen.getByTestId("limited-content")).toHaveTextContent(
      mockContent
    );

    // Verifica se o botão de expansão está visível com o texto correto
    const button = screen.getByRole("button", {
      name: `Ver ${mockLabel} completos`,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(`Ver Detalhes completos`);
  });

  // ---
  // Teste 2: Estilos de Limitação de Altura
  // ---
  test("deve aplicar a limitação de altura inicial e overflow 'hidden'", () => {
    const customMaxHeight = 250;

    setup({ maxHeight: customMaxHeight });

    // O div que envolve o conteúdo deve ter a altura limitada e overflow: hidden
    const contentWrapper = screen.getByTestId("limited-content").parentElement;

    // A altura máxima é aplicada via `style`
    expect(contentWrapper).toHaveStyle(`max-height: ${customMaxHeight}px`);

    // A classe `overflow-hidden` é aplicada
    expect(contentWrapper).toHaveClass("overflow-hidden");
  });

  // ---
  // Teste 3: Comportamento de Expansão (Abertura)
  // ---
  test("deve expandir o conteúdo e remover o botão ao clicar no botão 'Ver completos'", () => {
    setup();

    const button = screen.getByRole("button", {
      name: /Ver Detalhes completos/i,
    });

    // 1. Clica no botão para abrir
    fireEvent.click(button);

    // 2. Verifica se o botão desapareceu
    expect(button).not.toBeInTheDocument(); // O elemento não deve mais estar na DOM

    // 3. Verifica se os estilos de limitação de altura foram removidos (setados para 'unset')
    const contentWrapper = screen.getByTestId("limited-content").parentElement;

    // A altura máxima deve ser 'unset' quando aberto
    expect(contentWrapper).not.toHaveStyle("max-height: 400px");

    // A classe `overflow-hidden` deve ser removida (ou não estar presente)
    expect(contentWrapper).not.toHaveClass("overflow-hidden");
  });

  // ---
  // Teste 4: Uso de className personalizado
  // ---
  test("deve aplicar o className personalizado ao elemento raiz", () => {
    const customClass = "minha-classe-personalizada";
    const { container } = setup({ className: customClass });

    // O elemento raiz é o primeiro <div>
    expect(container.firstChild).toHaveClass("relative");
    expect(container.firstChild).toHaveClass(customClass);
  });

  // ---
  // Teste 5: Valor padrão de maxHeight
  // ---
  test("deve usar 400px como maxHeight padrão se não for fornecido", () => {
    setup(); // Sem passar maxHeight

    const contentWrapper = screen.getByTestId("limited-content").parentElement;

    expect(contentWrapper).toHaveStyle("max-height: 400px");
  });
});
