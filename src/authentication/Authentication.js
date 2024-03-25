import { useSelector } from 'react-redux';

export const isAuthenticatedSelector = (state) => state.auth.token !== null;
export const user = (state) => state.auth.user ;
export const token = (state) => state.auth.token;
export function useIsAuthenticated() {
  return useSelector(isAuthenticatedSelector);
}
export function useUser() {
  return useSelector(user);
}

export function useToken() {
  return useSelector(token);
}