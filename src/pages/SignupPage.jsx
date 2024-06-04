import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    let isValid = true;
    const newFormErrors = {
      email: '',
      password: '',
      confirmPassword: '',
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
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newFormErrors.password =
        'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newFormErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Set errors and prevent submission if form is invalid
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }

    // If form is valid, continue with signup logic (not implemented in this example)
    console.log('Signing up with:', formData);
    
    // Implement your signup API call here
    try {
      const response = await axios.post('http://localhost:4000/api/user/signup', {
        email: formData.email,
        password: formData.password,
      });
      console.log('Signup success:', response.data);
      // Clear form data and redirect to login page
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/login');
     
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error (display message, etc.)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20   rounded-lg shadow-lg bg-gray-100 p-8 pt-6 pb-8 mb-12 h-full">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
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
              formErrors.email ? 'border-red-500' : ''
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
            className={`w-full border-gray-300 rounded-md shadow-sm h-10 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              formErrors.password ? 'border-red-500' : ''
            }`}
          />
          {formErrors.password && (
            <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full border-gray-300 rounded-md shadow-sm h-10 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              formErrors.confirmPassword ? 'border-red-500' : ''
            }`}
          />
          {formErrors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
