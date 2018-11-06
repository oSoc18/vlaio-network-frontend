import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class Upload extends React.Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  onDrop = (acc, rejected) => {
    const withoutDoubles = this.deleteDoubles(this.state.files, acc);
    this.setState(prevState => ({
      files: [...prevState.files, ...withoutDoubles]
    }));
  }

  deleteDoubles = (original, toCheck) => {
    const withoutDoubles = [];
    for (let i = 0; i < toCheck.length; i += 1) {
      if (original.indexOf(toCheck[i]) < 0) {
        withoutDoubles.push(toCheck[i]);
      }
    }
    return withoutDoubles;
  }

  onCancel = () => {
    this.setState({
      files: []
    });
  }

  deleteFile = (file) => {
    const fileCopy = this.state.files;
    const index = fileCopy.indexOf(file);
    fileCopy.splice(index, 1);
    this.setState(prevState => ({ files: prevState.files.splice(index, 1) }));
  }

  render() {
    console.log(this.state.files);
    return (
      <div className="flex-container">
        <form method="post" encType="multipart/form-data">
          <Dropzone
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only accept xlsx-files
            onDrop={(files, rejected) => this.onDrop(files, rejected)}
            onFileDialogCancel={() => this.onCancel()}
          >
            <p>Sleep hier de xlsx-bestanden of klik hier om bestanden te selecteren. </p>
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
