import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/auth/pages/forgot-password/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Signup from "./features/auth/pages/signup/Signup";
import Schedule from "./features/calendar/pages/schedule/Schedule";
import Home from "./features/home/pages/home/Home";
import IngredientsPage from "./features/ingredients/pages/IngredientsPage";
import PaymentConfirmation from "./features/payment/pages/payment-confirmation/PaymentConfirmation";
import PaymentMethod from "./features/payment/pages/payment-method/PaymentMethod";
import MainDashboard from "./features/user/pages/main-dashboard/MainDashboard";
import Profile from "./features/user/pages/profile/Profile";
import Settings from "./features/user/pages/settings/Settings";
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
            path="profile"
            element={<Profile />}
          />
          <Route
            path="schedule"
            element={<Schedule />}
          />
          <Route
            path="payment-method"
            element={<PaymentMethod />}
          />
          <Route
            path="payment-confirmation"
            element={<PaymentConfirmation />}
          />
          <Route
            path="ingredients"
            element={<IngredientsPage />}
          />
          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
