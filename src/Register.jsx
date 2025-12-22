import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      // Get Firebase auth instance (initialized in main.jsx)
      const auth = getAuth();
      const db = getFirestore();
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User registered:', userCredential.user);
      
      await setDoc(doc(db, 'Cart', user.uid), {
        authorId: user.uid,
        items: []
      });

      console.log('Cart created for user:', user.uid);

      // Show success message
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        // Redirect to login or home page
        window.location.href = '/DECA-web-project';
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      
      console.error('Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setEmailError('This email is already registered');
          break;
        case 'auth/invalid-email':
          setEmailError('Invalid email address');
          break;
        case 'auth/operation-not-allowed':
          setEmailError('Email/password accounts are not enabled');
          break;
        case 'auth/weak-password':
          setPasswordError('Password is too weak');
          break;
        default:
          setPasswordError('Registration failed: ' + (error.message || 'Please try again'));
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
          <h2>Create Account</h2>
          <p>Sign up for your account</p>
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
                autoComplete="new-password"
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

          <div className={`form-group ${confirmPasswordError ? 'error' : ''}`}>
            <div className="input-wrapper password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                autoComplete="new-password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
              >
                <span className="toggle-icon"></span>
              </button>
              <span className="input-border"></span>
            </div>
            <span className={`error-message ${confirmPasswordError ? 'show' : ''}`}>{confirmPasswordError}</span>
          </div>
          
          <button 
            type="button" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="btn-text">Create Account</span>
            <span className="btn-loader"></span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Already have an account? <a href="/DECA-web-project" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Sign in</a>
            </p>
          </div>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <span className="separator">•</span>
          <a href="#" className="footer-link">Terms of Service</a>
          <span className="separator">•</span>
          <a href="#" className="footer-link">Support</a>
        </div>
        
        <div className={`success-message ${showSuccess ? 'show' : ''}`} id="successMessage">
          <div className="success-icon">✓</div>
          <h3>Registration Successful</h3>
          <p>Redirecting to login...</p>
        </div>
      </div>
    </div>
  );
}