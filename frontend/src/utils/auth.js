const TOKEN_KEY = 'db_backup_token';
const REFRESH_TOKEN_KEY = 'db_backup_refresh_token';
const USER_KEY = 'db_backup_user';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setRefreshToken = (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
export const removeUser = () => localStorage.removeItem(USER_KEY);

export const isAuthenticated = () => !!getToken();

export const logout = () => {
  removeToken();
  removeRefreshToken();
  removeUser();
};

// Refresh token function - uses axios directly to avoid circular dependency
export const refreshToken = async () => {
  try {
    const axios = await import('axios').then(m => m.default);
    const refreshTokenValue = getRefreshToken();
    
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/refresh-token`,
      { refreshToken: refreshTokenValue }
    );

    const { token, refreshToken: newRefreshToken } = response.data;
    setToken(token);
    setRefreshToken(newRefreshToken);

    return token;
  } catch (error) {
    logout();
    throw error;
  }
};

