import Avatar from 'react-avatar';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React from 'react';

export const UserAvatar = ({
  size,
  name,
  src,
  round,
  className,
  style,
  onClick,
  showTooltip,
}) => (
  <OverlayTrigger
    key="bottom"
    placement="top"
    show={showTooltip}
    overlay={<Tooltip id={'tooltip-top'}>{name}</Tooltip>}
  >
    {({ ref, ...triggerHandler }) => (
      <div {...triggerHandler} ref={ref}>
        <Avatar
          size={size}
          name={name}
          title={' '}
          src={src}
          round={round}
          className={className}
          style={style}
          onClick={onClick}
        />
      </div>
    )}
  </OverlayTrigger>
);
