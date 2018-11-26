import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from './API';


class ApplyUpload extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/upload`;
  }

  confirm(id) {
    //  return fetch(`${this.endpoint}/${id}`, this.getOptions('POST', true)) <-- if the new stuff is on develop
    return fetch(`${this.endpoint}/${id}`, this.getOptions('GET', true))
      .then(r => r);
  }
}

export default ApplyUpload;
