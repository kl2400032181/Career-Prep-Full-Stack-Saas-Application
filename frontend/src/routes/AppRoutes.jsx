import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Interview from "../pages/Interview";
import ResumeAnalysis from "../pages/ResumeAnalysis";
import History from "../pages/History";
import Connections from "../pages/Connections";
import NotFound from "../pages/NotFound";

import MainLayout from "../Components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/interview"
              element={<Interview />}
            />

            <Route
              path="/resume-analysis"
              element={<ResumeAnalysis />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/connections"
              element={<Connections />}
            />

          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;