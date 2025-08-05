import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface ThemedInputProps extends TextInputProps {
  className?: string;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  className = '',
  ...props
}) => (
  <TextInput
    className={`border border-secondary-100 rounded-lg p-xs ${className}`}
    placeholderTextColor="#9e9ea0"
    {...props}
  />
);

export default ThemedInput;
