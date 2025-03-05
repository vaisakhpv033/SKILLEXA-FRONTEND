"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Mail, Lock, User, AtSign, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";
import OtpValidation from "@/components/OtpValidation";
import { toast } from "sonner";

const RegisterInstructor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [touchedFields, setTouchedFields] = useState(new Set());
  const [otpValidation, setOtpValidation] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8 && password.length <= 20,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordCriteria(criteria);
    return criteria;
  };

  const debouncedValidation = useCallback(
    debounce((field, value) => {
      const newErrors = { ...errors };

      switch (field) {
        case "firstName":
          if (!value.trim()) {
            newErrors.firstName = "First name is required";
          } else {
            delete newErrors.firstName;
          }
          break;

        case "lastName":
          if (!value.trim()) {
            newErrors.lastName = "Last name is required";
          } else {
            delete newErrors.lastName;
          }
          break;

        case "username":
          if (!value.trim()) {
            newErrors.username = "Username is required";
          } else if (!validateUsername(value)) {
            newErrors.username =
              "Username can only contain letters and numbers";
          } else {
            delete newErrors.username;
          }
          break;

        case "email":
          if (!value.trim()) {
            newErrors.email = "Email is required";
          } else if (!validateEmail(value)) {
            newErrors.email = "Please enter a valid email address";
          } else {
            delete newErrors.email;
          }
          break;

        case "password":
          const criteria = validatePassword(value);
          const passwordErrors = [];

          if (!criteria.length)
            passwordErrors.push("Password must be 8-20 characters long");
          if (!criteria.uppercase)
            passwordErrors.push("Include at least one uppercase letter");
          if (!criteria.lowercase)
            passwordErrors.push("Include at least one lowercase letter");
          if (!criteria.number)
            passwordErrors.push("Include at least one number");
          if (!criteria.special)
            passwordErrors.push("Include at least one special character");

          if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors;
          } else {
            delete newErrors.password;
          }

          // Validate confirm password if it exists
          if (confirmPassword && value !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
          } else if (confirmPassword) {
            delete newErrors.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
          } else if (value !== password) {
            newErrors.confirmPassword = "Passwords do not match";
          } else {
            delete newErrors.confirmPassword;
          }
          break;
      }

      setErrors(newErrors);
    }, 500),
    [password, confirmPassword]
  );

  const handleInputChange = (field, value) => {
    setTouchedFields((prev) => new Set(prev).add(field));

    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }

    debouncedValidation(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Touch all fields to show all errors
    const allFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    setTouchedFields(new Set(allFields));

    // Validate all fields
    allFields.forEach((field) => {
      let value = "";
      switch (field) {
        case "firstName":
          value = firstName;
          break;
        case "lastName":
          value = lastName;
          break;
        case "username":
          value = username;
          break;
        case "email":
          value = email;
          break;
        case "password":
          value = password;
          break;
        case "confirmPassword":
          value = confirmPassword;
          break;
      }
      debouncedValidation.flush();
      debouncedValidation(field, value);
    });

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // send data to the backend server
      let form = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword,
      };
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/instructor/register", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data.error);
        if (!res.ok) throw new Error(data.error || "failed to register");
        toast.success("Registration Successfull. Please Verify your email now.")
        setOtpValidation(true);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
      console.log("Form submitted successfully");
    }
  };

  const renderFieldError = (field) => {
    if (!touchedFields.has(field) || !errors[field]) return null;

    return (
      <div className="mt-1 text-sm text-red-500 dark:text-red-400">
        {Array.isArray(errors[field]) ? (
          errors[field].map((error, index) => (
            <div key={index} className="flex items-center gap-1">
              <XCircle className="w-4 h-4 inline" />
              <span>{error}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-1">
            <XCircle className="w-4 h-4 inline" />
            <span>{errors[field]}</span>
          </div>
        )}
      </div>
    );
  };

  const renderPasswordStrength = () => {
    if (!touchedFields.has("password")) return null;

    const criteria = [
      { label: "8-20 characters", met: passwordCriteria.length },
      { label: "Uppercase letter", met: passwordCriteria.uppercase },
      { label: "Lowercase letter", met: passwordCriteria.lowercase },
      { label: "Number", met: passwordCriteria.number },
      { label: "Special character", met: passwordCriteria.special },
    ];

    return (
      <div className="mt-2 space-y-1">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-center gap-1 text-sm">
            {criterion.met ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span
              className={criterion.met ? "text-green-500" : "text-gray-500"}
            >
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} 
        className={cn(
          "p-8 pt-16 space-y-6",
          otpValidation && "hidden",
        )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.firstName &&
                    touchedFields.has("firstName") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Enter your first name"
                required
              />
            </div>
            {renderFieldError("firstName")}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.lastName &&
                    touchedFields.has("lastName") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Enter your last name"
                required
              />
            </div>
            {renderFieldError("lastName")}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.username &&
                    touchedFields.has("username") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Choose a username"
                required
              />
            </div>
            {renderFieldError("username")}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.email &&
                    touchedFields.has("email") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Enter your email"
                required
              />
            </div>
            {renderFieldError("email")}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.password &&
                    touchedFields.has("password") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Choose a password"
                required
              />
            </div>
            {renderPasswordStrength()}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                  "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                  "transition-colors duration-200",
                  errors.confirmPassword &&
                    touchedFields.has("confirmPassword") &&
                    "border-red-500 dark:border-red-500"
                )}
                placeholder="Confirm your password"
                required
              />
            </div>
            {renderFieldError("confirmPassword")}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-3 px-4 rounded-lg mt-8",
            "skillexa-gradient",
            "text-white font-medium",
            "hover:opacity-90",
            "transform transition-all duration-200",
            "hover:scale-[1.02]",
            "focus:outline-none focus:ring-2 focus:ring-custom-gradient-start focus:ring-offset-2",
            "dark:focus:ring-offset-dark-card"
          )}
        >
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-full animate-spin" /> : "Create Account"}
        </button>
        {error && (
          <p className="text-red-500 dark:text-red-500 text-center font-semibold">
            *{error}
          </p>
        )}{" "}
        {/* ✅ Show the error */}
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-custom-gradient-start hover:text-custom-gradient-end dark:text-violet-400 dark:hover:text-violet-600"
          >
            Sign in
          </Link>
        </p>
      </form>
      {otpValidation && <OtpValidation email={email}/>}
    </>
  );
};

export default RegisterInstructor;
