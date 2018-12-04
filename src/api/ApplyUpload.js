import API from './API';

/**
 * Communication with the server about applying an uploaded file (or files) in the database
 */
class ApplyUpload extends API {
  /**
   * prepares the query for applying the uploaded files in the databse
   * @param {string} url of the API endpoint
   */
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/upload`;
  }

  /**
   *
   * @param {*} id id of the uploaded file to be accepted
   */
  confirm(id) {
    //  return fetch(`${this.endpoint}/${id}`, this.getOptions('POST', true)) <-- if the new stuff is on develop
    return fetch(`${this.endpoint}/${id}`, this.getOptions('GET', true))
      .then(r => r);
  }
}

export default ApplyUpload;
