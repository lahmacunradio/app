import React, { PropsWithChildren, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PlayerProps, PLAYING_STATES } from './types';
import { RADIO_CAPABILITIES } from '@util/constants';
import TrackPlayer from 'react-native-track-player';

export const Player: React.FC<PlayerProps> = (
  props: PropsWithChildren<PlayerProps>
) => {
  const { handlePlay, loadTrack } = props;

  useEffect(() => {
    async function setup() {
      try {
        await TrackPlayer.setupPlayer({
          autoUpdateMetadata: true,
          waitForBuffer: true
        });
        await TrackPlayer.updateOptions({
          capabilities: RADIO_CAPABILITIES,
          stopWithApp: true
        });
      } catch (e) {
        console.log('track e:', e);
      }
    }
    setup();
  }, []);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={async () => {
        await loadTrack();
        await handlePlay(PLAYING_STATES.STATE_RADIO);
      }}>
      <Image
        source={require('../../../assets/img/dj-citrom-web.png')}
        style={styles.djcitrom}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center'
  },
  djcitrom: {
    width: 350,
    height: 550
  }
});
