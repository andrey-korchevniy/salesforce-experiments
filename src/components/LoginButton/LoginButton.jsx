import React from 'react';
import useSalesforceApi from '../../api/auth/useSalesforceApi';

function LoginButton() {
  const { api, isLoggedIn } = useSalesforceApi();

  const handleLoginClick = async () => {
    console.log('isLoggedIn', isLoggedIn);
    if (!isLoggedIn) {
      await api.login();
    }
  };

  return (
    <button onClick={handleLoginClick}>
      {isLoggedIn ? 'Logged in' : 'Log in to Salesforce'}
    </button>
  );
}

export default LoginButton;
