import React, { useEffect, useState } from "react";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { occupationTypes } from "../../../utils/data";
import { State, City } from "country-state-city";
import type { IState, ICity } from "country-state-city";
import "./Register.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    occupation: "",
    registrationType: "PASSPORT",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [success, setSuccess] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const stateList = State.getStatesOfCountry("IN");
    setStates(stateList || []);
  }, []);

  useEffect(() => {
    if (formData.state) {
      const selectedState = states.find((s) => s.name === formData.state);
      if (selectedState) {
        const cityList = City.getCitiesOfState("IN", selectedState.isoCode);
        setCities(cityList || []);
      }
    } else {
      setCities([]);
    }
  }, [formData.state, states]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}; //{a:b} Ankith P

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email address";
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    )
      newErrors.password =
        "Password must have 8+ chars, uppercase, lowercase, number & special char";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.city) newErrors.city = "Please select a city";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!formData.occupation)
      newErrors.occupation = "Please select an occupation";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await register(formData);
      console.log("Registration response:", res);
      if (res) {
        setSuccess(true);
        setCustomerId(res.customerId!);
      }
    } catch (err: any) {
      setError(
        err.message || "Registration failed. Please try again."
      );

    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Shield className="auth-logo" />
            <h1 className="auth-title">Registration Successful!</h1>
            <p className="auth-subtitle">
              Account created successfully.
              <br></br>
              <b>Customer Id: {customerId}</b>
            </p>
          </div>
          <button onClick={() => navigate("/login")} className="auth-button">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <Shield className="auth-logo" />
          <h1 className="auth-title">Register</h1>
          <p className="auth-subtitle">Create your passport portal account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? "error" : ""}`}
              />
              {errors.firstName && (
                <span className="field-error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? "error" : ""}`}
              />
              {errors.lastName && (
                <span className="field-error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={`form-input ${errors.dateOfBirth ? "error" : ""}`}
              />
              {errors.dateOfBirth && (
                <span className="field-error">{errors.dateOfBirth}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                className={`form-input ${errors.phoneNumber ? "error" : ""}`}
              />
              {errors.phoneNumber && (
                <span className="field-error">{errors.phoneNumber}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? "error" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-textarea ${errors.address ? "error" : ""}`}
              rows={3}
              maxLength={500}
            />
            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </div>

          <div className="form-group">
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`form-select ${errors.state ? "error" : ""}`}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="field-error">{errors.state}</span>
            )}
          </div>
          <div className="form-group">
            <label>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-select ${errors.city ? "error" : ""}`}
              disabled={!formData.state}
            >
              <option value="">
                {formData.state ? "Select City" : "Select State First"}
              </option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.city && <span className="field-error">{errors.city}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                className={`form-input ${errors.pincode ? "error" : ""}`}
              />
              {errors.pincode && (
                <span className="field-error">{errors.pincode}</span>
              )}
            </div>
            <div className="form-group">
              <label>Occupation *</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={`form-select ${errors.occupation ? "error" : ""}`}
              >
                <option value="">Select Occupation</option>
                {occupationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.occupation && (
                <span className="field-error">{errors.occupation}</span>
              )}
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          {Object.keys(errors).length > 0 && (
            <div className="form-errors">
              <p>* Please fix the validation errors before submitting</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </form>
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="auth-link">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
