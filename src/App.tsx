import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/auth/pages/forgot-password/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Signup from "./features/auth/pages/signup/Signup";
import Schedule from "./features/calendar/pages/schedule/Schedule";
import Home from "./features/home/pages/home/Home";
import PaymentConfirmation from "./features/payment/pages/payment-confirmation/PaymentConfirmation";
import PaymentMethod from "./features/payment/pages/payment-method/PaymentMethod";
import Billing from "./features/user/pages/billing/Billing";
import MainDashboard from "./features/user/pages/main-dashboard/MainDashboard";
import Notifications from "./features/user/pages/notifications/Notifications";
import Preferences from "./features/user/pages/preferences/Preferences";
import Profile from "./features/user/pages/profile/Profile";
import Recipes from "./features/user/pages/recipes/Recipes";
import Security from "./features/user/pages/security/Security";
import Targets from "./features/user/pages/targets/Targets";
import AccountLayout from "./shared/layout/AccountLayout";
import Layout from "./shared/layout/Layout";
import UserLayout from "./shared/layout/UserLayout";
import NotFound from "./shared/not-found/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="signup"
            element={<Signup />}
          />
          <Route
            path="forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
        <Route
          path="/user"
          element={<UserLayout />}
        >
          <Route
            path="main-dashboard"
            element={<MainDashboard />}
          />
          <Route
            path="recipes"
            element={<Recipes />}
          />
          <Route
            path="schedule"
            element={<Schedule />}
          />
          <Route
            path="targets"
            element={<Targets />}
          />
          <Route
            path="payment-method"
            element={<PaymentMethod />}
          />

          <Route
            path="account"
            element={<AccountLayout />}
          >
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="security"
              element={<Security />}
            />
            <Route
              path="preferences"
              element={<Preferences />}
            />

            <Route
              path="notifications"
              element={<Notifications />}
            />
            <Route
              path="wallet"
              element={<Billing />}
            />
          </Route>

          <Route
            path="payment-confirmation"
            element={<PaymentConfirmation />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
