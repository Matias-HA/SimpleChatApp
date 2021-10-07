import styled from 'styled-components/native';
import Screen from '../../../shared/constants/screen';
import Colors from '../../../shared/constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ClickableContainer = styled.TouchableOpacity`
  flex: 1;
  height: ${Screen.height * 0.11}px;
  flex-direction: row;
`;

export const InfoContainer = styled.View`
  flex: 0.9;
  flex-direction: column;
  margin: 10px;
  justify-content: center;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.primary};
`;

export const Description = styled.Text`
  font-size: 14px;
  color: grey;
`;

export const IndicatorIcon = styled(Icon)`
  align-self: center;
  margin-right: 10px;
  margin-left: auto;
`;
