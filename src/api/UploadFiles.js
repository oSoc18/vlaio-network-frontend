import APIMulti from './APIMulti';

class UploadFiles extends APIMulti {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/upload`;
  }

  create(files) {
    return fetch(`${this.endpoint}/`, this.getOptions('POST', true, files)).then(r => r.json());
  }
}

export default UploadFiles;