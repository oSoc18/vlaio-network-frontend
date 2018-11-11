import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


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
      case 1: return <p className="import_error"><em>{rejected[0].name}</em> is geen geldig xlsx-bestand </p>;
      default: return <p className="import_error">Upload slechts één besetand per import.</p>;
    }
    return null;
  }

  // multipart time https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server
  render() {
    const dropzone = (
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
        <p>Sleep hier het xlsx-bestand of klik hier om een bestand te selecteren. </p>
        {this.errorMessages(this.state.rejected)}
      </Dropzone>);

    return (
      <React.Fragment>
        <h1>Upload bestanden</h1>
        <p>Selecteer één bestand om te uploaden.</p>
        <div className="flex-container">
          <form className="import__form" method="post" encType="multipart/form-data">
            {dropzone}
            <button className="button" type="button" disabled={!this.state.files || this.state.files.length === 0} onClick={() => this.onSubmit()}>Importeer bestand</button>
          </form>
          <ul>
            {this.state.files.map((f, i) => (
              <li key={i.toString()}>
                <span>{f.name}</span> - <button type="button" onClick={(() => this.deleteFile(f))}>Verwijder bestand</button>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Upload.propTypes = {
  startUpload: PropTypes.func.isRequired
};

export default Upload;
