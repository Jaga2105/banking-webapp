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

function App() {
  const user = localStorage.getItem("user");
  const router = createBrowserRouter([
    {
      path: "/",
      // element: user ? <Home /> : <Navigate to={"/login"}/>,
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
          // children: [
          //   {
          //     path: "/loans",
          //     element: <Loans />,
          //   },
          //   {
          //     path: "/car-loan",
          //     element: <CarLoan />,
          //   },
          // ]},
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
          path: "/admin/:id",
          element: <CustomerProfile />,
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

  return <RouterProvider router={router} />;
}

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo,
}) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (!user) {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      // Handle the case where redirectTo is not specified
      console.error("ProtectedRoute: redirectTo prop is not specified");
    }

    // Render nothing or a loading/error component if you prefer
    return null;
  }
  return children;
};

interface RedirectToHomeProps {
  children: ReactNode;
}

const RedirectToHome: React.FC<RedirectToHomeProps> = ({ children }) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (user) {
    navigate("/");
    return null;
  }

  return children;
};

export default App;
