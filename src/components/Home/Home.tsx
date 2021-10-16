import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../Player/player';
import { useTrackPlayer } from '../Player/useTrackPlayer';
export const Home = () => {
  const { isPlaying, handlePlay, loadTrack, nowPlayingMetadata } =
    useTrackPlayer();

  return (
    <View>
      <Player {...{ isPlaying, handlePlay, loadTrack }} />
      <View style={styles.nowPlayingWrapper}>
        <Text>NOW PLAYING</Text>
        <Text>{`${nowPlayingMetadata?.now_playing.song.artist} - ${nowPlayingMetadata?.now_playing.song.title}`}</Text>
        <Text>NEXT UP</Text>
        <Text>{`${nowPlayingMetadata?.playing_next.song.artist} - ${nowPlayingMetadata?.playing_next.song.title}`}</Text>
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
