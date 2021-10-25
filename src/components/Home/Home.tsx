import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../Player/player';
import { useTrackPlayer } from '../Player/useTrackPlayer';
export const Home = () => {
  const { isPlaying, handlePlay, loadTrack, nowPlayingMetadata } =
    useTrackPlayer();

  // TODO: upcoming shows
  return (
    <View>
      <Player {...{ isPlaying, handlePlay, loadTrack }} />
      <View style={styles.nowPlayingWrapper}>
        <Text>NOW PLAYING</Text>
        <Text>{`${nowPlayingMetadata?.now_playing.song.artist} - ${nowPlayingMetadata?.now_playing.song.title}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlayingWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
});
