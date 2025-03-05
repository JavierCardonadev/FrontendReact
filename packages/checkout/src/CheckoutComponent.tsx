import * as React from "react";
import { useEffect, useState } from "react";
import {
    useCartStore,
    useInvoiceStore,
    useProductStore,
    UserItem,
    countriesInAmerica,
    useAuthStore,
    shippingCost,
    Toast,
    showToast
} from "shared";
import {useNavigate} from "react-router-dom";
import {Order, useOrderStore} from "shared/src/stores/order_management_store";
import './styles.css';
import useCurrencyFormat from "shared/src/utils/CurrencyFormatter";

const Checkout = () => {
    const { cart, clearCartShop} = useCartStore();
    const {addOrder} = useOrderStore();
    const user = useAuthStore((state) => state.user);
    const {reduceStock} = useProductStore();
    const generateInvoice = useInvoiceStore((state) => state.generateInvoice);
    const [userData, setUserData] = useState<UserItem>({} as UserItem);
    const [error, setError] = useState<string | null>(null);
    const [tax, setTax] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(cart.length == 0) navigate("/");
        setSubtotal(cart.reduce((t, i) => t + i.price * i.quantity, 0))
        setTax(cart.reduce((t, i) => t + (i.price * i.quantity)*i.tax, 0));
    }, [cart]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const validateCountry = async (countryUser: string) => {
        const response = await countriesInAmerica();

        if(response){
            return response.some(
                (country) => country.name.common.toLowerCase() === countryUser.trim().toLowerCase()
            );
        }
    };

    const handlePurchase = async () => {
        if(!user) {
            showToast("Para finalizar la compra inicie sesion.");
            setError("Para finalizar la compra inicie sesion.")
            return;
        }
        if (!userData.name || !userData.address || !userData.country || !userData.phone || !userData.email) {
            showToast("Por favor, complete todos los campos.");
            setError("Por favor, complete todos los campos.")
            return;
        }

        // Validar país
        setError(null);
        const isValidCountry = await validateCountry(userData.country);
        if (!isValidCountry) {
            showToast("El país ingresado no es válido.");
            setError("El país ingresado no es válido.")
            return;
        }

        const subtotal = cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
        const tax = cart.reduce((tax, item) => tax + (item.price * item.quantity) * item.tax, 0);

        try {
            let orderData: Order = {
                id: `ORD-${Math.floor(Math.random() * 10000)}`,
                products: cart,
                subtotal: subtotal,
                total: subtotal + tax + shippingCost,
                shipping: shippingCost,
                tax: tax,
                date: new Date().toLocaleDateString(),
                user: {...userData, id: user?.id ?? 0},
                status: 'Pagado'
            }

            addOrder(orderData);

            await generateInvoice(cart, shippingCost, {...userData, id: user?.id ?? 0});
            showToast("Compra realizada con éxito. Factura generada correctamente.");
            setError("Compra realizada con éxito. Factura generada correctamente.");

            cart.forEach((item) => {
                reduceStock(item.id, item.quantity);
            });

            setTimeout(() => {
                clearCartShop();
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Error generando factura: ", error);
        }
    };

    return (
        <section className={'container-pages checkout'}>
            <h1 className="text-2xl font-bold">Checkout</h1> <br/>
            <div className="container">
                <div className="information bg-white shadow-lg rounded-lg overflow-hidden p-4 h-full">
                    <div className="header">
                        <h3>Resumen de la orden</h3>
                        <span>{cart.length} items</span>
                    </div> <br/>
                    <div className={'content-details'}>
                        {cart.map((item) => (
                            <div className={'detail'} key={item.id}>
                                <img src={item.image} alt={item.name}
                                     className={'table-img object-contain object-center'}/>
                                <div className={'information-additional'}>
                                    <span>{item.name}</span>
                                    <span>{useCurrencyFormat(item.price, "es-CO", "COP")}</span>
                                    <span>cantidad: {item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="content-information">
                        <span className="font-normal">Subtotal: </span>
                        <span className={'font-normal'}>{useCurrencyFormat(subtotal, "es-CO", "COP")}</span>
                    </div>
                    <div className="content-information">
                        <span className="font-normal">Shipping: </span>
                        <span className={'font-normal'}>{useCurrencyFormat(shippingCost, "es-CO", "COP")}</span>
                    </div>
                    <div className="content-information">
                        <span className="font-normal">Tax: </span>
                        <span className={'font-normal'}>{useCurrencyFormat(tax, "es-CO", "COP")}</span>
                    </div>
                    <div className="content-information">
                        <span className="font-bold">Total: </span>
                        <span className={'font-bold'}>{useCurrencyFormat(subtotal + tax + shippingCost, "es-CO", "COP")}</span>
                    </div>
                </div>
                <div className="content-form">
                    <h2 className="font-bold">Contacto</h2> <br/>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="address" className="block font-bold">Correo *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div> <br/>
                        <h2 className="font-bold">Entrega</h2> <br/>
                        <div>
                            <label htmlFor="name" className="block font-bold">Nombre *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={'Nombre'}
                                value={userData.name}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block font-bold">Dirección *</label>
                            <input
                                type="text"
                                name="address"
                                placeholder={'Dirección'}
                                value={userData.address}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block font-bold">Telefono *</label>
                            <input
                                type="number"
                                name="phone"
                                placeholder={'Teléfono'}
                                value={userData.phone}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block font-bold">País *</label>
                            <input
                                type="text"
                                name="country"
                                placeholder={'País'}
                                value={userData.country}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <p className="font-bold" data-testid="message-checkout">{error}</p>
                        <Toast />
                        <button
                            data-testid="payment"
                            onClick={handlePurchase}
                            className="payment"
                        >
                            Finalizar Compra
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Checkout;