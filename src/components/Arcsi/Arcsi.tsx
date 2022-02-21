import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
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
  const orderedShows = useMemo(() => {
    if (!shows) {
      return [];
    }
    return shows
      .filter(item => item.items?.length > 0)
      .sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'hu')
      );
  }, [shows]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        contentContainerStyle={styles.showItemWrapper}
        data={orderedShows}
        renderItem={({ item, index }) => (
          <ArcsiItem
            key={index}
            show={item}
            width={width - 60}
            nav={navigation}
          />
        )}
        ListHeaderComponent={
          isLoading || !shows ? (
            <Image source={require('../../../assets/img/spinner.gif')} />
          ) : (
            <Text style={styles.title}>Lahmacun Shows</Text>
          )
        }
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={3}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={100}
        windowSize={5}
      />
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
    marginTop: 50
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
