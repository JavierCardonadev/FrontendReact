import {showToast, Toast, useCartStore, useProductStore} from "shared";
import useCurrencyFormat from "shared/src/utils/CurrencyFormatter";
import './styles.css';

const Home = () => {
  const products = useProductStore((state) => state.products);
  const {addToCart} = useCartStore();

  return (
      <>
        <div className={'banner-main'}>
          <img src="https://api.javier-cardona.com/files/api/v1/settings/getFile/email/logos/banner_main.jpg" alt="Banner main"/>
        </div>
        <div className="content-products">
          <div className="catalog">
            {products?.filter((item) => item.stock > 0).map((product) => (
                <div className={'product bg-white shadow-lg rounded-lg overflow-hidden'} key={product.id}>
                  <img src={product.image} alt={product.name} className={'w-full h-56 object-contain object-center'}/>
                  <h2>{product.name}</h2>
                  <p className={'category ext-gray-600 text-sm mb-4'}>{product.category}</p>
                  <p className={'price'}>{useCurrencyFormat(product.price, "es-CO", "COP")}</p>
                  <p className={'qty'}>Cantidad: {product.stock}</p>
                  <button
                      onClick={() => {
                        addToCart(product.id, 1);
                        showToast("Producto agregado al carrito");
                      }}
                      className={'btn-add '}>
                    Agregar al carrito
                  </button>
                </div>
            ))}
            <Toast />
          </div>
        </div>
      </>
  );
};

export default Home;