import {useAuthStore} from "shared";
import Icomons from "shared/src/ui/icons/IcomonsComponent";
import * as React from "react";
import { NavLink, Outlet, useLocation} from "react-router-dom";
import './styles.css';

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();


    return (
           <section className={'container-pages orders'}>
               <h1>Dashboard</h1> <br/>
               <div className="content-dashboard">
                   <aside className="sidebar bg-white shadow-lg rounded-lg">
                       <div className="sidebar-header">
                           <h2>{user?.name}</h2>
                       </div>
                       <nav className="menu">
                           <ul>
                               <li>
                                   <NavLink
                                       to="/dashboard"
                                       className={({ isActive }) => (isActive && location.pathname === '/dashboard' ? 'active' : '')}
                                   >
                                       <Icomons icon="user" size={24} className="mr-2" color={'black'} />
                                       <span>Ordenes</span>
                                   </NavLink>
                               </li>
                               <li>
                                   <NavLink
                                       to="/dashboard/invoice"
                                       className={({ isActive }) => (isActive && location.pathname === '/dashboard/invoice' ? 'active' : '')}
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
               </div>
           </section>
       );
};

export default Dashboard;