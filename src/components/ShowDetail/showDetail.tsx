import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/routeTypes';
import { ShowEpisode } from '../ShowEpisode';
import { LAHMACUN_PURPLE } from '../../util/constants';

export const ShowDetail = (
  props: NativeStackScreenProps<StackParamList, 'Shows'>
) => {
  const { cover_image_url, description, name, items } = props.route.params.show;

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Image style={styles.coverImage} source={{ uri: cover_image_url }} />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>EPISODES</Text>
      <View>
        {items.map((item, index) => (
          <ShowEpisode item={item} key={index} show={props.route.params.show} />
        ))}
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
    backgroundColor: LAHMACUN_PURPLE
  },
  coverImage: {
    width: 300,
    height: 300,
    marginTop: 25
  },
  episodeWrapper: {
    marginTop: 20
  }
});
