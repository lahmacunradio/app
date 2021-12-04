import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { Player } from '../Player/player';
import { useTrackPlayer } from '../Player/useTrackPlayer';
export const Home = () => {
  const { isPlaying, handlePlay, loadTrack, nowPlayingMetadata } =
    useTrackPlayer();

  // TODO: upcoming shows
  return (
    <ScrollView contentContainerStyle={styles.homeWrapper}>
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
    </ScrollView>
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
    fontFamily: Platform.OS === 'android' ? 'Royal-Inferno' : 'RoyalInferno',
    fontSize: 56
  },
  nowPlayingContent: {
    fontFamily: 'Rubik',
    margin: 15,
    fontSize: 20
  }
});
