import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/button";
import "@testing-library/jest-dom"; // Para matchers como toBeInTheDocument

// Mock para as classes de cores e tamanhos
// Nota: Em um ambiente real, você pode precisar configurar o Jest para lidar com
// o classNames e garantir que as classes do Tailwind CSS sejam carregadas/verificadas corretamente,
// mas para este teste unitário, verificamos a presença do componente e dos atributos básicos.

describe("Button Component", () => {
  // 1. Teste de Renderização Básica
  test("deve renderizar o botão com o texto children", () => {
    const buttonText = "Clique Aqui";
    render(<Button>{buttonText}</Button>);

    // Usando getByRole para ser mais próximo do comportamento do usuário (acessibilidade)
    const buttonElement = screen.getByRole("button", { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
  });

  // 2. Teste de funcionalidade de clique
  test("deve chamar a função onClick quando clicado", () => {
    // Cria uma função mock (simulada) para rastrear se foi chamada
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clicável</Button>);

    const buttonElement = screen.getByRole("button", { name: /clicável/i });

    // Simula o evento de clique do usuário
    fireEvent.click(buttonElement);

    // Verifica se o mock foi chamado uma vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 3. Teste para o atributo 'type' padrão e personalizado
  test("deve ter 'type=\"button\"' por padrão", () => {
    render(<Button>Padrão</Button>);
    const buttonElement = screen.getByRole("button", { name: /padrão/i });
    expect(buttonElement).toHaveAttribute("type", "button");
  });

  test("deve aceitar e aplicar o atributo 'type' personalizado", () => {
    render(<Button type="submit">Enviar</Button>);
    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  // 4. Teste de Variante (Cor)
  test("deve ter a variante 'primary' por padrão e classes Tailwind corretas", () => {
    render(<Button>Primary</Button>);
    const buttonElement = screen.getByRole("button", { name: /primary/i });
    // Verificamos a presença de uma classe específica da variante "primary"
    // Isso garante que o prop está sendo aplicado corretamente, embora as classes exatas dependam do Tailwind
    expect(buttonElement).toHaveClass("bg-blue-primary");
    expect(buttonElement).toHaveClass("text-white");
    expect(buttonElement).toHaveClass("hover:bg-blue-dark");
  });

  test("deve aplicar as classes corretas para a variante 'secondary'", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const buttonElement = screen.getByRole("button", { name: /secondary/i });
    // Verificamos as classes da variante "secondary"
    expect(buttonElement).toHaveClass("bg-blue-secondary");
    expect(buttonElement).toHaveClass("text-blue-primary");
    expect(buttonElement).not.toHaveClass("bg-blue-primary");
  });

  // 5. Teste de Tamanho
  test("deve ter o tamanho 'regular' por padrão e classes Tailwind corretas", () => {
    render(<Button>Regular</Button>);
    const buttonElement = screen.getByRole("button", { name: /regular/i });
    // Verificamos a presença de classes de tamanho "regular"
    expect(buttonElement).toHaveClass("rounded-md"); // Presente em regular e large
    expect(buttonElement).toHaveClass("text-sm");
    expect(buttonElement).toHaveClass("h-[32px]");
  });

  test("deve aplicar as classes corretas para o tamanho 'small'", () => {
    render(<Button size="small">Small</Button>);
    const buttonElement = screen.getByRole("button", { name: /small/i });
    // Verificamos as classes do tamanho "small"
    expect(buttonElement).toHaveClass("rounded-sm");
    expect(buttonElement).toHaveClass("text-xs");
    expect(buttonElement).toHaveClass("h-[24px]");
  });

  test("deve aplicar as classes corretas para o tamanho 'large'", () => {
    render(<Button size="large">Large</Button>);
    const buttonElement = screen.getByRole("button", { name: /large/i });
    // Verificamos as classes do tamanho "large"
    expect(buttonElement).toHaveClass("rounded-md");
    expect(buttonElement).toHaveClass("text-[15px]");
    expect(buttonElement).toHaveClass("h-[48px]");
  });

  // 6. Teste de classes personalizadas
  test("deve mesclar classes personalizadas com as classes padrão", () => {
    const customClass = "shadow-lg custom-class";
    render(<Button className={customClass}>Personalizado</Button>);
    const buttonElement = screen.getByRole("button", {
      name: /personalizado/i,
    });

    // Deve conter classes padrão (ex: font-semibold e classes da primary)
    expect(buttonElement).toHaveClass("font-semibold");
    // Deve conter a classe personalizada
    expect(buttonElement).toHaveClass("shadow-lg");
    expect(buttonElement).toHaveClass("custom-class");
  });

  // 7. Teste de outros props nativos
  test("deve passar props HTML nativos para o elemento button", () => {
    render(
      <Button disabled data-testid="test-button">
        Teste de Props
      </Button>
    );
    const buttonElement = screen.getByTestId("test-button");

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute("data-testid", "test-button");
  });
});
