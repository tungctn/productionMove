import Cookie from 'js-cookie';

const setCookie = (cookiename, usrin) => {
  return Cookie.set(cookiename, usrin, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
};

export default setCookie;
