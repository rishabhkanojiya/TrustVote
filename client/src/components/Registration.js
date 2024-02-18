import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add validation logic here
    // For now, let's assume the user is correctly registered and navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="vh-100">
      <div className="row h-100 no-gutters">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-info">
          <div>
            <h1>TrustVote</h1>
            <p className="h3">Blockchain Based Voting System</p>
            <button className="btn btn-dark mr-2" onClick={() => navigate('/login')}>LOGIN</button>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={handleRegister} className="w-100 p-5" style={{ maxWidth: '320px' }}>
            <h2 className="mb-3">Registration</h2>
            <div className="form-group mb-3">
              <label htmlFor="firstNameInput">First Name:</label>
              <input type="text" className="form-control" id="firstNameInput" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastNameInput">Last Name:</label>
              <input type="text" className="form-control" id="lastNameInput" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="ssnInput">SSN:</label>
              <input type="text" className="form-control" id="ssnInput" value={ssn} onChange={(e) => setSsn(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="passwordInput">Create Password:</label>
              <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPasswordInput">Confirm Password:</label>
              <input type="password" className="form-control" id="confirmPasswordInput" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNumberInput">Phone Number:</label>
              <input type="tel" className="form-control" id="phoneNumberInput" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <div className="form-group d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
