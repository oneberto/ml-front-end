import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import "@testing-library/jest-dom";

// --- MOCKING NEXT.JS E ÍCONES ---

// 1. Mock do 'next/link'
// O RTL precisa que os componentes Link se comportem como âncoras (<a>) em testes
// para que possamos encontrá-los usando getByRole('link').
jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => {
    // Retorna uma âncora simples para simulação
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

// 2. Mock dos Ícones
// Mockamos os ícones para que retornem um <span> com um data-testid específico,
// garantindo que eles foram renderizados sem a necessidade de importar seus
// arquivos reais.
jest.mock("../components/icons/search", () => ({
  IconSearch: (props: any) => <span data-testid="icon-search" {...props} />,
}));

jest.mock("../components/icons/cart", () => ({
  IconCart: (props: any) => <span data-testid="icon-cart" {...props} />,
}));

// --- INÍCIO DOS TESTES ---

describe("Header Component", () => {
  test("should render the main header structure", () => {
    // 1. Renderiza o componente
    render(<Header />);

    // 2. Verifica se o elemento principal com data-testid está no documento
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();

    // 3. Verifica a classe de estilo para confirmar a cor de fundo (simulação visual)
    expect(headerElement).toHaveClass("bg-mercado-livre");
  });

  test("should display both responsive Mercado Livre logos", () => {
    render(<Header />);

    // Verifica as imagens pelo texto alternativo (alt)
    const logos = screen.getAllByAltText("Mercado Livre");
    expect(logos).toHaveLength(2);

    // Identifica cada logo pelo seu atributo src (usando find no array, já que o selector não é suportado no getByRole)
    const smallLogo = logos.find(
      (img) => img.getAttribute("src") === "/images/logo-small.png"
    );
    const largeLogo = logos.find(
      (img) => img.getAttribute("src") === "/images/logo.webp"
    );

    // Verifica se cada logo foi encontrado (não é undefined)
    expect(smallLogo).toBeInTheDocument();
    expect(largeLogo).toBeInTheDocument();

    // Verificação simplificada da responsividade (presença das classes)
    // O smallLogo e o largeLogo são elementos HTML, então podemos verificar as classes
    expect(smallLogo).toHaveClass("block", "xl:hidden"); // Visível em mobile
    expect(largeLogo).toHaveClass("hidden", "xl:block"); // Visível em desktop
  });

  test("should contain the search form elements", () => {
    render(<Header />);

    // 1. Verifica o campo de input (textbox)
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("name", "search");

    // 2. Verifica o botão de submit do formulário
    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveAttribute("type", "submit");

    // 3. Verifica se o ícone de busca está dentro do botão
    const searchIcon = screen.getByTestId("icon-search");
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon.closest("button")).toBe(searchButton);
  });

  test("should display all navigation links with correct hrefs", () => {
    render(<Header />);

    // Verifica a presença dos links de navegação de texto (desktop)
    const createAccountLink = screen.getByRole("link", {
      name: /Crie a sua conta/i,
    });
    const loginLink = screen.getByRole("link", { name: /Entre/i });
    const purchasesLink = screen.getByRole("link", { name: /Compras/i });

    expect(createAccountLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(purchasesLink).toBeInTheDocument();

    // Todos os links de navegação de texto devem apontar para a raiz
    expect(createAccountLink).toHaveAttribute("href", "/");
    expect(loginLink).toHaveAttribute("href", "/");
    expect(purchasesLink).toHaveAttribute("href", "/");

    // Verifica o link do carrinho (que contém apenas o ícone)
    const cartIcon = screen.getByTestId("icon-cart");
    expect(cartIcon).toBeInTheDocument();

    // Garante que o ícone do carrinho está dentro de um elemento <a> (Link) que aponta para a raiz
    const cartLink = cartIcon.closest("a");
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/");
  });
});
