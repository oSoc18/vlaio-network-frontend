import Cookies from 'universal-cookie';
import OverlapAPI from './api/Overlap';
import SunburstAPI from './api/Sunburst';
import UserAPI from './api/User';
import InteractionAPI from './api/Interaction';
import CompanyAPI from './api/Company';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  company: new CompanyAPI(API_URL),
  overlap: new OverlapAPI(API_URL),
  sunburst: new SunburstAPI(API_URL),
  user: new UserAPI(API_URL),
  interaction: new InteractionAPI(API_URL)
};

export const cookies = new Cookies();
