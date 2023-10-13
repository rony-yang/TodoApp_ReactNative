import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { images } from '../images';

const Icon = styled.Image`
  tint-color: ${({ theme, completed }) => // 항목 완료 여부에 따라 아이콘 색 변경
    completed ? theme.done : theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`;

const IconButton = ({ type, onPressOut, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

// onPressOut이 전달되지 않았을때 기본값 사용
IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: propTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: propTypes.func,
  id: propTypes.string,
  completed: propTypes.bool,
};

export default IconButton;