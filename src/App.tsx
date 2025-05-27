import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/auth/pages/forgot-password/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Signup from "./features/auth/pages/signup/Signup";
import Home from "./features/home/pages/home/Home";
import PaymentConfirmation from "./features/payment/pages/payment-confirmation/PaymentConfirmation";
import PaymentMethod from "./features/payment/pages/payment-method/PaymentMethod";
import Billing from "./features/user/pages/billing/Billing";
import Schedule from "./features/user/pages/calendar/pages/schedule/Schedule";
import Calisthenics from "./features/user/pages/calisthenics/Calisthenics";
import MainDashboard from "./features/user/pages/main-dashboard/MainDashboard";
import Notifications from "./features/user/pages/notifications/Notifications";
import NutritionistArtificial from "./features/user/pages/nutritionist-artificial/NutritionistArtificial";
import Preferences from "./features/user/pages/preferences/Preferences";
import Profile from "./features/user/pages/profile/Profile";
import DetailRecipe from "./features/user/pages/recipes/pages/detail-recipe/DetailRecipe";
import RecipeForm from "./features/user/pages/recipes/pages/recipe-form/RecipeForm";
import Recipes from "./features/user/pages/recipes/pages/recipes/Recipes";
import Security from "./features/user/pages/security/Security";
import Social from "./features/user/pages/social/Social";
import Targets from "./features/user/pages/targets/Targets";
import AccountLayout from "./shared/layout/AccountLayout";
import Layout from "./shared/layout/Layout";
import UserLayout from "./shared/layout/UserLayout";
import NotFound from "./shared/not-found/NotFound";
import CompleteProfile from "./features/user/pages/complete-profile/CompleteProfile";

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
            path="complete-profile"
            element={<CompleteProfile />}
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
            index
            element={
              <Navigate
                to="main-dashboard"
                replace
              />
            }
          />
          <Route
            path="main-dashboard"
            element={<MainDashboard />}
          />
          <Route
            path="recipes"
            element={<Recipes />}
          />
          <Route
            path="recipes/new"
            element={<RecipeForm />}
          />
          <Route
            path="recipes/:recipeId"
            element={<DetailRecipe />}
          />
          <Route
            path="nutritionist"
            element={<NutritionistArtificial />}
          />
          <Route
            path="schedule"
            element={<Schedule />}
          />
          <Route
            path="calisthenics"
            element={<Calisthenics />}
          />
          <Route
            path="social"
            element={<Social />}
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
            path="payment-confirmation"
            element={<PaymentConfirmation />}
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
