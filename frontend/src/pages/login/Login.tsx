import React, { useState } from "react";
import "./Login.css";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

interface LoginFormData {
  customerIdOrPhone: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    customerIdOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loginError, setLoginError] = useState<string>("");

  const { setIsLoggedIn, setUserData } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.customerIdOrPhone.trim())
      newErrors.customerIdOrPhone = "Customer ID or phone number is required";
    if (!formData.password.trim())
      newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        customerIdOrPhone: formData.customerIdOrPhone,
        password: formData.password,
      });

      const userData = response.data;
      console.log("Login successful:", userData);

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      setUserData(userData);
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoginError(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="customerIdOrPhone">Customer ID / Phone *</label>
            <input
              type="text"
              id="customerIdOrPhone"
              name="customerIdOrPhone"
              value={formData.customerIdOrPhone}
              onChange={handleChange}
              className={errors.customerIdOrPhone ? "error" : ""}
              placeholder="Enter your Customer ID or Phone"
            />
            {errors.customerIdOrPhone && (
              <span className="error-message">{errors.customerIdOrPhone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {loginError && <span className="error-message">{loginError}</span>}

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-link">
            Don’t have an account? <a href="/signup">Sign up here</a>
          </div>
        </form>
      </div>
    </div>
  );
};
