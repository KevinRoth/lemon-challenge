import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

interface CategoryItem {
  label: string;
  value: string;
}

interface ThemedCategoriesProps {
  categories: CategoryItem[];
  selected: string;
  onSelect: (value: string) => void;
}

const ThemedCategories: React.FC<ThemedCategoriesProps> = ({
  categories,
  selected,
  onSelect,
}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-secondary-50"
      keyExtractor={item => String(item.value)}
      contentContainerStyle={{ gap: 8 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item.value)}
          className={`p-xs rounded-xl ${
            selected === item.value ? 'bg-secondary-50' : ''
          }`}
        >
          <Text
            className={
              selected === item.value ? 'text-primary' : 'text-secondary-500'
            }
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ThemedCategories;
