import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import GroceryPage from "./pages/GroceryPage";
import GroceryItemsPage from "./pages/GroceryItemsPage";
import PantryPage from "./pages/PantryPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import HistoryPage from "./pages/HistoryPage";
import ShoppingMode from "./pages/ShoppingMode";
import SharedListPage from "./Pages/SharedListPage"
import NutritionPage from "./pages/NutritionPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Grocery List Page */}
      <Route
        path="/grocery"
        element={
          <ProtectedRoute>
            <Layout>
              <GroceryPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Grocery Items Page */}
      <Route
        path="/grocery/:listId"
        element={
          <ProtectedRoute>
            <Layout>
              <GroceryItemsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pantry"
        element={
          <ProtectedRoute>
            <Layout>
              <PantryPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/meals"
        element={
          <ProtectedRoute>
            <Layout>
              <MealPlannerPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <Layout>
              <HistoryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/shopping/:listId"
  element={
    <ProtectedRoute>
      <Layout>
        <ShoppingMode />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route path="/shared/:listId" element={<SharedListPage />} />



    </Routes>
    
  );
}

export default App;