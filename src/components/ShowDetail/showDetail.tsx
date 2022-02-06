import React, { useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/routeTypes';
import { ShowEpisode } from '../ShowEpisode';
import { LAHMACUN_PURPLE } from '../../util/constants';

export const ShowDetail = (
  props: NativeStackScreenProps<StackParamList, 'Shows'>
) => {
  const { cover_image_url, description, name, items } = props.route.params.show;

  const { width } = useWindowDimensions();

  const coverImageStyle: StyleSheet.NamedStyles<any> = {
    coverImage: {
      width: width - 60,
      maxWidth: 500,
      height: 300,
      marginTop: 25,
      alignSelf: 'center'
    }
  };

  const styles = StyleSheet.create({
    ...otherStyles,
    ...coverImageStyle
  });

  useEffect(() => {
    props.navigation.setOptions({ title: name });
  }, [name, props.navigation, items]);

  const orderedItems = useMemo(() => {
    const availableItems = items.filter(item => {
      const playDate = new Date(item.play_date);
      return item.archived && playDate < new Date();
    });
    return availableItems.sort((a, b) => {
      const dateA = new Date(a.play_date).getTime();
      const dateB = new Date(b.play_date).getTime();
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
  }, [items]);

  return (
    <FlatList
      contentContainerStyle={styles.wrapper}
      data={orderedItems}
      renderItem={({ item, index }) => (
        <ShowEpisode item={item} show={props.route.params.show} key={index} />
      )}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={true}
      initialNumToRender={3}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={100}
      windowSize={5}
      ListHeaderComponent={
        <View>
          <Image style={styles.coverImage} source={{ uri: cover_image_url }} />
          <Text style={styles.showName}>{name}</Text>
          <Text style={styles.showDescription}>{description}</Text>
          <Text style={styles.arcsived}>Arcsived Shows</Text>
          <View style={styles.separator} />
        </View>
      }
      ListHeaderComponentStyle={styles.content}
    />
  );
};

const otherStyles: StyleSheet.NamedStyles<any> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LAHMACUN_PURPLE,
    fontFamily: 'Rubik'
  },
  content: {
    width: '90%',
    marginHorizontal: 'auto'
  },
  showName: {
    fontWeight: '700',
    fontSize: 36,
    marginVertical: 25
  },
  showDescription: {
    marginBottom: 25
  },
  arcsived: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center'
  },
  separator: {
    borderBottomWidth: 1,
    height: 1,
    width: '100%'
  },
  episodeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  }
};
