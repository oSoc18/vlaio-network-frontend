import Cookies from 'universal-cookie';

const cookies = new Cookies();
/**
 * Makes Multipart requests
 */
class APIMulti {
  /**
   * Creates object: sets url and headers in the response
   * @param {string} url the server that has to receive the response
   */
  constructor(url) {
    this.BASE_URL = url;
    this.headers = new Headers({
      Accept: 'application/json'
    });
  }

  /**
   *
   * @param {string} method type of request (POST, GET, PUT, etc.)
   * @param {boolean} authRequired does the user have to be authorized to make this query?
   * @param {*} body
   * @returns {*}
   */
  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers
    };
    const formdata = new FormData();
    if (body) {
      body.forEach((element) => {
        formdata.append('file', element);
      });
      options.body = formdata;
    }
    if (authRequired && !options.headers.get('Authorization')) {
      options.headers.append('Authorization', `Token ${cookies.get('auth')}`);
    }

    return options;
  }
}

export default APIMulti;
