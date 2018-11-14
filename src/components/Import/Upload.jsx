import React from 'react';
import PropTypes from 'prop-types';

const Upload = ({ startUpload }) => (
  <div>
    <button className="button" type="button" onClick={startUpload}>Importeer data</button>
  </div>
);

Upload.propTypes = {
  startUpload: PropTypes.func.isRequired
};

export default Upload;
