import {shippingCost, useCartStore} from "shared";
import {useNavigate} from "react-router-dom";
import useCurrencyFormat from "shared/src/utils/CurrencyFormatter";
import './styles.css';
import Icomons from "shared/src/ui/icons/IcomonsComponent";
import * as React from "react";
import {useEffect, useState} from "react";

const Cart = () => {
  const { cart,removeFromCart, clearCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();
    const [tax, setTax] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        setSubtotal(cart.reduce((t, i) => t + i.price * i.quantity, 0))
        setTax(cart.reduce((t, i) => t + (i.price * i.quantity)*i.tax, 0));
    }, [cart]);

  return (
      <section className={'container-pages cart'}>
          <h1>Carrito</h1> <br/>
          <div className="w-full content-cart">
              <div className="table-cart">
                  <div className="flex justify-between bg-gray-200 font-bold p-4 head">
                      <p className="w-1/5 text-center">Imagen</p>
                      <p className="w-1/5 text-center">Nombre</p>
                      <p className="w-1/5 text-center">Precio</p>
                      <p className="w-1/5 text-center">Subtotal</p>
                      <p className="w-1/5 text-center">Cantidad</p>
                      <p className="w-1/5 text-center">Acción</p>
                  </div>
                  {cart.length > 0 ? cart.map((item) => (
                      <div className="flex justify-between items-center p-4 body" key={item.id}>
                          <span className="text-left"><img src={item.image} alt={item.name}
                                                                   className={'table-img object-contain object-center'}/></span>
                              <span className="text-left">{item.name}</span>
                              <span className="text-left">{useCurrencyFormat(item.price, "es-CO", "COP")}</span>
                              <span className="text-left">{useCurrencyFormat(item.quantity * item.price, "es-CO", "COP")}</span>
                              <span className="text-left quantity">
                                 <button data-testid="decrement-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                      <Icomons icon="minus" size={14} className="mr-2 cursor-pointer" color={'black'}/>
                                 </button>
                                  <span data-testid={`quantity`}>{item.quantity}</span>
                                  <button data-testid="increment-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                      <Icomons icon="plus" size={14} className="mr-2 cursor-pointer" color={'black'}/>
                                  </button>
                          </span>
                              <span className="text-left delete">
                              <Icomons icon="bin" size={14} className="mr-2 cursor-pointer"
                                       color={'black'}
                                       onClick={() => removeFromCart(item.id)}/>
                         </span>
                      </div>
                  )) : <p className={'cart-null font-bold'}>No hay productos en el carrito</p>}
              </div>
              <div className="information-cart bg-white shadow-lg rounded-lg overflow-hidden p-4 h-full">
                  <div className="header">
                      <h3>Resumen de la orden</h3>
                      <span>{cart.length} items</span>
                  </div> <br/>
                  <div className="content-information">
                      <span className="font-bold">Subtotal: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(subtotal, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Shipping: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(shippingCost, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Tax: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(tax, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Total: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(subtotal + tax + shippingCost, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-buttons">
                      <button className={'payment-cart'} onClick={() => navigate('/checkout')}>Ir a pagar</button>
                      <button className={'clear'} onClick={clearCart}>Limpiar Carrito</button>
                  </div> <br/>
                  <div className="payments">
                      <p>Puedes pagar con</p> <br/>
                      <img src="https://api.javier-cardona.com/files/api/v1/settings/getFile/email/logos/medios-de-pago.webp" alt="Carrito"/>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Cart;