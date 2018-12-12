import APIMulti from './APIMulti';

/**
 *
 * @param {str} s string that has to be checked on being in JSON
 */
const isJsonString = (s) => {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Communicates with the server's Upload endpoint
 */
class UploadFiles extends APIMulti {
  /**
   * prepares query
   * @param {string} url of the upload endpoint
   */
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/upload`;
  }

  /**
   * makes the upload request to the server with the selected file(s)
   * @param {array} files files to be uploaded (limited to 1 at the moment)
   * @returns {JSON}
   */
  create(files) {
    return fetch(`${this.endpoint}/`, this.getOptions('POST', true, files)).then((r) => {
      const errorMessage = {
        errors: ['Het bestand voldoet niet aan het template. Indien u denkt dat het bestand '
        + 'wel voldoet, geef dit door aan het ontwikkelingsteam of de verandertwoordelijke.'],
        warnings: ['Er is een fout opgetreden (zie foutmelding).']
      };

      if (isJsonString(r)) {
        r.json();
      } else {
        return errorMessage;
      }
      return errorMessage;
    });
  }
}


export default UploadFiles;
