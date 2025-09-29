import { render, screen, fireEvent } from "@testing-library/react";
import Gallery from "@/app/p/[id]/components/gallery"; // Ajuste o caminho conforme a sua estrutura de pastas
import "@testing-library/jest-dom";

// Mock para o componente FullScreen
// É importante mockar componentes filhos para isolar o teste do componente pai
// e evitar erros de dependências não resolvidas (como props, contexto, etc.)
jest.mock("../app/p/[id]/components/gallery/full-screen", () => {
  return ({
    imageUrl,
    onClose,
    onNext,
    onPrevious,
    totalItems,
    currentPosition,
  }: any) => (
    <div data-testid="mock-full-screen">
      <p>Full Screen Visible</p>
      <p>Image: {imageUrl}</p>
      <p>
        Position: {currentPosition}/{totalItems}
      </p>
      <button onClick={onClose} data-testid="full-screen-close">
        Close
      </button>
      <button onClick={onNext} data-testid="full-screen-next">
        Next
      </button>
      <button onClick={onPrevious} data-testid="full-screen-previous">
        Previous
      </button>
    </div>
  );
});

// Dados de teste
const mockImages = [
  { full: "/image-1-full.jpg", miniature: "/image-1-mini.jpg" },
  { full: "/image-2-full.jpg", miniature: "/image-2-mini.jpg" },
  { full: "/image-3-full.jpg", miniature: "/image-3-mini.jpg" },
];

describe("Gallery", () => {
  // Teste 1: Renderização inicial da imagem ativa
  it("should render the first image as active initially", () => {
    render(<Gallery images={mockImages} />);

    // Verifica se a imagem principal (full) está renderizada com o src da primeira imagem
    const fullImage = screen.getByTestId("image-full");
    expect(fullImage).toBeInTheDocument();
    expect(fullImage).toHaveAttribute("src", mockImages[0].full);

    // Verifica se o botão miniatura da primeira imagem tem a classe ativa
    const miniatureButtons = screen.getAllByTestId("image-miniature-button");
    expect(miniatureButtons[0]).toHaveClass("border-2 border-blue-primary");
    expect(miniatureButtons[1]).not.toHaveClass("border-2 border-blue-primary");
  });

  // Teste 2: Mudança de imagem ao clicar em uma miniatura
  it("should change the active image when a miniature button is clicked", () => {
    render(<Gallery images={mockImages} />);

    // Clica no botão miniatura da segunda imagem
    const miniatureButtons = screen.getAllByTestId("image-miniature-button");
    fireEvent.click(miniatureButtons[1]);

    // Verifica se a imagem principal mudou para a segunda imagem
    const fullImage = screen.getByTestId("image-full");
    expect(fullImage).toHaveAttribute("src", mockImages[1].full);

    // Verifica se o estado ativo mudou para a segunda miniatura
    expect(miniatureButtons[0]).not.toHaveClass("border-2 border-blue-primary");
    expect(miniatureButtons[1]).toHaveClass("border-2 border-blue-primary");
  });

  // Teste 3: Abertura e Fechamento do FullScreen
  it("should toggle the FullScreen component visibility when clicking the main image and the close button", () => {
    render(<Gallery images={mockImages} />);

    // Verifica se o FullScreen *não* está visível inicialmente
    expect(screen.queryByTestId("mock-full-screen")).not.toBeInTheDocument();

    // Clica na imagem principal para abrir o FullScreen
    const fullImage = screen.getByTestId("image-full");
    fireEvent.click(fullImage);

    // Verifica se o FullScreen *está* visível
    const fullScreen = screen.getByTestId("mock-full-screen");
    expect(fullScreen).toBeInTheDocument();
    expect(
      screen.getByText(`Image: ${mockImages[0].full}`)
    ).toBeInTheDocument(); // Verifica a imagem correta

    // Clica no botão de fechar do FullScreen
    const closeButton = screen.getByTestId("full-screen-close");
    fireEvent.click(closeButton);

    // Verifica se o FullScreen *não está* mais visível
    expect(screen.queryByTestId("mock-full-screen")).not.toBeInTheDocument();
  });

  // Teste 4: Navegação 'Próxima' no FullScreen (ciclo)
  it("should navigate to the next image and cycle to the first one when reaching the end", () => {
    render(<Gallery images={mockImages} />);

    // 1. Abre o FullScreen
    fireEvent.click(screen.getByTestId("image-full"));
    const nextButton = screen.getByTestId("full-screen-next");

    // 2. Navega para a segunda imagem (índice 1)
    fireEvent.click(nextButton);
    expect(
      screen.getByText(`Image: ${mockImages[1].full}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Position: 2/3")).toBeInTheDocument();

    // 3. Navega para a terceira imagem (índice 2)
    fireEvent.click(nextButton);
    expect(
      screen.getByText(`Image: ${mockImages[2].full}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Position: 3/3")).toBeInTheDocument();

    // 4. Navega para a próxima: deve voltar para a primeira imagem (índice 0)
    fireEvent.click(nextButton);
    expect(
      screen.getByText(`Image: ${mockImages[0].full}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Position: 1/3")).toBeInTheDocument();
  });

  // Teste 5: Navegação 'Anterior' no FullScreen (ciclo)
  it("should navigate to the previous image and cycle to the last one when reaching the start", () => {
    render(<Gallery images={mockImages} />);

    // 1. Abre o FullScreen
    fireEvent.click(screen.getByTestId("image-full"));
    const previousButton = screen.getByTestId("full-screen-previous");

    // 2. Navega para a anterior: deve ir para a última imagem (índice 2)
    fireEvent.click(previousButton);
    expect(
      screen.getByText(`Image: ${mockImages[2].full}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Position: 3/3")).toBeInTheDocument();

    // 3. Navega para a imagem anterior (índice 1)
    fireEvent.click(previousButton);
    expect(
      screen.getByText(`Image: ${mockImages[1].full}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Position: 2/3")).toBeInTheDocument();
  });

  // Teste 6: Navegação no FullScreen deve atualizar a imagem da Galeria
  it("should update the gallery's main image when navigating via FullScreen's controls", () => {
    render(<Gallery images={mockImages} />);

    const fullImage = screen.getByTestId("image-full");
    const miniatureButtons = screen.getAllByTestId("image-miniature-button");

    // Imagem inicial
    expect(fullImage).toHaveAttribute("src", mockImages[0].full);

    // Clica na miniatura 2 (índice 1)
    fireEvent.click(miniatureButtons[1]);
    expect(fullImage).toHaveAttribute("src", mockImages[1].full);

    // Abre o FullScreen
    fireEvent.click(fullImage);
    const nextButton = screen.getByTestId("full-screen-next");

    // Clica em 'Próximo' no FullScreen (vai para o índice 2)
    fireEvent.click(nextButton);

    // Fecha o FullScreen
    fireEvent.click(screen.getByTestId("full-screen-close"));

    // Verifica se a imagem da Galeria foi atualizada para a terceira
    expect(fullImage).toHaveAttribute("src", mockImages[2].full);
    // Verifica se o estado ativo das miniaturas também foi atualizado
    expect(miniatureButtons[1]).not.toHaveClass("border-2 border-blue-primary");
    expect(miniatureButtons[2]).toHaveClass("border-2 border-blue-primary");
  });
});
