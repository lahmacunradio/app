import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
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
      <ScrollView contentContainerStyle={styles.showItemWrapper}>
        <Text style={styles.title}>Lahmacun Shows</Text>
        {(isLoading || !shows) && (
          <Image source={require('../../../assets/img/spinner.gif')} />
        )}
        {shows &&
          shows.map((show, index) => (
            <ArcsiItem
              key={index}
              show={show}
              width={width - 60}
              nav={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    marginTop: '10%'
  },
  showItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '10%'
  }
});
