import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LAHMACUN_PURPLE } from '../../util/constants';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Button
} from 'react-native';
import { StackParamList } from '../../types/routeTypes';
import { useShowEpisode } from '../ShowEpisode/useShowEpisode';
import { useTrackPlayer } from '../Player/useTrackPlayer';

export const ShowEpisodeDetail = (
  props: NativeStackScreenProps<StackParamList, 'Episode'>
) => {
  const {
    episode: { description, name, id },
    url,
    showName
  } = props.route.params;

  const { loadTrack, handlePlay } = useTrackPlayer();

  const { onPlayClick } = useShowEpisode({
    id,
    canonizedCoverUrl: url,
    name,
    showName,
    loadTrack,
    handlePlay
  });

  useEffect(
    () => props.navigation.setOptions({ title: name }),
    [name, props.navigation]
  );

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.content}>
        <Image source={{ uri: url }} style={styles.coverImage} />
        <Text style={styles.episodeDescription}>{description}</Text>
        <Button
          title={'Play Episode'}
          onPress={async () => await onPlayClick()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: LAHMACUN_PURPLE
  },
  content: {
    width: '90%',
    alignSelf: 'center'
  },
  coverImage: {
    width: 360,
    height: 360,
    alignSelf: 'center',
    marginTop: 20
  },
  episodeDescription: {
    marginTop: 15
  }
});
