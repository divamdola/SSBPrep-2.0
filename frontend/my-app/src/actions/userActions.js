import axiosInstance from "../utils/axiosInstance";
import { persistor } from "../store";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstants";

// Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axiosInstance.post("/register", userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.error("Registration error:", error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || "Registration failed. Please try again.",
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.post("/login", { email, password }, config);

    localStorage.setItem("token", data.token); // Save token to localStorage

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || "Invalid credentials" });
  }
};


// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.post("/logout");

    dispatch({ type: LOGOUT_SUCCESS });

    await persistor.flush(); // ✅ Ensures persisted state is cleared immediately
    persistor.purge(); // ✅ Clears Redux persisted state

    localStorage.removeItem("token"); // ✅ Remove token
    localStorage.removeItem("user"); // ✅ Remove user data if stored

    window.location.reload(); // ✅ Force UI update to reflect logout
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");
    console.log("🔹 Token Retrieved:", token); // Debugging

    if (!token) throw new Error("No token found");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axiosInstance.get("/me", config);

    console.log("✅ User Loaded:", data.user); // Debugging
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.error("❌ Load User Failed:", error.response?.data);
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};


// Clear Errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
