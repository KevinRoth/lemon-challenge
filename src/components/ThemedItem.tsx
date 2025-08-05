import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

interface ThemedItemProps {
  leftContainer?: React.ReactNode;
  rightContainer?: React.ReactNode;
  title: string;
  description?: string;
}

const ThemedItem = ({
  leftContainer,
  rightContainer,
  title,
  description = '',
}: ThemedItemProps) => {
  return (
    <View className="flex-row p-sm mt-xs items-center bg-white rounded-xl">
      {leftContainer && <View className="mr-xs">{leftContainer}</View>}
      <View className="ml-xs flex-1 justify-center">
        <ThemedText
          type="body-2"
          className={`${!description ? 'text-align' : ''}`}
        >
          {title}
        </ThemedText>
        {description && (
          <ThemedText type="body-1" color={'text-secondary-200'}>
            {description}
          </ThemedText>
        )}
      </View>
      {rightContainer && <View className="">{rightContainer}</View>}
    </View>
  );
};

export default ThemedItem;
