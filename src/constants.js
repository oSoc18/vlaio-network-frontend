import OverlapAPI from './api/Overlap';
import AuthAPI from './api/Auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  overlap: new OverlapAPI(API_URL),
  auth: new AuthAPI(API_URL)
};
