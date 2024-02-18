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
    // Replace with actual login logic
    if (ssn === '123' && password === 'password') {
      navigate('/dashboard');
    } else {
      setError('Invalid SSN or Password');
    }
  };

  return (
    <div className="vh-100">
      <div className="row h-100 no-gutters">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-info">
          <div>
            <h1>TrustVote</h1>
            <p className="h3">Blockchain Based Voting System</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={handleLogin} className="w-100 p-5" style={{maxWidth: '320px'}}>
            <h2 className="mb-3">Login</h2>
            <div className="form-group mb-3">
              <label htmlFor="ssnInput">SSN:</label>
              <input type="text" className="form-control" id="ssnInput" value={ssn} onChange={(e) => setSsn(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="passwordInput">Password:</label>
              <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="form-group d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/registration')}>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
