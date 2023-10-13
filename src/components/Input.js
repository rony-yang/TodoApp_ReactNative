import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions } from 'react-native';
import propTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur }) => {
  const width = Dimensions.get('window').width;
  return (
    <StyledInput 
      width={width} 
      placeholder={placeholder} 
      maxLength={50} // 입력가능한 글자의 수 50자로 제한
      autoCapitalize="none" // 첫글자가 자동으로 대문자로 전환 -> 동작하지 않도록 설정
      autoCorrect={false} // 오타 입력 시 자동으로 수정 -> 동작하지 않도록 설정
      returnKeyType="done" // ios 키보드의 완료 버튼 -> done로 수정
      keyboardAppearance="dark" // ios 키보드 색상 어둡게 설정
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    /> 
  );
};

Input.propTypes = {
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  onChangeText: propTypes.func.isRequired,
  onSubmitEditing: propTypes.func.isRequired,
  onBlur: propTypes.func.isRequired,
};

export default Input;

