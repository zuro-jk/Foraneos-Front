import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/login/Login";
import Signup from "./features/auth/pages/signup/Signup";
import Schedule from "./features/calendar/pages/schedule/Schedule";
import ChatTest from "./features/chat/ChatTest";
import Home from "./features/home/Home";
import PaymentConfirmation from "./features/payment/pages/payment-confirmation/PaymentConfirmation";
import PaymentMethod from "./features/payment/pages/payment-method/PaymentMethod";
import Layout from "./shared/layout/Layout";

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
            path="schedule"
            element={<Schedule />}
          />
          <Route
            path="chat"
            element={<ChatTest />}
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
            path="*"
            element={<div>404 Not Found</div>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
