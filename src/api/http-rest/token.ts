const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem('user') as any);
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user') as any);
  return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
  let user = JSON.parse(localStorage.getItem('user') as any);
  user.accessToken = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem('user') as any);
};

const setUser = (user: any) => {
  console.log(JSON.stringify(user));
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
