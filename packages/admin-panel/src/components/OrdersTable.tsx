import * as React from 'react';
import useCurrencyFormat from 'shared/src/utils/CurrencyFormatter';
import useDateFormat from 'shared/src/utils/useDateFormat';
import { useOrderStore } from 'shared/src/stores/order_management_store';
import { useNavigate } from 'react-router-dom';

const OrdersTableAdmin: React.FC = () => {
  const { userOrdersAdmin } = useOrderStore();
  const navigate = useNavigate();

  return (
    <div className="w-full content-cart">
      <div className="table-cart">
        <div className="flex justify-between bg-gray-200 font-bold p-4 head">
          <p className="w-1/5 text-center">ID</p>
          <p className="w-1/5 text-center">Usuario</p>
          <p className="w-1/5 text-center">Products</p>
          <p className="w-1/5 text-center">Subtotal</p>
          <p className="w-1/5 text-center">Tax</p>
          <p className="w-1/5 text-center">Total</p>
          <p className="w-1/5 text-center">Fecha</p>
          <p className="w-1/5 text-center">Estado</p>
          <p className="w-1/5 text-center">Accion</p>
        </div>

        {userOrdersAdmin().map((item) => (
            <div className="flex justify-between items-center p-4 body" key={item.id}>
            <span className="text-left">
              #{item.id}
            </span>
              <span className="text-left">
              {item.user.name}
            </span>
              <span className="text-left">
              {useCurrencyFormat(item.total, 'es-CO', 'COP')}
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
              <span className="text-left get-detail" onClick={()=> navigate(`/admin/order/${item.id}`)}>Detalle</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTableAdmin;