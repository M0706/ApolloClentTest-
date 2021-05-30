import React, { useState } from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";

import _Button from "./Button";

interface Props {
  isOpened: boolean;
  toggleModal: () => void;
  onSubmit: (T: any) => void;
  headerText: String;
  label: String;
}

const TextEditorModal: React.FC<Props> = ({
  isOpened,
  toggleModal,
  onSubmit,
  headerText,
  label
}) => {
  const [title, setTitle] = useState<string>("");

  const handleChangeTitle = (text: string) => {
    setTitle(text);
  };

  const handleCreateBlog = () => {
    onSubmit(title);
    setTitle("");
  };

  return (
    <Modal isVisible={isOpened} onBackdropPress={toggleModal}>
      <Container>
        <Title>{headerText}</Title>
        <TextLabel>{label}</TextLabel>
        <TextField value={title} onChangeText={handleChangeTitle} />
        <Button onPress={handleCreateBlog} disabled={!title} label="Submit" />
      </Container>
    </Modal>
  );
};

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Button = styled(_Button)`
  align-self: center;
  margin-top: 15px;
`;

const Container = styled.View`
  background-color: #ffffff;
  padding: 10px;
`;

const TextField = styled.TextInput`
  border: 1px solid #b8b8b8;
  padding: 5px;
`;

const TextLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export default TextEditorModal;
