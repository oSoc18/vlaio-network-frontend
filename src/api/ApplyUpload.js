import API from './API';

class ApplyUpload extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/apply`;
  }

  confirm(id) {
    return fetch(`${this.endpoint}/${id}`, this.getOptions('GET', true))
      .then(r => r);
  }
}

export default ApplyUpload;
