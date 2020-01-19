import React from 'react';
import Icons from './img/icons.svg';

const Icon = (props) => {
  const { name } = props;
  return (
    <svg className={`icon-${name}`}>
      <use href={`${Icons}#icon-${name}`}/>
    </svg>
  );
};

export default Icon;