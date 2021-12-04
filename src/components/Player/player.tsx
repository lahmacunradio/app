import React, { PropsWithChildren, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PlayerProps, PLAYING_STATES } from './types';
import { groupedRadioCapabilities } from '../../util/constants';
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
          ...groupedRadioCapabilities,
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
      <Image source={image} defaultSource={image} style={styles.djcitrom} />
    </TouchableOpacity>
  );
};

const image = require('../../../assets/img/dj-citrom-web.png');

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: 250,
    height: 250 * 1.572
  },
  djcitrom: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
