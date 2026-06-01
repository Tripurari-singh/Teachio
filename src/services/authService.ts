import API from "./api";

export const sendOtp = async (email: string) => {
  const res = await API.post("/sendotp", { email });
  return res.data;
};

export const signupUser = async (data: {
  firstName: string; lastName: string; email: string;
  password: string; confirmPassword: string;
  accountType: "Student" | "Instructor"; otp: string;
}) => {
  const res = await API.post("/signup", data);
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
