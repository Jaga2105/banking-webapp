import React, { ReactNode } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerProfile from "./pages/admin/CustomerProfile";
import Transactions from "./pages/transaction/Transactions";
import Payees from "./pages/Payees";
import BillPayments from "./pages/BillPayment/BillPayments";
import MobileRecharge from "./pages/BillPayment/MobileRecharge";
import ElectricityBill from "./pages/BillPayment/ElectricityBill";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Loans from "./pages/Loans";
import CarLoan from "./pages/loans/CarLoan";
import HomeLoan from "./pages/loans/HomeLoan";
import AdminRoot from "./pages/admin/AdminRoot";
import LoanApplications from "./pages/admin/LoanApplications";
import ViewApplication from "./pages/ViewApplication";
import Notification from "./pages/loans/Notification";
import UploadRequestedDocs from "./pages/loans/UploadRequestedDocs";
import Cards from "./pages/cards/AdminCardList";
import Dummy from "./pages/Dummy";
import AdminCardList from "./pages/cards/AdminCardList";
import CustomerCardList from "./pages/cards/CustomerCardList";
import CardList from "./components/constants/CardList";
import CardApplications from "./components/card/CardApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },

      {
        path: "/payees",
        element: <Payees />,
      },
      {
        path: "/billPayments",
        element: <BillPayments />,
      },
      {
        path: "/mobileRecharge",
        element: <MobileRecharge />,
      },
      {
        path: "/electricityBill",
        element: <ElectricityBill />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/loans",
        element: <Loans />,
      },
      {
        path: "/car-loan",
        element: <CarLoan />,
      },
      {
        path: "/home-loan",
        element: <HomeLoan />,
      },
      {
        path: "view-application/:id",
        element: <ViewApplication />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "upload-requested-docs/:id",
        element: <UploadRequestedDocs />,
      },
      {
        path: "/cards",
        element: <CustomerCardList />,
      },
      {
        path: "/admin",
        element: <AdminRoot />,
        children: [
          {
            // path: "",
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: ":id",
            element: <CustomerProfile />,
          },
          {
            path: "loan-applications",
            element: <LoanApplications />,
          },
          {
            path: "cards",
            element: <AdminCardList />,
            children: [
              { index: true, element: <CardList /> },
              { path: "card-applications", element: <CardApplications /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    // element: user ? <Navigate to={"/forgot-password"} /> : <Login />,
    element: <Login />,
  },
  {
    path: "/register",
    // element: user ? <Navigate to={"/"} /> : <Register />,
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
