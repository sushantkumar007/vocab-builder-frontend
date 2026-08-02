import { axiosInstance } from "./axios.js";

export const createCategory = async ({ name, description }) => {
  try {
    const res = await axiosInstance.post("/categories/create-category", {
      name,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to create category",
      { cause: error },
    );
  }
};

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories/get-categories");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to get categories", {
      cause: error,
    });
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.delete(
      `/categories/delete-category/${categoryId}`,
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to delete category",
      { cause: error },
    );
  }
};

export const addWordToCategory = async ({ categoryId, wordId }) => {
  try {
    const res = await axiosInstance.post(`/categories/add-word/${categoryId}`, {
      wordId,
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to add word to category",
      { cause: error },
    );
  }
};

export const getWordsFromCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.get(`/categories/get-words/${categoryId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to get words from category",
      { cause: error },
    );
  }
};

export const deleteWordFromCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.delete(
      `/categories/remove-word/${categoryId}`,
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to remove word from category",
      { cause: error },
    );
  }
};
