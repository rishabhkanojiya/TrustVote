import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [ssn, setSsn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!ssn || !password) {
      setError('Please enter both SSN and Password.');
      return;
    }
    if (ssn === '123' && password === 'password') { // Replace with actual validation
      navigate('/dashboard');
    } else {
      setError('Invalid SSN or Password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>SSN:</label>
          <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate('/registration')}>Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
