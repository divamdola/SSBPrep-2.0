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
  
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  
  const initialState = {
    user: storedUser,
    loading: false,
    isAuthenticated: !!storedUser, // ✅ Ensure it's defined properly
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGOUT_SUCCESS:
        localStorage.removeItem("user"); // Clear user data
        return {
          ...initialState,
        };
  
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOAD_USER_FAIL:
        return {
          ...initialState, // ✅ Reset state when loading user fails
          error: action.payload,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  