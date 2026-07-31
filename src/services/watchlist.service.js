import { axiosInstance } from "./axios.js";

export const addToWatchlist = async (wordId) => {
  try {
    const res = await axiosInstance.post(`/watchlists/add-word/${wordId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Adding to watchlist failed",
      { cause: error },
    );
  }
};

export const getWatchlist = async () => {
  try {
    const res = await axiosInstance.get("/watchlists/get-watchlist");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Fetching watchlist failed",
      { cause: error },
    );
  }
};

export const removeFromWatchlist = async (wordId) => {
  try {
    const res = await axiosInstance.delete(`/watchlists/remove-word/${wordId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Removing from watchlist failed",
      { cause: error },
    );
  }
};
