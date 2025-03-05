import useCurrencyFormat from "shared/src/utils/CurrencyFormatter";
import '../styles.css';
import { useParams } from 'react-router-dom';
import * as React from "react";
import {useEffect, useState} from "react";
import {InvoiceItem, useInvoiceStore} from "shared";

type OrdersTableProps = {
    userId: number;
};

const InvoiceDetail: React.FC<OrdersTableProps> = ({ userId }) => {
    const { getUserInvoiceDetail } = useInvoiceStore();
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<InvoiceItem | undefined>();

    useEffect(() => {
        setOrder(getUserInvoiceDetail(userId, id ?? ""));
    }, [id]);

  return (
      <section className={'container-pages order-detail'}>
          <h1>Factura # {id}</h1> <br/>
          <div className="w-full content-cart">
              <div className="table-cart">
                  <div className="flex justify-between bg-gray-200 font-bold p-4 head">
                      <p className="w-1/5 text-center">Imagen</p>
                      <p className="w-1/5 text-center">Nombre</p>
                      <p className="w-1/5 text-center">Precio</p>
                      <p className="w-1/5 text-center">Subtotal</p>
                      <p className="w-1/5 text-center">Cantidad</p>
                  </div>
                  {order?.products.map((item) => (
                      <div className="flex justify-between items-center p-4 body" key={item.id}>
                          <span className="text-left"><img src={item.image} alt={item.name}
                                                                   className={'table-img object-contain object-center'}/></span>
                          <span className="text-left">{item.name}</span>
                          <span className="text-left">{useCurrencyFormat(item.price, "es-CO", "COP")}</span>
                          <span className="text-left">{useCurrencyFormat(item.quantity * item.price, "es-CO", "COP")}</span>
                          <span className="text-left">{item.quantity}</span>
                      </div>
                  ))}
              </div>
              <div className="information-cart bg-white shadow-lg rounded-lg overflow-hidden p-4 h-full">
                  <div className="header">
                      <h3>Resumen de la orden</h3>
                      <span>{order?.products.length} items</span>
                  </div> <br/>
                  <div className="content-information">
                      <span className="font-bold">Estado: </span>
                      <span className={'font-normal'}>{order?.status}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Subtotal: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(order?.subtotal ?? 0, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Shipping: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(order?.shipping ?? 0, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Tax: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(order?.tax ?? 0, "es-CO", "COP")}</span>
                  </div>
                  <div className="content-information">
                      <span className="font-bold">Total: </span>
                      <span className={'font-normal'}>{useCurrencyFormat(order?.total ?? 0, "es-CO", "COP")}</span>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default InvoiceDetail;