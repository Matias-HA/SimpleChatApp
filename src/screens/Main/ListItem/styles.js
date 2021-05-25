import styled from 'styled-components/native';
import Screen from '../../../shared/constants/screen';
import Colors from '../../../shared/constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ClickableContainer = styled.TouchableOpacity`
  flex: 1;
  height: ${Screen.height * 0.1}px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${Colors.divider};
`;

export const InfoContainer = styled.View`
  flex: 0.9;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px;
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
