import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/routeTypes';
import { ShowEpisode } from '../ShowEpisode';
import { LAHMACUN_PURPLE } from '../../util/constants';

export const ShowDetail = (
  props: NativeStackScreenProps<StackParamList, 'Shows'>
) => {
  const { cover_image_url, description, name, items } = props.route.params.show;

  useEffect(
    () => props.navigation.setOptions({ title: name }),
    [name, props.navigation]
  );

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <Image style={styles.coverImage} source={{ uri: cover_image_url }} />
        <Text style={styles.showName}>{name}</Text>
        <Text style={styles.showDescription}>{description}</Text>
        <Text style={styles.arcsived}>Arcsived Shows</Text>
        <View style={styles.separator} />
        <View style={styles.episodeWrapper}>
          {items.map((item, index) => (
            <View style={styles.episodeContent} key={index}>
              <ShowEpisode item={item} show={props.route.params.show} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  coverImage: {
    width: 360,
    maxWidth: 360,
    height: 360,
    marginTop: 25,
    alignSelf: 'center'
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
  },
  episodeContent: {
    marginTop: 30
  }
});
