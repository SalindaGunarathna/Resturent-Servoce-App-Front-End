import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset form errors on change
    setFormErrors({
      ...formErrors,
      [name]: '',
      general: '',
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', formData);
      const { user, token } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);

      console.log('Login success:', user, token);

      // Redirect to admin panel
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error.response.data);
      // Handle login error (display message, etc.)
      if (error.response && error.response.status === 400) {
        setFormErrors({
          email: 'Username or password is incorrect',
          password: 'Username or password is incorrect',
          general: 'Username or password is incorrect',
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    let isValid = true;
    const newFormErrors = {
      email: '',
      password: '',
      general: '',
    };

    // Email validation
    if (!formData.email.trim()) {
      newFormErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFormErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newFormErrors.password = 'Password is required';
      isValid = false;
    }

    // Set errors and prevent submission if form is invalid
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }

    // If form is valid, continue with login logic
    handleLogin();
  };

  return (
    <div className="max-w-md mx-auto mt-20 rounded-lg shadow-lg bg-gray-100 p-8 pt-6 pb-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      {formErrors.general && (
        <p className="text-sm text-red-500 mb-4">{formErrors.general}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full border-gray-300 rounded-md shadow-sm h-10 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              formErrors.email || formErrors.general ? 'border-red-500' : ''
            }`}
          />
          {formErrors.email && (
            <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full border-gray-300 rounded-md shadow-sm h-10 px-3 
            focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              formErrors.password || formErrors.general ? 'border-red-500' : ''
            }`}
          />
          {formErrors.password && (
            <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-2 px-4 border border-transparent shadow-sm text-sm 
          font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none
           focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
