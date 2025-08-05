import {
  Text,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from './ThemedText';

interface Props extends PressableProps {
  children: string;
  type: 'primary' | 'secondary' | 'custom';
  customTypeColor?: string;
  customTypeActiveColor?: string;
  textColor?: string;
  textClassName?: string;
  isLoading?: boolean;
}

const ThemedButton = ({
  children,
  type,
  className,
  customTypeColor,
  customTypeActiveColor,
  textColor,
  textClassName,
  isLoading = false,
  ...rest
}: Props) => {
  const getType: Record<Props['type'], string> = {
    primary: 'bg-primary-500',
    secondary: 'bg-white ',
    custom: customTypeColor || 'bg-primary-500',
  };

  const getActiveType: Record<Props['type'], string> = {
    primary: 'active:bg-primary-300',
    secondary: 'active:bg-secondary-50',
    custom: customTypeActiveColor || 'active:bg-primary-300',
  };

  return (
    <Pressable
      className={`${getType[type]} ${getActiveType[type]} ${className} disabled:opacity-50`}
      style={styles.button}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <ThemedText
          className={textClassName}
          type="title"
          color={textColor || 'text-secondary-500'}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
};
export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
