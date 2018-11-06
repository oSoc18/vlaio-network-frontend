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

  render() {
    return (
      <div className="flex-container">
        <form method="post" encType="multipart/form-data">
          <Dropzone
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only accept xlsx-files
            onDrop={(files, rejected) => this.onDrop(files, rejected)}
            onFileDialogCancel={() => this.onCancel()}
          >
            <p>Sleep hier de xlsx-bestanden of klik hier om bestanden te selecteren. </p>
            <ul>{this.state.rejected.map(
              (f, i) => (<li key={i.toString()}>`{f.name} is geen xlsx-bestand.`</li>)
            )}
            </ul>
          </Dropzone><button className="button" type="button" onClick={this.props.startUpload}>Importeer data</button>
        </form>
        <ul>
          {this.state.files.map((f, i) => (
            <li key={i.toString()}>
              <span>{f.name}</span> - <button type="button" onClick={(() => this.deleteFile(f))}>Verwijder bestand</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Upload.propTypes = {
  startUpload: PropTypes.func.isRequired
};

export default Upload;
