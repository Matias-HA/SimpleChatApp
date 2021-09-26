import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

const IconBtn = ({size, iconName, color, onPress, mirror = false}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{transform: mirror ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]}}
      onPress={() => onPress(dispatch)}>
      <FontAwesomeIcon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconBtn;
