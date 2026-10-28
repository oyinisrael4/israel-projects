import { Link } from "react-router-dom";
import { useState } from "react";

import niitLogo from "../assets/niit-logo.png";

import api from "../api/axios"; // api base url

import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import AlertModal from "../components/AlertModal";


export default function SignUp() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear the current field error while typing
    setError((previousError) => ({
      ...previousError,
      [name]: "",
    }));

    setApiError("");
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      newErrors.emailAddress = "Enter a valid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9\s()-]{10,20}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setError(newErrors);

    return !Object.values(newErrors).some(
      (message) => message !== ""
    );
  };

  // Register account
  const handleSignUp = async (event) => {
    event.preventDefault();
    if (loading) return;

    setSuccess("");
    setApiError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      //------- SEND DATA THROUGHT JSON FORMAT -------- //
      // const response = await api.post("auth/sign-up", {
      //   fullName: formData.fullName,
      //   emailAddress: formData.emailAddress,
      //   phoneNumber: formData.phoneNumber,
      //   password: formData.password
      // });
      //  const responseData = response.data;

    //.........SEND DATA THROUGHT FORMDATA FORMAT............. //
      const requestData = new FormData();

      requestData.append("fullName", formData.fullName);
      requestData.append("emailAddress", formData.emailAddress);
      requestData.append("phoneNumber", formData.phoneNumber);
      requestData.append("password", formData.password);

      const response = await api.post("auth/sign-up", requestData);
      const responseData = response.data;

      if (responseData?.success === true) {
        setSuccess(
          responseData?.message ||
          "Your account has been created successfully."
        );

        setModal(true);
      } else {
        setApiError(
          responseData?.message ||
          "Unable to create your account. Please try again."
        );
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
        err.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="auth-section">
        <div className="auth-background">
          <div className="overlay-bg">
            <div className="form-container">

              {/* Signup Form */}
              <div className="form-content">
                <div className="inner-form">

                  <div className="top-container">
                    <h2>Sign Up</h2>

                    <div className="icon-container">

                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16">

                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                      </div>

                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                        </svg>
                      </div>

                    </div>
                  </div>

                  <form className="input-container" onSubmit={handleSignUp}>

                    <InputField
                      title="Fullname"
                      id="fullName"
                      name="fullName"
                      inputType="text"
                      placeHolder="Enter your fullname"
                      handleChangeValue={handleChange}
                      inputValue={formData.fullName}
                      error={error.fullName}
                      autoComplete="name"
                    />

                    <InputField
                      title="Email Address"
                      id="emailAddress"
                      name="emailAddress"
                      inputType="email"
                      placeHolder="Enter your email address"
                      handleChangeValue={handleChange}
                      inputValue={formData.emailAddress}
                      error={error.emailAddress}
                      autoComplete="email"
                    />

                    <InputField
                      title="Phone Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      inputType="tel"
                      placeHolder="Enter your phone number"
                      handleChangeValue={handleChange}
                      inputValue={formData.phoneNumber}
                      error={error.phoneNumber}
                      autoComplete="tel"
                    />

                    <InputField
                      title="Password"
                      id="password"
                      name="password"
                      inputType="password"
                      placeHolder="Enter your password"
                      handleChangeValue={handleChange}
                      inputValue={formData.password}
                      error={error.password}
                      autoComplete="new-password"
                    />

                    <InputField
                      title="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      inputType="password"
                      placeHolder="Confirm your password"
                      handleChangeValue={handleChange}
                      inputValue={formData.confirmPassword}
                      error={error.confirmPassword}
                      autoComplete="new-password"
                    />

                    {/* API Error */}
                    {apiError && (
                      <p className="error" role="alert">{apiError}</p>
                    )}

                    {/* Signup Button */}
                    <ButtonComponent
                      buttonType="submit"
                      buttonText={loading ? "Processing..." : "Sign Up"}
                      buttonTitle="Sign Up"
                      btnAction={loading}
                      className="signup-btn"
                    />

                  </form>

                  <p className="signin-footer">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="signup-link">Sign In </Link>
                  </p>

                </div>
              </div>

              {/* Right Side Content */}
              <div className="form-content text-content">
                <div className="text-wrapper">

                  <div className="logo-container">
                    <img
                      src={niitLogo}
                      alt="NIIT logo"
                    />
                  </div>

                  <div className="title">
                    <h1>Welcome to Student Portal</h1>

                    <p>Already have an account?</p>
                  </div>

                  <Link to="/sign-in">
                    <button type="button" className="btn" title="Sign In" >
                      Sign In
                    </button>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {modal && success && (
        <AlertModal redirectLink="/sign-in" message={success} />
      )}
    </>
  );
}