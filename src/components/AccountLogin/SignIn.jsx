import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/staffLogin');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="signin">
      <div>
        <div className="signin__text">
          <h2 className="heading-2">Sign in to your account</h2>
          <p className="signin__text--p">
            Don't have an account yet? <Link to="/signup"> Sign up</Link>
          </p>
        </div>
        <form className="signin__form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            className="signin__form--box"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <label>Password</label>
          <input
            className="signin__form--box"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button className="button">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
