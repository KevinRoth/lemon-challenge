import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ThemedIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({
  name,
  size = 24,
  color = '#2c2c31',
  style,
}) => <Icon name={name} size={size} color={color} style={style} />;

export default ThemedIcon;
