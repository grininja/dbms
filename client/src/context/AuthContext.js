import createDataContext from './createDataContext';
import authReducer from '../reducers/auth';
import { signUp, signIn, setCurrentUser } from '../actions';
import jwtDecode from 'jwt-decode';
export const initialState = {
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).username : null,
  isAuthenticated:localStorage.getItem('token') ? true : false,
  signUpErr: '',
  signInErr: ''
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signUp, signIn, setCurrentUser },
  initialState,
)

