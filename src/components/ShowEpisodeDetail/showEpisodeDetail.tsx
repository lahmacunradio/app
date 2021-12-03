import React, { useCallback, useEffect, useState } from 'react';
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
import TrackPlayer from 'react-native-track-player';
import { isStatePlaying } from '../../util/isStatePlaying';

export const ShowEpisodeDetail = (
  props: NativeStackScreenProps<StackParamList, 'Episode'>
) => {
  const {
    episode: { description, name, id },
    url,
    showName
  } = props.route.params;

  const [isPlaying, setIsPlaying] = useState(false);

  const { loadTrack, handlePlay } = useTrackPlayer();

  const { onPlayClick, url: showUrl } = useShowEpisode({
    id,
    canonizedCoverUrl: url,
    name,
    showName,
    loadTrack,
    handlePlay
  });

  const getIsPlaying = useCallback(async () => {
    const position = await TrackPlayer.getCurrentTrack();
    if (typeof position !== 'number') {
      setIsPlaying(false);
      return;
    }
    const state = await TrackPlayer.getState();
    const track = await TrackPlayer.getTrack(position);
    if (track) {
      setIsPlaying(track.url === showUrl && isStatePlaying(state));
      return;
    }
    setIsPlaying(false);
  }, [showUrl]);

  useEffect(() => {
    props.navigation.setOptions({ title: name });
  }, [name, props.navigation]);

  useEffect(() => {
    getIsPlaying();
  });

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.content}>
        <Image source={{ uri: url }} style={styles.coverImage} />
        <Text style={styles.episodeDescription}>{description}</Text>
        <Button
          title={isPlaying ? 'Pause Episode' : 'Play Episode'}
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
