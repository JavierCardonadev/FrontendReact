import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Checkout from "./CheckoutComponent";

vi.mock("shared", () => ({
  useCartStore: vi.fn(() => ({
    cart: [
      { id: 1, name: "Producto 1", price: 1000, quantity: 2, tax: 0.1 },
      { id: 2, name: "Producto 2", price: 2000, quantity: 1, tax: 0.2 },
    ],
    clearCartShop: vi.fn(),
  })),
  useOrderStore: vi.fn(() => ({
    addOrder: vi.fn(),
  })),
  useAuthStore: vi.fn(() => ({
    user: { id: 1, name: "Usuario Demo" },
  })),
  useInvoiceStore: vi.fn(() => ({
    generateInvoice: vi.fn(() => Promise.resolve("Compra realizada con éxito. Factura generada correctamente.")), // Retorna una promesa
  })),

  useProductStore: vi.fn(() => ({
    reduceStock: vi.fn(),
  })),
  shippingCost: 500,
  showToast: vi.fn(),
  countriesInAmerica: vi.fn(async () => [
    { name: { common: "colombia" } },
    { name: { common: "argentina" } },
  ]),
  Toast: vi.fn(() => <div>Mock Toast Component</div>),
}));

const renderCheckout = () =>
    render(
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
    );

describe("Checkout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    renderCheckout();

    // Renderizamos el componente principal y obtenemos el `container`
    const { container } = render(
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
    );


    // Usamos `container.querySelector` o `container.textContent` para validar elementos
    expect(container.textContent).toContain("Checkout");
    expect(container.textContent).toContain("Resumen de la orden");
    expect(container.textContent).toContain("Producto 1");
    expect(container.textContent).toContain("Producto 2");
    expect(container.textContent).toContain("2 items");
  });

  it("muestra un error si los campos están vacíos al intentar comprar", async () => {
    const { getByText } = renderCheckout();

    const purchaseButton = screen.getByTestId("payment");
    const message = screen.getByTestId('message-checkout');
    fireEvent.click(purchaseButton);

    // Esperamos a que el mensaje de error se muestre
    await waitFor(() => {
      // @ts-ignore
      expect(message).toHaveTextContent('Por favor, complete todos los campos.');
    });
  });

  it("valida correctamente si el país es inválido", async () => {
    const { getByPlaceholderText } = renderCheckout();

    fireEvent.change(getByPlaceholderText("Nombre"), {
      target: { name: "name", value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("Dirección"), {
      target: { name: "address", value: "123 Calle Principal" },
    });
    fireEvent.change(getByPlaceholderText("País"), {
      target: { name: "country", value: "España" },
    });
    fireEvent.change(getByPlaceholderText("Teléfono"), {
      target: { name: "phone", value: "123456789" },
    });
    fireEvent.change(getByPlaceholderText("Correo electrónico"), {
      target: { name: "email", value: "email@example.com" },
    });

    const purchaseButton = screen.getByTestId("payment");
    const message = screen.getByTestId('message-checkout');
    fireEvent.click(purchaseButton);

    await waitFor(() => {
      // @ts-ignore
      expect(message).toHaveTextContent('El país ingresado no es válido.');
    });
  });
});