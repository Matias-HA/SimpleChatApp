// Libraries
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

// Styles
import {ClickableContainer} from './styles';

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

const IconBtn = ({size, iconName, color, onPress, mirror = false}) => {
  const dispatch = useDispatch();

  return (
    <ClickableContainer mirror={mirror} onPress={() => onPress(dispatch)}>
      <FontAwesomeIcon name={iconName} size={size} color={color} />
    </ClickableContainer>
  );
};

export default IconBtn;
