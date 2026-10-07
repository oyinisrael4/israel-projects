import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Counselor from "./pages/Counselor";
import Parents from "./pages/Parents";
import Payments from "./pages/Payments";
import PaymentLink from "./pages/PaymentLink";
import Programme from "./pages/Programme";
import Referrals from "./pages/Referrals";
import ParentDashboard from "./pages/parent-portal/ParentDashboard";
import ParentStudent from "./pages/parent-portal/ParentStudent";
import ParentPayment from "./pages/parent-portal/ParentPayment";

import './index.css';
import './assets/styles/mainStyles.css';
import './assets/styles/paymentLink.css';
import './assets/styles/parentPortal.css';
// Bootstrap Icons CSS is loaded via <link> in index.html to avoid Vite scanning its docs/ folder

import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/students",
    element: <Students />
  },
  {
    path: "/staff",
    element: <Staff />
  },
  {
    path: "/instructor",
    element: <Navigate to="/staff" replace />
  },
  {
    path: "/counselor",
    element: <Counselor />
  },
  {
    path: "/parents",
    element: <Parents />
  },
  {
    path: "/payments",
    element: <Payments />
  },
  {
    path: "/payment-link",
    element: <PaymentLink />
  },
  {
    path: "/programme",
    element: <Programme />
  },
  {
    path: "/referrals",
    element: <Referrals />
  },
  {
    path: "/parent-portal",
    element: <Navigate to="/parent-portal/dashboard" replace />
  },
  {
    path: "/parent-portal/dashboard",
    element: <ParentDashboard />
  },
  {
    path: "/parent-portal/student",
    element: <ParentStudent />
  },
  {
    path: "/parent-portal/payment",
    element: <ParentPayment />
  },
]);
