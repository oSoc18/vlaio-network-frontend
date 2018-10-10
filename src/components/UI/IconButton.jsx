import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ icon, tabIndex, onClick }) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) onClick();
  };

  return (
    <i
      role="button"
      tabIndex={tabIndex}
      onKeyDown={e => onKeyDown(e)}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </i>
  );
};

IconButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IconButton;
