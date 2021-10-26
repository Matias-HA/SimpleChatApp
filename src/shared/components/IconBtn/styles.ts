// Libraries
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  onPress: () => void;
  mirror: boolean;
}

export const ClickableContainer = styled.TouchableOpacity<Props>`
  transform: ${props => (props.mirror ? `rotate(180deg)` : `rotate(0deg)`)};
`;
