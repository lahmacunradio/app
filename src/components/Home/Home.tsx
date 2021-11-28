import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../Player/player';
import { useTrackPlayer } from '../Player/useTrackPlayer';
export const Home = () => {
  const { isPlaying, handlePlay, loadTrack, nowPlayingMetadata } =
    useTrackPlayer();

  // TODO: upcoming shows
  return (
    <View style={styles.homeWrapper}>
      <View style={styles.playerWrapper}>
        <Player {...{ isPlaying, handlePlay, loadTrack }} />
      </View>
      {nowPlayingMetadata && (
        <View style={styles.nowPlayingWrapper}>
          <Text style={styles.nowPlayingText}>NOW PLAYING</Text>
          <Text
            style={
              styles.nowPlayingContent
            }>{`${nowPlayingMetadata?.now_playing.song.artist} - ${nowPlayingMetadata?.now_playing.song.title}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  playerWrapper: {
    paddingTop: 50
  },
  nowPlayingWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15
  },
  nowPlayingText: {
    fontFamily: 'RoyalInferno',
    fontSize: 56
  },
  nowPlayingContent: {
    fontFamily: 'Rubik',
    fontSize: 24
  }
});
