import React from "react";
import { Link } from "react-router-dom";
import {useAuthStore, useCartStore} from "shared";
import Icomons from "shared/src/ui/icons/IcomonsComponent";

const HeaderComponent: React.FC = () => {
    const {user, logout} = useAuthStore();
    const {cart} = useCartStore();

    return (
        <header className="bg-[#177E5D] text-white py-4 shadow-sm">
            <div className="container mx-auto flex justify-between items-center px-4">
               <Link to={'/'}> <img src="https://api.javier-cardona.com/files/api/v1/settings/getFile/email/logos/jc2.svg" alt="Javier Cardona" className={'logo'} style={{width: '100px'}}/></Link>
                <nav className="space-x-4">
                    {user?.role != "admin" &&
                        <Link to="/cart" className="hover:underline"><Icomons icon="cart" size={24} className="mr-2" color={'white'} /> ({cart.length ?? 0})</Link>
                    }
                    {user &&
                        <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}><Icomons icon="user" size={24} className="mr-2" color={'white'} /> <span>{user?.name}</span></Link>
                    }
                    {!user ? <Link to="/login" className="hover:underline"><Icomons icon="user" size={24} className="mr-2" color={'white'} /> <span>Iniciar sesión</span></Link> : <div onClick={() => logout()}> <Icomons icon="exit" size={24} className="mr-2" color={'white'} /> <span>Cerrar sesión</span></div>}
                </nav>
            </div>
        </header>
    );
};

export default HeaderComponent;