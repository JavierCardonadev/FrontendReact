import {useAuthStore} from "shared";
import Icomons from "shared/src/ui/icons/IcomonsComponent";
import * as React from "react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import './styles.css';

const AdminPanel = () => {
     const user = useAuthStore((state) => state.user);
    const location = useLocation();
     return (
         <div className={'container-pages orders-admin'}>
             <h1>Dashboard</h1> <br/>
             <section className="content-dashboard">
                 <aside className="sidebar bg-white shadow-lg rounded-lg">
                     <div className="sidebar-header">
                         <h2>{user?.name}</h2>
                     </div>
                     <nav className="menu">
                         <ul>
                             <li>
                                 <NavLink
                                     to="/admin"
                                     className={({ isActive }) => (isActive && location.pathname === '/admin' ? 'active' : '')}
                                 >
                                     <Icomons icon="user" size={24} className="mr-2" color={'black'} />
                                     <span>Ordenes</span>
                                 </NavLink>
                             </li>
                             <li>
                                 <NavLink
                                     to="/admin/invoice"
                                     className={({ isActive }) => (isActive && location.pathname === '/admin/invoice' ? 'active' : '')}
                                 >
                                     <Icomons icon="user" size={24} className="mr-2" color={'black'} />
                                     <span>Facturas</span>
                                 </NavLink>
                             </li>
                         </ul>
                     </nav>
                 </aside>
                 <div className="table">
                     <Outlet />
                 </div>
             </section>
         </div>
     );
   };

   export default AdminPanel;