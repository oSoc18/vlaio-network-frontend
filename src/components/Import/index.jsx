import React, { Component } from 'react';
import Upload from './Upload';
import Review from './Review';
import Success from './Success';

import '../../assets/styles/import.css';

class Import extends Component {
  state = {
    step: 1
  };

  restart = () => this.setState({ step: 1 });

  stepBack = () => this.setState(prevState => ({ step: prevState.step - 1 }));

  stepForward = () => this.setState(prevState => ({ step: prevState.step + 1 }));

  startUpload = () => {
    this.stepForward();
  };

  startImport = () => {
    // do request and show loader
    this.stepForward();
  }

  render() {
    const { step } = this.state;

    return (
      <main className="import">
        <div className="import__progress">
          <ol>
            <li className={step === 1 ? 'active' : ''}><span>upload</span></li>
            <li className={step === 2 ? 'active' : ''}><span>controle</span></li>
            <li className={step === 3 ? 'active' : ''}><span>import</span></li>
          </ol>
        </div>
        <div className="import__details">
          { step === 1 && <Upload startUpload={this.startUpload} /> }
          { step === 2 && <Review stepBack={this.stepBack} startImport={this.startImport} /> }
          { step === 3 && <Success restart={this.restart} /> }
        </div>
      </main>
    );
  }
}

export default Import;
