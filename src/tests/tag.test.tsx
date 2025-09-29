import { render, screen } from "@testing-library/react";
import Tag from "@/components/tag"; // Ajuste o caminho de importação conforme sua estrutura de pastas
import "@testing-library/jest-dom";

// Descrição do grupo de testes para o componente Tag
describe("Tag Component", () => {
  // O conteúdo de texto que usaremos em todos os testes
  const tagContent = "Conteúdo da Tag";

  // 1. Teste para verificar se o conteúdo (children) é renderizado corretamente
  it("deve renderizar o conteúdo (children) corretamente", () => {
    // Renderiza o componente com o conteúdo de teste
    render(<Tag color="green">{tagContent}</Tag>);

    // Usa 'getByText' para buscar o elemento que contém o texto específico
    const tagElement = screen.getByText(tagContent);

    // Verifica se o elemento foi encontrado (está no documento)
    expect(tagElement).toBeInTheDocument();
    // Opcional: Verifica o nome da tag HTML
    expect(tagElement.tagName).toBe("SPAN");
  });

  // 2. Teste para verificar a aplicação da classe de cor padrão ("green")
  it("deve aplicar as classes corretas para a cor 'green'", () => {
    // Renderiza o componente com a cor "green"
    // Nota: Se a prop 'color' não for fornecida no componente, ela é 'green' por padrão,
    // mas é melhor ser explícito no teste.
    render(<Tag color="green">{tagContent}</Tag>);

    const tagElement = screen.getByText(tagContent);

    // Verifica se a classe 'bg-green text-white' está presente
    expect(tagElement).toHaveClass("bg-green");
    expect(tagElement).toHaveClass("text-white");
  });

  // 3. Teste para verificar a aplicação da classe de cor "black"
  it("deve aplicar as classes corretas para a cor 'black'", () => {
    // Renderiza o componente com a cor "black"
    render(<Tag color="black">{tagContent}</Tag>);

    const tagElement = screen.getByText(tagContent);

    // Verifica se a classe 'bg-black text-white' está presente
    expect(tagElement).toHaveClass("bg-black");
    expect(tagElement).toHaveClass("text-white");
    // Verificamos também que as classes de 'green' não estão presentes para garantir exclusividade
    expect(tagElement).not.toHaveClass("bg-green");
  });

  // 4. Teste para verificar se classes CSS personalizadas são aplicadas
  it("deve aplicar classes CSS personalizadas passadas via prop 'className'", () => {
    const customClass = "custom-border-red-500";
    // Renderiza o componente com a classe personalizada
    render(
      <Tag color="black" className={customClass}>
        {tagContent}
      </Tag>
    );

    const tagElement = screen.getByText(tagContent);

    // Verifica se a classe personalizada está presente
    expect(tagElement).toHaveClass(customClass);
    // Verifica se as classes padrão ainda estão presentes
    expect(tagElement).toHaveClass("inline-flex");
    expect(tagElement).toHaveClass("bg-black"); // Cor específica
  });
});
