import { useCallback, useEffect, useState } from 'react';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
  State
} from 'react-native-track-player';
import {
  DEFAULT_TRACK,
  RADIO_CAPABILITIES,
  SHOW_CAPABILITES
} from '../../util/constants';
import { NowPlayingMetadata, NowPlayingState, PLAYING_STATES } from './types';

export const useTrackPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlayingMetadata, setNowPlayingMetadata] =
    useState<NowPlayingMetadata>();

  useTrackPlayerEvents(
    [Event.RemotePlay, Event.RemotePause, Event.RemoteStop, Event.RemoteSeek],
    async event => {
      const num = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(num);
      console.log(track);
      await handleRemoteEvent(
        event,
        track.url.toString() === DEFAULT_TRACK.url
          ? PLAYING_STATES.STATE_RADIO
          : PLAYING_STATES.STATE_SHOW
      );
    }
  );

  const loadTrack = useCallback(
    async (track?: Track) => {
      await TrackPlayer.reset();
      if (!track) {
        await TrackPlayer.updateOptions({
          capabilities: RADIO_CAPABILITIES
        });
        await TrackPlayer.add({
          ...DEFAULT_TRACK,
          artist: nowPlayingMetadata?.now_playing.song.artist,
          title: nowPlayingMetadata?.now_playing.song.title,
          artwork: nowPlayingMetadata?.now_playing.song.art
        });
      } else {
        await TrackPlayer.updateOptions({
          capabilities: SHOW_CAPABILITES
        });
        await TrackPlayer.add(track);
      }
    },
    [
      nowPlayingMetadata?.now_playing.song.art,
      nowPlayingMetadata?.now_playing.song.artist,
      nowPlayingMetadata?.now_playing.song.title
    ]
  );

  const setup = async () => {
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
  };

  const resetPlayer = useCallback(async () => {
    await TrackPlayer.destroy();
    await setup();
  }, []);

  const setState = useCallback(async () => {
    const state = await TrackPlayer.getState();
    // TODO: playing states may differ between platforms?
    setIsPlaying(
      (state as unknown) === State.Playing ||
        (state as unknown) === State.Buffering ||
        (state as unknown) === 'loading' ||
        (state as unknown) === State.Connecting
    );
  }, [setIsPlaying]);

  const handlePlay = useCallback(
    async (nowPlayingState: NowPlayingState) => {
      await fetchNowPlayingMetadata();
      if (isPlaying && nowPlayingState === PLAYING_STATES.STATE_RADIO) {
        await resetPlayer();
      } else if (isPlaying && nowPlayingState === PLAYING_STATES.STATE_SHOW) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      await setState();
    },
    [isPlaying, resetPlayer, setState]
  );

  const fetchNowPlayingMetadata = async () => {
    const resp = await fetch('https://streaming.lahmacun.hu/api/nowplaying/1');
    const json = await resp.json();
    setNowPlayingMetadata(json);
  };

  useEffect(() => {
    async function get() {
      await fetchNowPlayingMetadata();
    }
    get();
  }, []);

  const handleRemoteEvent = useCallback(
    async (
      event: { [key: string]: any; type: Event },
      state: NowPlayingState
    ) => {
      if (event.type === Event.RemoteStop) {
        await resetPlayer();
        setIsPlaying(false);
      }

      if (event.type === Event.RemotePause) {
        if (state === PLAYING_STATES.STATE_RADIO) {
          await resetPlayer();
        } else if (state === PLAYING_STATES.STATE_SHOW) {
          await TrackPlayer.pause();
        }
      }
      if (event.type === Event.RemotePlay) {
        if (state === PLAYING_STATES.STATE_RADIO) {
          await resetPlayer();
          await loadTrack();
        }
        await TrackPlayer.play();
      }
      if (event.type === Event.RemoteSeek) {
        await TrackPlayer.pause();
        await TrackPlayer.seekTo(Math.floor(event.position));
        await TrackPlayer.play();
      }
      await setState();
    },
    [loadTrack, resetPlayer, setState]
  );

  return {
    isPlaying,
    handlePlay,
    setIsPlaying,
    loadTrack,
    nowPlayingMetadata
  };
};
