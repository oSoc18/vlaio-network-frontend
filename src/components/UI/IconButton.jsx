import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({
  icon, onClick, className, tabIndex
}) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) onClick();
  };

  const classes = (className) ? `icon-button ${className}` : 'icon-button';

  return (
    <i
      role="button"
      tabIndex={tabIndex}
      onKeyDown={e => onKeyDown(e)}
      onClick={onClick}
      className={classes}
    >
      <FontAwesomeIcon icon={icon} />
    </i>
  );
};

IconButton.defaultProps = {
  className: '',
  tabIndex: 0
};

IconButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default IconButton;
