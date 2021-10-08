import styled from 'styled-components/native';
import Colors from '../../constants/colors';

export const BasicText = styled.Text`
  color: ${({textColor}) => textColor || Colors.black};
  font-size: ${({fontSize}) => fontSize || 12}px;
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
`;
