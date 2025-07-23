import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobItemDetails from "./components/JobItemDetails";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} /> {/* Signup route */}
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={<Navigate to="/signup" replace />} // ✅ Redirect to /signup on initial load
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-details/:id"
        element={
          <ProtectedRoute>
            <JobItemDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default App;
