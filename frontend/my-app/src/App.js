import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./store"; // Import persistor
import MainLayout from "./components/layouts/MainLayouts";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Exams from "./components/exams";
import Timeline from "./components/timeline";
import StudyMaterial from "./components/studyMaterial";
import About from "./components/about";
import ToppersHall from "./components/toppershall";

import { loadUser } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />

          {/* Protected Routes */}
          <Route
            path="/timeline"
            element={user ? <Timeline /> : <Navigate to="/login" />}
          />
          <Route
            path="/:exam"
            element={user ? <MainLayout><Exams /></MainLayout> : <Navigate to="/login" />}
          />
           <Route
            path="/study-material"
            element={user ? <MainLayout><StudyMaterial /></MainLayout> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/hall-of-achiver" element={<MainLayout><ToppersHall /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
