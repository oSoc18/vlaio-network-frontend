import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

/**
 * The importing flow was first implemented supporting multiple files in one import.
 * The server does not allow multiple files at the moment.
 */

class Upload extends React.Component {
  constructor() {
    super();
    this.state = { files: [], rejected: [] };
  }

  onDrop = (acc, rejected) => {
    this.setState(prevState => ({
      files: Array.from(new Set([...prevState.files, ...acc])),
      rejected
    }));
  }

  onCancel = () => {
    this.setState({
      files: []
    });
  }


  deleteFile = (file) => {
    const fileCopy = [...this.state.files]; // fix this later
    const index = fileCopy.indexOf(file);
    fileCopy.splice(index, 1);
    this.setState({ files: fileCopy });
  }

  onSubmit = () => {
    this.props.startUpload(this.state.files);
  }

  errorMessages = (rejected) => {
    switch (rejected.length) {
      case 0: break;
      case 56454: break;
      case 1: return <p className="import_error"><strong>{rejected[0].name}</strong> is geen geldig xlsx-bestand </p>;
      default: return <p className="import_error">Upload slechts <strong>één</strong> bestand per import.</p>;
    }
    return null;
  }

  // multipart time https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server
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
          klik hier om een bestand te selecteren.
          </button>
          {this.errorMessages(this.state.rejected)}
        </Dropzone>);

    return (
      <React.Fragment>
        <h1>Upload nieuw xlsx-bestand</h1>
        <p>Selecteer één bestand om te uploaden.</p>
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
  startUpload: PropTypes.func.isRequired
};

export default Upload;
