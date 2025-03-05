import * as React from 'react';
import useCurrencyFormat from 'shared/src/utils/CurrencyFormatter';
import useDateFormat  from 'shared/src/utils/useDateFormat';
import {useInvoiceStore} from "shared";
import { useNavigate } from 'react-router-dom';
type OrdersTableProps = {
  userId: number;
};

const InvoicesTable: React.FC<OrdersTableProps> = ({ userId }) => {
  const { getUserInvoices } = useInvoiceStore();
  const navigate = useNavigate();

  return (
    <div className="w-full content-cart">
      <div className="table-cart">
        <div className="flex justify-between bg-gray-200 font-bold p-4 head">
          <p className="w-1/5 text-center">ID</p>
          <p className="w-1/5 text-center">Subtotal</p>
          <p className="w-1/5 text-center">Tax</p>
          <p className="w-1/5 text-center">Total</p>
          <p className="w-1/5 text-center">Fecha</p>
          <p className="w-1/5 text-center">Estado</p>
          <p className="w-1/5 text-center">Accion</p>
        </div>

        {getUserInvoices(userId).map((item) => (
            <div className="flex justify-between items-center p-4 body" key={item.id}>
              <span className="text-left">
                #{item.id}
              </span>
              <span className="text-left">
                {useCurrencyFormat(item.subtotal, 'es-CO', 'COP')}
              </span>
              <span className="text-left">
                {useCurrencyFormat(item.tax, 'es-CO', 'COP')}
              </span>
              <span className="text-left">
                {useCurrencyFormat(item.total, 'es-CO', 'COP')}
              </span>
              <span className="text-left">{useDateFormat(item.date)}</span>
              <span className="text-left">{item.status}</span>
              <span className="text-left get-detail" onClick={()=> navigate(`/dashboard/invoice/${item.id}`)}>Detalle</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicesTable;