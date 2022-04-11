import React, { FunctionComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SearchItemProps } from './types';

export const SearchItem: FunctionComponent<SearchItemProps> = ({
  value,
  setValue,
  searchFor
}) => (
  <TextInput
    style={styles.inputStyle}
    value={value}
    onChangeText={setValue}
    placeholder={`search for ${searchFor}...`}
    placeholderTextColor={'#575757'}
  />
);

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 25,
    height: 50,
    borderColor: '#8d8d8d',
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#e7e7e7',
    borderRadius: 10
  }
});
