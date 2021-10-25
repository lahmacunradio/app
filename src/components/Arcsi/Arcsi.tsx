import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { ArcsiItem } from '../ArcsiItem';
import { useArcsi } from './useArcsi';

export const Arcsi = (props: NativeStackScreenProps<any>) => {
  const { data: shows, isLoading } = useArcsi();
  const { width } = useWindowDimensions();
  const { navigation } = props;

  return (
    <View style={styles.wrapper}>
      {/* TODO: Loading GIF/something */}
      {(isLoading || !shows) && <Text>{'Loading...'}</Text>}
      <ScrollView contentContainerStyle={styles.showItemWrapper}>
        {shows &&
          shows.map((show, index) => (
            <ArcsiItem
              key={index}
              show={show}
              width={width / 2 - 60}
              nav={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  showItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '10%'
  },
  flatList: {
    display: 'flex',
    alignContent: 'space-between'
  }
});
