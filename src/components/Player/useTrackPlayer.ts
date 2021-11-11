import { getIsPlaying } from '@util/getPlayingState';
import { useCallback, useEffect, useState } from 'react';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event
} from 'react-native-track-player';
import { useSetRecoilState } from 'recoil';
import { nowPlayingAtom } from 'src/state/atoms';
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
  const setNowPlayingState = useSetRecoilState(nowPlayingAtom);
  // const ads = useReco

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
        setNowPlayingState({ url: String(DEFAULT_TRACK.url) });
      } else {
        await TrackPlayer.updateOptions({
          capabilities: SHOW_CAPABILITES
        });
        await TrackPlayer.add(track);
        setNowPlayingState({ url: String(track.url) });
      }
    },
    [
      nowPlayingMetadata?.now_playing.song.art,
      nowPlayingMetadata?.now_playing.song.artist,
      nowPlayingMetadata?.now_playing.song.title,
      setNowPlayingState
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

  const setState = useCallback(
    async (playerState: NowPlayingState) => {
      const state = await TrackPlayer.getState();
      const isPlayingState = getIsPlaying(state);
      // TODO: playing states may differ between platforms?
      setIsPlaying(isPlayingState);
      setNowPlayingState({
        isPlaying: isPlayingState,
        nowPlayingState: playerState
      });
    },
    [setNowPlayingState]
  );

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
      await setState(nowPlayingState);
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
      await setState(state);
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
