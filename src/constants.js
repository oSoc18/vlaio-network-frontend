import OverlapAPI from './api/Overlap';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  overlap: new OverlapAPI(API_URL)
};
