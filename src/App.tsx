import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/auth/pages/forgot-password/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Signup from "./features/auth/pages/signup/Signup";
import CompleteProfile from "./features/auth/pages/signup/pages/complete-profile/CompleteProfile";
import Home from "./features/home/pages/home/Home";
import Billing from "./features/user/pages/billing/Billing";
import EconomicRecipes from "./features/user/pages/economic-recipes/EconomicRecipes";
import RecipeDetail from "./features/user/pages/economic-recipes/components/recipe-detail/RecipeDetail";
import FavoriteRecipes from "./features/user/pages/favorite-recipes/FavoriteRecipes";
import FoodBudget from "./features/user/pages/food-budget/FoodBudget";
import Notifications from "./features/user/pages/notifications/Notifications";
import NutritionistArtificial from "./features/user/pages/nutritionist-artificial/NutritionistArtificial";
import Overview from "./features/user/pages/ovewview/Overview";
import Preferences from "./features/user/pages/preferences/Preferences";
import Profile from "./features/user/pages/profile/Profile";
import Security from "./features/user/pages/security/Security";
import ShoppingList from "./features/user/pages/shopping-list/ShoppingList";
import WeeklyPlanner from "./features/user/pages/weekly-planner/WeeklyPlanner";
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
                to="overview"
                replace
              />
            }
          />
          <Route
            path="overview"
            element={<Overview />}
          />
          <Route
            path="favorite-recipes"
            element={<FavoriteRecipes />}
          />
          <Route
            path="economic-recipes"
            element={<EconomicRecipes />}
          />
          <Route
            path="economic-recipes/:id"
            element={<RecipeDetail />}
          />
          <Route
            path="nutritionist-ia"
            element={<NutritionistArtificial />}
          />
          <Route
            path="shopping-list"
            element={<ShoppingList />}
          />
          <Route
            path="weekly-planner"
            element={<WeeklyPlanner />}
          />
          <Route
            path="food-budget"
            element={<FoodBudget />}
          />
          {/* <Route
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
            path="foods"
            element={<Foods />}
          />
          <Route
            path="foods/add"
            element={<FoodForm />}
          />
          <Route
            path="foods/edit/:foodId"
            element={<FoodForm />}
          />

          <Route
            path="food-history"
            element={<FoodHistory />}
          />
          <Route
            path="food-history/weekly"
            element={<WeeklyMeals />}
          />
          <Route
            path="food-history/add"
            element={<AddEditMeal />}
          />
          <Route
            path="food-history/edit/:mealId"
            element={<AddEditMeal />}
          /> */}

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
