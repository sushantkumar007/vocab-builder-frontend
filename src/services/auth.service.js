import { axiosInstance } from "./axios.js";
export const register = async ({ name, email, password }) => {
  try {
    const res = await axiosInstance.post("/users/register", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed", {
      cause: error,
    });
  }
};

export const verifyEmail = async (emailVerificationToken) => {
  try {
    const res = await axiosInstance.post(
      `/users/verify-email/${emailVerificationToken}`,
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Email verification failed",
      { cause: error },
    );
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/users/login", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed", {
      cause: error,
    });
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Logout failed", {
      cause: error,
    });
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Fetching current user failed",
      { cause: error },
    );
  }
};

export const resendEmailVerification = async ({ email }) => {
  try {
    const res = await axiosInstance.post("/users/resend-verification-email", {
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Resending email verification failed",
      { cause: error },
    );
  }
};

export const resetPassordRequest = async ({ email }) => {
  try {
    const res = await axiosInstance.post("/users/reset-password-request", {
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Reset password request failed",
      { cause: error },
    );
  }
};

export const resetPassword = async (resetPasswordToken) => {
  try {
    const res = await axiosInstance.patch(
      `/users/reset-password/${resetPasswordToken}`,
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Resetting password failed",
      { cause: error },
    );
  }
};

export const updatePassword = async ({ currentPassword, newPassword }) => {
  try {
    const res = await axiosInstance.patch("/users/update-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Updating password failed", {
      cause: error,
    });
  }
};
