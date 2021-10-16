import { Capability, Track } from 'react-native-track-player';

export const LAHMACUN_PURPLE = '#d09cf8';

export const DEFAULT_TRACK: Track = {
  url: 'https://streaming.lahmacun.hu/radio/8000/radio.mp3',
  duration: 0
};

export const RADIO_CAPABILITIES = [
  Capability.Pause,
  Capability.Play,
  Capability.Stop
];

export const SHOW_CAPABILITES = [...RADIO_CAPABILITIES, Capability.SeekTo];
