import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Text } from 'react-native-paper';
import { theme } from 'theme';

export type SortOption = {
  orderBy: 'CREATED_AT' | 'RATING_AVERAGE';
  orderDirection: 'ASC' | 'DESC';
  label: string;
  leadingIcon?: string;
};

const sortOptions: SortOption[] = [
  {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    label: 'Latest repositories',
    leadingIcon: "calendar-outline",

  },
  {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    label: 'Highest rated repositories',
    leadingIcon: 'arrow-up',
  },
  {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
    label: 'Lowest rated repositories',
    leadingIcon: 'arrow-down',
  },
];

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  buttonText: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.body,
  },
});

interface Props {
  selectedSort: SortOption;
  onSelect: (option: SortOption) => void;
}

const RepositorySort = ({ selectedSort, onSelect }: Props) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        contentStyle={{
            backgroundColor: "white",
            borderRadius: 20,
        }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            <Text style={styles.buttonText}>{selectedSort.label}</Text>
          </Button>
        }
      >
        {sortOptions.map((option) => (
          <Menu.Item
            key={`${option.orderBy}-${option.orderDirection}`}
            onPress={() => {
              onSelect(option);
              closeMenu();
            }}
            title={option.label}
            leadingIcon={option.leadingIcon}
            titleStyle={{
               color: theme.colors.primary,
            }}
            
          />
        ))}
      </Menu>
    </View>
  );
};

export default RepositorySort;
export { sortOptions }; 