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

  // multipart time https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server
  render() {
    return (
      <React.Fragment>
        <h1>Upload bestanden</h1>
        <p>Selecteer één bestand om te uploaden.</p>
        <div className="flex-container">
          <form method="post" encType="multipart/form-data">
            <Dropzone
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only accept xlsx-files
              onDrop={(files, rejected) => this.onDrop(files, rejected)}
              onFileDialogCancel={() => this.onCancel()}
              multiple={false} // server only supports one file at the moment
            >
              <p>Sleep hier het xlsx-bestand of klik hier om een bestand te selecteren. </p>
              <ul>{this.state.rejected.map(
                (f, i) => {
                  if (f.length === 1) return (<li key={i.toString()}>`{f.name} is geen xlsx-bestand.`</li>);
                  if (f.length > 1) return (<li>Importeer slechts één bestand per keer.</li>);
                  return null;
                }

              )}
              </ul>
            </Dropzone>
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
