import React, { useEffect } from 'react';
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
import RenderHtml from 'react-native-render-html';
import { useShowDetail } from './useShowDetail';

export const ShowDetail = (
  props: NativeStackScreenProps<StackParamList, 'Shows'>
) => {
  const { cover_image_url, description, name, archive_lahmastore_base_url } =
    props.route.params.show;
  const { width } = useWindowDimensions();
  const { items } = useShowDetail({
    showBaseUrl: archive_lahmastore_base_url
  });

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

  return (
    <FlatList
      contentContainerStyle={styles.wrapper}
      data={items}
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
          <Text style={styles.showDescription}>
            <RenderHtml source={{ html: description }} contentWidth={width} />
          </Text>
          <Text style={styles.showsHeader}>Shows</Text>
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
  showsHeader: {
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
