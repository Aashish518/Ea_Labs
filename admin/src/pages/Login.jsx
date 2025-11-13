import { useState, useEffect } from "react";
import { Mail, Lock, CheckCircle, AlertTriangle, X } from 'lucide-react';

// --- Toast Notification Component ---
const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const Icon = {
    success: CheckCircle,
    error: AlertTriangle,
    info: Mail,
  }[type] || AlertTriangle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl text-white flex items-center space-x-3 transition-opacity duration-300 transform ${typeClasses[type] || typeClasses.info}`}
      role="alert"
    >
      <Icon className="w-6 h-6 shrink-0" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- Custom Input Field Component with Icon ---
const InputField = ({ label, type, value, onChange, icon: Icon, required = false, placeholder = "" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
          required={required}
        />
      </div>
    </div>
);

// --- Step Indicator for Forgot Password Flow ---
const StepIndicator = ({ currentStep }) => {
    const steps = [
      { id: 1, name: 'Enter Email' },
      { id: 2, name: 'Verify OTP' },
      { id: 3, name: 'New Password' },
    ];

    return (
      <div className="flex justify-between items-center mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300 mx-10 -z-10 rounded-full">
            <div 
                className={`h-1 bg-indigo-500 transition-all duration-500 rounded-full`} 
                style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>
        </div>
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center flex-1 z-10">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-colors duration-500 ease-in-out ${
                currentStep >= s.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s.id}
            </div>
            <span className={`text-xs mt-2 text-center font-medium transition-colors duration-300 hidden sm:block ${currentStep >= s.id ? 'text-indigo-600' : 'text-gray-500'}`}>
              {s.name}
            </span>
          </div>
        ))}
      </div>
    );
};


// --- Main App Component ---
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showNotification = (message, type = "info") => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
        // In a real app, replace this with your actual authentication logic (e.g., Firebase auth)
        showNotification(`Logged in successfully with: ${email}`, 'success');
        // Clear fields on successful login
        setEmail('');
        setPassword('');
    } else {
        showNotification('Please enter valid email and password.', 'error');
    }
  };

  const handleSendOTP = () => {
    if (!forgotEmail) {
        return showNotification("Please enter your email address.", 'error');
    }
    // Simulate API call to send OTP here
    showNotification(`OTP simulation sent to ${forgotEmail}. (Use code: 1234)`, 'info');
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (otp === "1234") { // Mock verification
      showNotification("OTP verified successfully! You can now set a new password.", 'success');
      setStep(3);
    } else {
      showNotification("Invalid OTP. Please try again.", 'error');
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || newPassword.length < 6) {
        return showNotification("Password must be at least 6 characters long.", 'error');
    }
    // Simulate API call to reset password
    showNotification("Password reset successfully! You can now log in.", 'success');
    setShowForgotModal(false);
    setStep(1);
    // Clear reset flow state
    setNewPassword('');
    setForgotEmail('');
    setOtp('');
  };
  
  const resetModalState = () => {
    setStep(1);
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setShowForgotModal(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans antialiased">
      
      {/* This is the custom CSS block for the background animation.
        It must be inside the component to be included in the single file.
      */}
      <style jsx="true">{`
          @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
          }
          .animated-bg-style {
              /* A wide, slow-moving gradient using soft indigo/purple colors */
              background: linear-gradient(-45deg, #a78bfa, #c4b5fd, #818cf8, #3b82f6); 
              background-size: 400% 400%;
              animation: gradient-shift 15s ease infinite; /* 15 seconds for a smooth, slow flow */
          }
      `}</style>
      
      {/* Animated Background Effect - Using the custom CSS class */}
      <div className="absolute inset-0 z-0 opacity-40 animated-bg-style"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-sm transform transition-transform duration-300">
        <div className="text-center mb-8">
          <Lock className="w-10 h-10 mx-auto text-indigo-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
            placeholder="••••••••"
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors hover:underline"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              onClick={resetModalState}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Password Reset
            </h3>
            
            {/* Step Indicator */}
            <StepIndicator currentStep={step} />

            {/* Step 1: Email Input */}
            {step === 1 && (
              <div className="space-y-6 pt-4">
                <p className="text-gray-600 text-center text-sm">
                    Enter the email associated with your account to receive a verification code.
                </p>
                <InputField
                  label="Registered Email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  icon={Mail}
                  required
                  placeholder="name@company.com"
                />
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Send Verification Code
                </button>
                <button 
                    onClick={resetModalState}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-indigo-600 transition"
                >
                    Cancel
                </button>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-6 pt-4">
                <p className="text-gray-600 text-center text-sm">
                    A 4-digit code has been sent to **{forgotEmail}**. Enter it below. (Code: 1234)
                </p>
                <InputField
                  label="Verification Code (OTP)"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  icon={Lock}
                  required
                  placeholder="e.g., 1234"
                />
                <button
                  onClick={handleVerifyOTP}
                  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Verify Code
                </button>
                <button 
                    onClick={() => setStep(1)}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-indigo-600 transition"
                >
                    &larr; Back to Email
                </button>
              </div>
            )}

            {/* Step 3: Set New Password */}
            {step === 3 && (
              <div className="space-y-6 pt-4">
                <p className="text-gray-600 text-center text-sm">
                    Enter your new secure password.
                </p>
                <InputField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={Lock}
                  required
                  placeholder="Min 6 characters"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Save New Password
                </button>
                <button 
                    onClick={resetModalState}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-indigo-600 transition"
                >
                    Cancel & Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Global Toast Notification */}
      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}