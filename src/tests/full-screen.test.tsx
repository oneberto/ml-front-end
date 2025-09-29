import { render, screen, fireEvent } from "@testing-library/react";
import FullScreen from "@/app/p/[id]/components/gallery/full-screen"; // Ajuste o caminho conforme necessário
import "@testing-library/jest-dom";

// Mock das dependências de ícones para evitar erros de importação
jest.mock("../components/icons/arrow-left", () => ({
  IconArrowLeft: () => <svg data-testid="icon-arrow-left" />,
}));
jest.mock("../components/icons/arrow-right", () => ({
  IconArrowRight: () => <svg data-testid="icon-arrow-right" />,
}));
jest.mock("../components/icons/close", () => ({
  IconClose: () => <svg data-testid="icon-close" />,
}));
jest.mock("../components/icons/zoom-in", () => ({
  IconZoomIn: () => <svg data-testid="icon-zoom-in" />,
}));
jest.mock("../components/icons/zoom-out", () => ({
  IconZoomOut: () => <svg data-testid="icon-zoom-out" />,
}));

// Mock do document.body para o createPortal
// O jsdom do Jest não inicializa document.body completamente.
// Criamos um body mock se ele não existir, o que é crucial para o createPortal.
beforeAll(() => {
  if (!document.body) {
    document.body = document.createElement("body");
  }
});

const mockProps = {
  imageUrl: "/test-image.jpg",
  currentPosition: 2,
  totalItems: 5,
  onClose: jest.fn(),
  onNext: jest.fn(),
  onPrevious: jest.fn(),
};

const SCALE_STEP = 15;

describe("FullScreen", () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
    // Reseta o estilo do body para um estado conhecido antes de cada teste
    document.body.style = "";
  });

  it("should render the component using createPortal into document.body", () => {
    render(<FullScreen {...mockProps} />);

    // Verifica se o elemento principal (portal) foi renderizado no body
    const fullScreenContainer = screen.getByTestId("full-image").closest("div");
    expect(fullScreenContainer).toBeInTheDocument();
    // O container deve estar no body
    expect(document.body).toContainElement(fullScreenContainer as HTMLElement);
  });

  it("should display the correct image URL", () => {
    render(<FullScreen {...mockProps} />);
    const image = screen.getByTestId("full-image");
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
  });

  it("should display the correct position progress", () => {
    render(<FullScreen {...mockProps} />);
    const progress = screen.getByTestId("progress");
    expect(progress).toHaveTextContent(
      `${mockProps.currentPosition}/${mockProps.totalItems}`
    );
  });

  it("should call onClose when the close button is clicked", () => {
    render(<FullScreen {...mockProps} />);
    fireEvent.click(screen.getByTestId("close"));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the overlay is clicked", () => {
    render(<FullScreen {...mockProps} />);
    fireEvent.click(screen.getByTestId("overlay"));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onPrevious when the previous button is clicked", () => {
    render(<FullScreen {...mockProps} />);
    fireEvent.click(screen.getByTestId("prev"));
    expect(mockProps.onPrevious).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when the next button is clicked", () => {
    render(<FullScreen {...mockProps} />);
    fireEvent.click(screen.getByTestId("next"));
    expect(mockProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("should set document.body overflow to hidden on mount", () => {
    render(<FullScreen {...mockProps} />);
    // O useEffect é chamado após a renderização, mas precisamos garantir
    // que ele é executado para a manipulação do DOM. Com React Testing Library
    // em ambientes de teste modernos, o useEffect é geralmente executado
    // após a chamada de render.
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore document.body overflow to auto on unmount", () => {
    // Para testar o cleanup do useEffect, renderizamos e depois desmontamos (unmount)
    const { unmount } = render(<FullScreen {...mockProps} />);

    // Verifica se está 'hidden' antes de desmontar
    expect(document.body.style.overflow).toBe("hidden");

    // Desmonta o componente
    unmount();

    // Verifica se o estilo foi restaurado para 'auto'
    expect(document.body.style.overflow).toBe("auto");
  });

  it("should increase the image scale when zoom-in is clicked", () => {
    render(<FullScreen {...mockProps} />);
    const image = screen.getByTestId("full-image");

    // Escala inicial
    expect(image).toHaveStyle({ scale: "100%" });

    fireEvent.click(screen.getByTestId("zoom-in"));

    // Novo estado da escala (100 + SCALE_STEP = 115)
    expect(image).toHaveStyle({ scale: `${100 + SCALE_STEP}%` });

    // Clica novamente
    fireEvent.click(screen.getByTestId("zoom-in"));

    // Novo estado da escala (115 + SCALE_STEP = 130)
    expect(image).toHaveStyle({ scale: `${100 + 2 * SCALE_STEP}%` });
  });

  it("should decrease the image scale when zoom-out is clicked", () => {
    render(<FullScreen {...mockProps} />);
    const image = screen.getByTestId("full-image");

    // Escala inicial
    expect(image).toHaveStyle({ scale: "100%" });

    fireEvent.click(screen.getByTestId("zoom-out"));

    // Novo estado da escala (100 - SCALE_STEP = 85)
    expect(image).toHaveStyle({ scale: `${100 - SCALE_STEP}%` });

    // Clica novamente
    fireEvent.click(screen.getByTestId("zoom-out"));

    // Novo estado da escala (85 - SCALE_STEP = 70)
    expect(image).toHaveStyle({ scale: `${100 - 2 * SCALE_STEP}%` });
  });
});
