import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import template from '../../assets/files/template.xlsx';

/**
 * The importing flow was first implemented supporting multiple files in one import.
 * The server does not allow multiple files at the moment.
 */

class Upload extends React.Component {
  constructor() {
    super();
    this.state = { files: [], rejected: [] };
  }

  componentDidMount() {
    if (this.props.files && this.props.files.length > 0) {
      this.setState({ files: this.props.files });
    }
  }

  /**
   * Callback from Dropzone: saving accepted and rejected files
   * @param acc files accepted by Dropzone
   * @param rejected files rejected by Dropzone
   */
  onDrop = (acc, rejected) => {
    this.setState(prevState => ({
      files: Array.from(new Set([...prevState.files, ...acc])),
      rejected
    }));
  }

  /**
   * on canceling in file selection screen
   */
  onCancel = () => {
    this.setState({
      files: []
    });
  }


  /**
   * Deletes a certain file from the list of to be uploaded files
   * @param {File} selected file to be deleted
   */
  deleteFile = (file) => {
    const fileCopy = [...this.state.files]; // fix this later
    const index = fileCopy.indexOf(file);
    fileCopy.splice(index, 1);
    this.setState({ files: fileCopy });
  }

  /**
   * onClick function starting the upload of the files
   */
  onSubmit = () => {
    this.props.startUpload(this.state.files);
  }

  /**
   * Displays the error message based on the length of rejected
   * @param {arrayOf(File)} rejected files that are rejected by Dropzone
   */
  errorMessages = (rejected) => {
    switch (rejected.length) {
      case 0: break;
      case 1: return <p className="import_error"><strong>{rejected[0].name}</strong> is geen geldig xlsx-bestand </p>;
      default: return <p className="import_error">Upload slechts <strong>één</strong> bestand per import.</p>;
    }
    return null;
  }

  render() {
    const dropzone = (this.state.files.length > 0) ? (
      <ul> {this.state.files.map((f, i) => (
        <li className="import__files" key={i.toString()}>
          <span>{f.name}</span> - <button type="button" onClick={(() => this.deleteFile(f))}>Verwijder bestand</button>
        </li>
      ))}
      </ul>)
      : (
        <Dropzone
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only accept xlsx-files
          onDrop={(files, rejected) => this.onDrop(files, rejected)}
          onFileDialogCancel={() => this.onCancel()}
          multiple={false} // server only supports one file at the moment
          style={{
            width: '100%',
            border: 'solid black 1px',
            borderStyle: 'dashed',
            borderRadius: '10px'
          }}
        >
          <p className="import__dropzone-content">Sleep hier het xlsx-bestand</p>
          <p>of</p>
          <button className="import__select-buton button__secondary" type="button">
          Klik hier om een bestand te selecteren.
          </button>
          {this.errorMessages(this.state.rejected)}
        </Dropzone>);

    return (
      <React.Fragment>
        <h1>Upload een nieuw xlsx-bestand</h1>
        <h2>De spreadsheets dienen:</h2>
        <ul>
          <li>in xlsx-formaat opgeslagen te worden</li>
          <li>het formaat van de templates (hieronder beschikbaar) te volgen</li>
          <li>
            de velden
            &quot;VAT&quot;, &quot;Source&quot;, &quot;Type&quot; en &quot;Date&quot; te bevatten
          </li>
        </ul>
        <a href={template} download="template.xlsx">Download template <FontAwesomeIcon icon={faDownload} />
        </a>
        <h2>Selecteer één bestand om te uploaden.</h2>
        <div className="flex-container">
          <form className="import__form" method="post" encType="multipart/form-data">
            {dropzone}
            <button className="button import__next" type="button" disabled={!this.state.files || this.state.files.length === 0} onClick={() => this.onSubmit()}>Upload bestand</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

Upload.propTypes = {
  startUpload: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(Object)
};

Upload.defaultProps = {
  files: []
};

export default Upload;
