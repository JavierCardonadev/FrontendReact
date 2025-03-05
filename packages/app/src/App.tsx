import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/login_form';
import Dashboard from 'dashboard/src/ClientDashboardComponent';
import OrdersTable from 'dashboard/src/components/OrdersTable';
import OrderDetail from 'dashboard/src/components/OrderDetail';
import OrderDetailAdmin from 'admin_panel/src/components/OrderDetail';
import InvoiceDetail from 'dashboard/src/components/InvoiceDetail';
import InvoiceDetailAdmin from 'admin_panel/src/components/InvoiceDetail';
import InvoicesTable from 'dashboard/src/components/InvoicesTable';
import AdminPanel from 'admin_panel/src/AdminPanelComponent';
import OrdersTableAdmin from 'admin_panel/src/components/OrdersTable';
import InvoicesTableAdmin from 'admin_panel/src/components/InvoicesTable';
import ProtectedRoute from './components/protected_route';
import Checkout from "checkout/src/CheckoutComponent";
import Cart from 'cart/src/CartComponent';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import './App.css';
import { useAuthStore } from 'shared';
import Home from "./pages/Home/HomeComponent";

const App: React.FC = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent />
                <main className="general-container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute role="client">
                                <Dashboard />
                            </ProtectedRoute>
                        }>
                            <Route index element={
                                <ProtectedRoute role="client">
                                    <OrdersTable userId={user?.id ?? 0} />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard/invoice" element={
                                <ProtectedRoute role="client">
                                    <InvoicesTable userId={user?.id ?? 0} />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard/order/:id" element={
                                <ProtectedRoute role="client">
                                    <OrderDetail userId={user?.id ?? 0} />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard/invoice/:id" element={
                                <ProtectedRoute role="client">
                                    <InvoiceDetail userId={user?.id ?? 0} />
                                </ProtectedRoute>
                            } />
                        </Route>
                        <Route path="/admin" element={
                            <ProtectedRoute role="admin">
                                <AdminPanel />
                            </ProtectedRoute>
                        }>
                            <Route index element={
                                <ProtectedRoute role="admin">
                                    <OrdersTableAdmin />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/invoice" element={
                                <ProtectedRoute role="admin">
                                    <InvoicesTableAdmin />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/order/:id" element={
                                <ProtectedRoute role="admin">
                                    <OrderDetailAdmin />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/invoice/:id" element={
                                <ProtectedRoute role="admin">
                                    <InvoiceDetailAdmin />
                                </ProtectedRoute>
                            } />
                        </Route>
                        <Route path="/cart" element={
                            <Cart />
                        } />
                        <Route path="/checkout" element={
                            <Checkout />
                        } />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;