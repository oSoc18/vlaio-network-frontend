import React, { Component } from 'react';
import Upload from './Upload';
import Review from './Review';
import Success from './Success';
import { api } from '../../constants';

import '../../assets/styles/import.css';

const NO_CODE = -1;
const IMPORT_STATE = Object.freeze({ UPLOAD: 1, IMPORT: 2, SUCCESS: 3 });

class Import extends Component {
  state = {
    step: 1,
    message: {},
    responseCode: NO_CODE
  };

  constructor(props) {
    super(props);
    this.files = {};
  }

  restart = () => {
    this.resetState();
    this.files = {};
  }

  resetState = () => {
    this.setState(
      prevState => ({
        step: prevState.step - 1,
        message: {},
        responseCode: NO_CODE
      })
    );
  }

  stepBack = () => {
    this.resetState();
  }

  /**
   * sets the next step of the importing process
   */
  stepForward = () => this.setState(prevState => ({ step: prevState.step + 1 }));

  /**
   * Function called when the user clicks on the next button of the upload page (IMPORT_STATE: 1)
   */
  startUpload = (files) => {
    // upload files
    api.uploading.create(files).then((response) => {
      this.setState({ message: response });
    }).catch(e => this.setState({ message: e }));
    this.stepForward();
    this.files = files; // keep them in case the user wants to go back
  };

  /**
   * Function called when the user clicks on the next button of the review page (IMPORT_STATE: 2)
   */
  startImport = () => {
    const { message } = this.state;

    if (message.upload_id) {
      api.applyUpload.confirm(message.upload_id).then((response) => {
        this.setState({ responseCode: response.status });
      }).catch(() => {
        this.setState({ responseCode: 500 }); // unhandled mistake
      });
    }
    this.stepForward();
  }

  render() {
    const { step } = this.state;

    return (
      <main className="import">
        <div className="import__progress">
          <ol>
            <li className={step === IMPORT_STATE.UPLOAD ? 'active' : ''}><span>upload</span></li>
            <li className={step === IMPORT_STATE.IMPORT ? 'active' : ''}><span>controle</span></li>
            <li className={step === IMPORT_STATE.SUCCESS ? 'active' : ''}><span>import</span></li>
          </ol>
        </div>
        <div className="import__details">
          { step === IMPORT_STATE.UPLOAD && (
          <Upload files={this.files} startUpload={this.startUpload} />
          ) }
          { step === IMPORT_STATE.IMPORT && (
          <Review
            stepBack={this.stepBack}
            startImport={this.startImport}
            errorMessage={this.state.message}
            files={this.files}
          />
          ) }

          { step === IMPORT_STATE.SUCCESS
          && (
          <Success
            restart={this.restart}
            files={this.files}
            importingDone={this.state.responseCode}
          />
          ) }
        </div>
      </main>
    );
  }
}

export default Import;
