import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
        {children}
    </React.Fragment>
  )
};

export default AuthLayout;