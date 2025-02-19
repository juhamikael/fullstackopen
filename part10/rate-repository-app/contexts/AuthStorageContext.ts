import { createContext } from 'react';
import AuthStorage from '../utils/AuthStorage';

const AuthStorageContext = createContext<AuthStorage | null>(null);

export default AuthStorageContext;