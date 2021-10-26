// Libraries
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Includes

// Styles
import {ClickableContainer} from './styles';

interface Props {
  size: number;
  iconName: string;
  color: string;
  onPress: () => {};
  mirror: boolean;
}

/**
 * @description
 * Reuseable component - Returns a clickable icon
 *
 * @param {*} size - The size of the icon
 * @param {*} iconName - The name of the icon. Name has to match icon within the FontAwesome icon library
 * @param {*} color - Color of the icon
 * @param {*} onPress - Function to execute when icon is clicked
 * @param {*} mirror - Determines if the icon should be rotated 180 degrees on the y-axis
 */

const IconBtn = ({size, iconName, color, onPress, mirror = false}: Props) => {
  return (
    <ClickableContainer mirror={mirror} onPress={() => onPress()}>
      <FontAwesomeIcon name={iconName} size={size} color={color} />
    </ClickableContainer>
  );
};

export default IconBtn;
