import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './login.css';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
    onLogin();
  };

  const onFailure = (response) => {
    console.log('Login failed: res:', response);
    setError('Failed to login with Google');
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="button" type="submit">Login</button>
        {error && <div className="error-msg">{error}</div>}
      </form>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
