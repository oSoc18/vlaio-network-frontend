import Cookies from 'universal-cookie';
import OverlapAPI from './api/Overlap';
import UserAPI from './api/User';
import UploadFiles from './api/UploadFiles';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  overlap: new OverlapAPI(API_URL),
  user: new UserAPI(API_URL),
  uploading: new UploadFiles(API_URL)
};

export const cookies = new Cookies();
