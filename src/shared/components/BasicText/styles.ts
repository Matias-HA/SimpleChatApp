// Libraries
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// Includes
import Colors from '../../constants/colors';

interface Props {
  fontSize: number;
  textColor: string;
  fontWeight: string;
}

export const BasicText = styled.Text<Props>`
  color: ${(props: Props) => props.textColor || Colors.black};
  font-size: ${(props: Props) => verticalScale(props.fontSize) || scale(12)}px;
  font-weight: ${(props: Props) => props.fontWeight || 'normal'};
`;
