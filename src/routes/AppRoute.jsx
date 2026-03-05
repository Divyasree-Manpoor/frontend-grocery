import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ShoppingPage from "../pages/Shopping/ShoppingPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import GroceryPage from "../pages/Grocery/GroceryPage";
import HistoryPage from "../pages/History/HistoryPage";
import MealsPage from "../pages/Meals/MealPlannerPage";
import PantryPage from "../pages/Pantry/PantryPage";
import SharedPage from "../pages/Shared/SharedListPage";
import GroceryItemsPage from "../pages/Grocery/GroceryItemsPage";
import HistoryDetails from "../pages/History/HistoryDetails";

import NutritionPage from "../pages/Nutrition/NutritionPage";
import DietPlannerPage from "../pages/Nutrition/DietPlannerPage";
const AppRoute = () => {
  return (
    <Routes>

      {/* 🌍 PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Route>

      {/* 🔐 AUTH ROUTES */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* 🔒 PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/grocery/:listId" element={<GroceryItemsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetails />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/diet" element={<DietPlannerPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/shared" element={<SharedPage />} />
          <Route path="/shopping/:listId" element={<ShoppingPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoute;