import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Cart from './CartComponent';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';

let cartMockState = [];
let updateQuantityMock = vi.fn();
let removeFromCartMock = vi.fn();
let clearCartMock = vi.fn();

vi.mock('shared', () => {
  const React = require('react');

  return {
    useCartStore: () => {
      const [cart, setCart] = React.useState(cartMockState);

      return {
        cart,
        updateQuantity: (id, newQuantity) => {
          setCart(prevCart =>
              prevCart.map(item =>
                  item.id === id ? { ...item, quantity: newQuantity } : item
              )
          );
        },
        removeFromCart: (id) => {
          setCart(prevCart => prevCart.filter(item => item.id !== id));
        },
        clearCart: () => {
          setCart([]);
        },
      };
    },
    shippingCost: vi.fn(),
  };
});

describe('CartComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    cartMockState = [];
    updateQuantityMock = vi.fn();
    removeFromCartMock = vi.fn();
    clearCartMock = vi.fn();
  });

  it('muestra el carrito vacío inicialmente', () => {
    render(
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
    );

    // @ts-ignore
    expect(screen.getByText('No hay productos en el carrito')).toBeInTheDocument();
  });

  it('actualiza la cantidad de un producto', async () => {
    cartMockState = [
      { id: 1, name: 'Producto 1', price: 1000, quantity: 1, tax: 0.1, image: 'img1.jpg' },
    ];

    render(
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
    );

    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const quantityText = screen.getByTestId('quantity');

    // Actúa y espera que aumente la cantidad
    await act(async () => {
      await userEvent.click(incrementButton);
    });

    await waitFor(() => {
      // @ts-ignore
      expect(quantityText).toHaveTextContent('2');
    });

    await act(async () => {
      await userEvent.click(decrementButton);
    });

    await waitFor(() => {
      // @ts-ignore
      expect(quantityText).toHaveTextContent('1');
    });
  });
});