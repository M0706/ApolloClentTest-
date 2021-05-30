import React from "react";
import styled from "styled-components/native";
import { ViewStyle, StyleProp, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  label: String;
  onPress: (T: any) => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  style,
  label,
  onPress,
  disabled,
  ...restProps
}) => {
  return (
    <ButtonContainer
      style={style}
      disabled={disabled}
      onPress={onPress}
      {...restProps}
    >
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

interface ButtonProps {
  disabled: boolean;
}
const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ disabled }) => (disabled ? "#6d6d6d" : "#ff9900")};
  padding: 10px 15px 10px 15px;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 500;
`;

export default Button;
