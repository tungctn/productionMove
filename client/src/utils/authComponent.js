import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthorization = (Component, allowedRoles) => {
  const WithAuthorization = () => {
    const userRole = authState.user?.role;
    if (role.includes(authState.user?.role)) {
      next();
    } else {
      gotoMainPage(authState.user);
      openNotification('error', 'Bạn không có quyền truy cập trang này');
    }
  };

  return WithAuthorization;
};

export default withAuthorization;
