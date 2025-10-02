import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import Layout from './components/layout/Layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Register = lazy(() => import('./pages/Auth/Register/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword/ForgotPassword'));
const Marketplace = lazy(() => import('./pages/Marketplace/Marketplace'));
const TokenDetails = lazy(() => import('./pages/TokenDetails/TokenDetails'));
const SecondaryMarket = lazy(() => import('./pages/SecondaryMarket/SecondaryMarket'));

// Farmer pages
const FarmerDashboard = lazy(() => import('./pages/Dashboard/FarmerDashboard/FarmerDashboard'));
const FarmerProfile = lazy(() => import('./components/farmer/FarmerProfile/FarmerProfile'));
const TokenMinting = lazy(() => import('./components/farmer/TokenMinting/TokenMinting'));
const OrderManagement = lazy(() => import('./components/farmer/OrderManagement/OrderManagement'));

// Buyer pages
const BuyerDashboard = lazy(() => import('./pages/Dashboard/BuyerDashboard/BuyerDashboard'));
const BuyerProfile = lazy(() => import('./components/buyer/BuyerProfile/BuyerProfile'));
const Portfolio = lazy(() => import('./components/buyer/Portfolio/Portfolio'));
const OrderTracking = lazy(() => import('./components/buyer/OrderTracking/OrderTracking'));
const AnalyticsDashboard = lazy(() => import('./components/buyer/Analytics/AnalyticsDashboard'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/Dashboard/AdminDashboard/AdminDashboard'));

// Other pages
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService/TermsOfService'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Helper component to redirect to appropriate dashboard
const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect based on user role
  switch (user?.role) {
    case 'farmer':
      return <Navigate to="/dashboard/farmer" replace />;
    case 'buyer':
      return <Navigate to="/dashboard/buyer" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="token/:tokenId" element={<TokenDetails />} />
                <Route path="secondary-market" element={<SecondaryMarket />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Protected Farmer Routes */}
              <Route
                path="/dashboard/farmer"
                element={
                  <ProtectedRoute allowedRoles={['farmer']}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<FarmerDashboard />} />
                <Route path="profile" element={<FarmerProfile />} />
                <Route path="mint" element={<TokenMinting />} />
                <Route path="orders" element={<OrderManagement />} />
              </Route>

              {/* Protected Buyer Routes */}
              <Route
                path="/dashboard/buyer"
                element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BuyerDashboard />} />
                <Route path="profile" element={<BuyerProfile />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="orders" element={<OrderTracking />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Redirect /dashboard to appropriate dashboard based on role */}
              <Route path="/dashboard" element={<DashboardRedirect />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;