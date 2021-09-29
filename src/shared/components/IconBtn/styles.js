import styled from 'styled-components/native';

export const ClickableContainer = styled.TouchableOpacity`
  transform: ${({mirror}) => (mirror ? `rotate(180deg)` : `rotate(0deg)`)};
`;
