import APIMulti from './APIMulti';

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

class UploadFiles extends APIMulti {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/upload`;
  }

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
