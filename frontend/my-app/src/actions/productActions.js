import axiosInstance from "../utils/axiosInstance";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axiosInstance.get(`/products?category=${category}`);

    console.log("API Response:", data); // Debugging

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data.booksByCategory[category] || [], // ✅ Use the correct field
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Error fetching products",
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
