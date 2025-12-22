import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Login.css';

//Original design credits to: https://github.com/puikinsh/login-forms/blob/main/forms/corporate/style.css
//Accessed on December 20, 2025

export default function CorporateLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async () => {
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        if (!email) {
        setEmailError('Email is required');
        isValid = false;
        } else if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        isValid = false;
        }

        if (!password) {
        setPasswordError('Password is required');
        isValid = false;
        } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        isValid = false;
        }

        if (!isValid) return;

        setIsLoading(true);

        try {
        // Get Firebase auth instance (initialized in main.jsx)
        const auth = getAuth();
        
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log('User signed in:', userCredential.user);
        
        // Show success message
        setIsLoading(false);
        setShowSuccess(true);
        
        const userData = {
            email,
        };
        setTimeout(() => {
            setShowSuccess(false);
            navigate("/DECA-web-project/Home", {state: userData});
        }, 2000);

        } catch (error) {
        setIsLoading(false);
        
        console.error('Login error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Handle specific Firebase errors
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
            setPasswordError('Invalid email or password');
            break;
            case 'auth/invalid-email':
            setEmailError('Invalid email address');
            break;
            case 'auth/user-disabled':
            setEmailError('This account has been disabled');
            break;
            case 'auth/too-many-requests':
            setPasswordError('Too many failed attempts. Try again later');
            break;
            case 'auth/configuration-not-found':
            case 'auth/api-key-not-valid':
            setPasswordError('Authentication service not configured properly');
            break;
            default:
            setPasswordError('Login failed: ' + (error.message || 'Please try again'));
        }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleSubmit();
        }
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>
        
        <div className="login-form">
          <div className={`form-group ${emailError ? 'error' : ''}`}>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                autoComplete="email"
              />
              <label htmlFor="email">Email</label>
              <span className="input-border"></span>
            </div>
            <span className={`error-message ${emailError ? 'show' : ''}`}>{emailError}</span>
          </div>
          
          <div className={`form-group ${passwordError ? 'error' : ''}`}>
            <div className="input-wrapper password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                autoComplete="current-password"
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <span className="toggle-icon"></span>
              </button>
              <span className="input-border"></span>
            </div>
            <span className={`error-message ${passwordError ? 'show' : ''}`}>{passwordError}</span>
          </div>
          
          <div className="form-options">
            <div className="remember-wrapper">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className="checkbox-label">
                <span className="checkbox-custom"></span>
                Keep me signed in
              </label>
            </div>
            <a href="#" className="forgot-password">Reset password</a>
          </div>
          
          <button 
            type="button" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="btn-text">Sign In</span>
            <span className="btn-loader"></span>
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Don't have an account? <a href="/DECA-web-project/Register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Join us here</a>
            </p>
          </div>
        
        <div className={`success-message ${showSuccess ? 'show' : ''}`} id="successMessage">
          <div className="success-icon">✓</div>
          <h3>Authentication Successful</h3>
          <p>Redirecting to your workspace...</p>
        </div>
      </div>
    </div>
  );
}