import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    customerIdOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.customerIdOrPhone.trim()) {
      newErrors.customerIdOrPhone = 'Customer ID or Phone Number is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(formData);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Shield className="auth-logo" />
          <h1 className="auth-title">Passport Portal</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="customerIdOrPhone" className="form-label">
              Customer ID / Phone Number *
            </label>
            <input
              type="text"
              id="customerIdOrPhone"
              name="customerIdOrPhone"
              value={formData.customerIdOrPhone}
              onChange={handleChange}
              className={`form-input ${errors.customerIdOrPhone ? 'error' : ''}`}
              placeholder="Enter your customer ID or phone number"
            />
            {errors.customerIdOrPhone && (
              <span className="field-error">{errors.customerIdOrPhone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password *</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button onClick={() => { navigate('/register'); }} className="auth-link">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
