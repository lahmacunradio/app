import { Capability, MetadataOptions, Track } from 'react-native-track-player';

export const LAHMACUN_PURPLE = '#d09cf8';

export const DEFAULT_TRACK: Track = {
  url: 'https://streaming.lahmacun.hu/radio/8000/radio.mp3'
};

export const RADIO_CAPABILITIES = [
  Capability.Pause,
  Capability.Play,
  Capability.Stop
];

export const SHOW_CAPABILITES = [...RADIO_CAPABILITIES, Capability.SeekTo];

export const groupedRadioCapabilities: MetadataOptions = {
  capabilities: RADIO_CAPABILITIES,
  notificationCapabilities: RADIO_CAPABILITIES,
  compactCapabilities: RADIO_CAPABILITIES
};

export const groupedShowCapabilities: MetadataOptions = {
  capabilities: SHOW_CAPABILITES,
  notificationCapabilities: SHOW_CAPABILITES,
  compactCapabilities: SHOW_CAPABILITES
};
