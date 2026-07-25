import { axiosInstance } from "./axios.js";

export const addWord = async ({
  word,
  audio,
  partOfSpeech,
  definition,
  examples,
  synonyms,
  antonyms,
  translations,
}) => {
  try {
    const res = await axiosInstance.post("words/add-word", {
      word,
      audio,
      partOfSpeech,
      definition,
      examples,
      synonyms,
      antonyms,
      translations,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Adding word failed", {
      cause: error,
    });
  }
};

export const getWords = async (word) => {
  try {
    const res = await axiosInstance.get(`/words/get-words/${word}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Fetching words failed", {
      cause: error,
    });
  }
};

export const updateWord = async ({
  wordId,
  word,
  audio,
  partOfSpeech,
  definition,
  examples,
  synonyms,
  antonyms,
  translations,
}) => {
  try {
    const res = await axiosInstance.patch(`words/update-word/${wordId}`, {
      word,
      audio,
      partOfSpeech,
      definition,
      examples,
      synonyms,
      antonyms,
      translations,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Updating word failed", {
      cause: error,
    });
  }
};

export const deleteWord = async (wordId) => {
  try {
    const res = await axiosInstance.delete(`words/delete-word/${wordId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Deleting word failed", {
      cause: error,
    });
  }
};
