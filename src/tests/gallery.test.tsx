import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Gallery from "@/app/p/[id]/components/gallery"; // Ajuste o caminho conforme necessário

// Mock do componente FullScreen para isolar o teste
jest.mock("../app/p/[id]/components/gallery/full-screen", () => {
  return ({
    imageUrl,
    onClose,
    onNext,
    onPrevious,
    currentPosition,
    totalItems,
  }: any) => (
    <div data-testid="full-screen" className="mock-full-screen">
      <p>Full Screen Visible</p>
      <img src={imageUrl} alt="Full Screen" />
      <button onClick={onClose} data-testid="full-screen-close">
        Close
      </button>
      <button onClick={onNext} data-testid="full-screen-next">
        Next
      </button>
      <button onClick={onPrevious} data-testid="full-screen-previous">
        Previous
      </button>
      <span>
        {currentPosition} of {totalItems}
      </span>
    </div>
  );
});

// Mock de dados de imagens para os testes
const mockImages = [
  { full: "full-image-1.jpg", miniature: "mini-image-1.jpg" },
  { full: "full-image-2.jpg", miniature: "mini-image-2.jpg" },
  { full: "full-image-3.jpg", miniature: "mini-image-3.jpg" },
];

const FIRST_INDEX = 0; // Definido localmente para referência nos testes

describe("Gallery Component", () => {
  // Teste 1
  it("should render the component successfully and show the first image", () => {
    render(<Gallery images={mockImages} />);

    // Verifica se a imagem principal é a primeira
    const mainImage = screen.getByRole("img", { name: "" });
    expect(mainImage).toHaveAttribute("src", mockImages[FIRST_INDEX].full);

    // Verifica se a primeira miniatura está ativa (tem a classe de borda específica)
    const firstMiniatureButton = screen
      .getByRole("button", { name: "Miniatura 1" })
      .closest("button");
    expect(firstMiniatureButton).toHaveClass("border-2 border-blue-primary");
  });

  // Teste 2
  it("should change the main image when a miniature is clicked", () => {
    render(<Gallery images={mockImages} />);

    // Clica na miniatura da segunda imagem
    const secondMiniature = screen
      .getByRole("button", { name: "Miniatura 2" })
      .closest("button");
    fireEvent.click(secondMiniature!);

    // Verifica se a imagem principal mudou para a segunda imagem
    const mainImage = screen.getByRole("img", { name: "" });
    expect(mainImage).toHaveAttribute("src", mockImages[1].full);

    // Verifica se a segunda miniatura está ativa e a primeira não está
    expect(secondMiniature).toHaveClass("border-2 border-blue-primary");

    const firstMiniatureButton = screen
      .getByRole("button", { name: "Miniatura 1" })
      .closest("button");
    expect(firstMiniatureButton).not.toHaveClass(
      "border-2 border-blue-primary"
    );
  });

  // Teste 3
  it("should display the FullScreen component when the main image is clicked", () => {
    render(<Gallery images={mockImages} />);

    // Verifica que FullScreen não está visível inicialmente
    expect(screen.queryByTestId("full-screen")).not.toBeInTheDocument();

    // Clica na imagem principal
    const mainImage = screen.getByRole("img", { name: "" });
    fireEvent.click(mainImage);

    // Verifica se FullScreen se tornou visível
    const fullScreen = screen.getByTestId("full-screen");
    expect(fullScreen).toBeInTheDocument();
    expect(fullScreen).toHaveTextContent("Full Screen Visible");
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[FIRST_INDEX].full
    );
  });

  // Teste 4
  it("should close the FullScreen component when the close button is clicked", () => {
    render(<Gallery images={mockImages} />);

    // Abre FullScreen
    fireEvent.click(screen.getByRole("img", { name: "" }));
    expect(screen.getByTestId("full-screen")).toBeInTheDocument();

    // Clica no botão de fechar do FullScreen (mockado)
    const closeButton = screen.getByTestId("full-screen-close");
    fireEvent.click(closeButton);

    // Verifica se FullScreen foi removido
    expect(screen.queryByTestId("full-screen")).not.toBeInTheDocument();
  });

  // Teste 5: Navegação - Next
  it("should navigate to the next image correctly (handleNext)", () => {
    render(<Gallery images={mockImages} />);

    // Abre FullScreen (para usar a função onNext mockada)
    fireEvent.click(screen.getByRole("img", { name: "" }));
    const nextButton = screen.getByTestId("full-screen-next");

    // 1. Vai para a segunda imagem (índice 1)
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[1].full
    );
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
    // Verifica se a imagem principal e a miniatura ativa também atualizaram (efeito colateral)
    expect(screen.getByRole("img", { name: "" })).toHaveAttribute(
      "src",
      mockImages[1].full
    );

    // 2. Vai para a terceira imagem (índice 2)
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[2].full
    );
    expect(screen.getByText("3 of 3")).toBeInTheDocument();

    // 3. Volta para a primeira imagem (índice 0 - loop)
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[FIRST_INDEX].full
    );
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  // Teste 6: Navegação - Previous
  it("should navigate to the previous image correctly (handlePrevious)", () => {
    render(<Gallery images={mockImages} />);

    // Abre FullScreen
    fireEvent.click(screen.getByRole("img", { name: "" }));
    const previousButton = screen.getByTestId("full-screen-previous");

    // 1. Volta para a última imagem (índice 2 - loop de 0 para 2)
    fireEvent.click(previousButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[2].full
    );
    expect(screen.getByText("3 of 3")).toBeInTheDocument();

    // 2. Volta para a segunda imagem (índice 1)
    fireEvent.click(previousButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[1].full
    );
    expect(screen.getByText("2 of 3")).toBeInTheDocument();

    // 3. Volta para a primeira imagem (índice 0)
    fireEvent.click(previousButton);
    expect(screen.getByAltText("Full Screen")).toHaveAttribute(
      "src",
      mockImages[FIRST_INDEX].full
    );
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });
});
