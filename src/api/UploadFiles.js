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
        errors: ['Het bestand voldoet niet aan het template of is leeg. Indien u denkt dat het bestand '
        + 'wel voldoet, geef dit door aan het ontwikkelingsteam of de verandertwoordelijke.'],
        warnings: ['Er is een fout opgetreden (zie foutmelding).']
      };

      if (r.ok) {
        return r.json();
      }
      return errorMessage; // if Promise rejected
    });
  }
}


export default UploadFiles;
