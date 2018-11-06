import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class Upload extends React.Component  {

  constructor() {
    super();
    this.state = { files: [] }
  }

  onDrop = (files) => {
    this.setState({
      files
    });
  }

  onCancel = () => {
    this.setState({
      files: []
    });
  }

  render() {

    return (
      <div>
        <form method="post" encType="multipart/form-data">
          <Dropzone
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only accept xlsx-files
            onDrop={files => this.onDrop(files)}
            onFileDialogCancel={() => this.onCancel()}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone><button className="button" type="button" onClick={this.props.startUpload}>Importeer data</button>
        </form>
      </div>
    );
  }
}

Upload.propTypes = {
  startUpload: PropTypes.func.isRequired
};

export default Upload;
