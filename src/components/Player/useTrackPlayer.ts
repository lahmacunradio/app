import { useCallback, useEffect, useState } from 'react';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
  State
} from 'react-native-track-player';
import {
  DEFAULT_TRACK,
  groupedRadioCapabilities,
  groupedShowCapabilities
} from '../../util/constants';
import { NowPlayingMetadata, NowPlayingState, PLAYING_STATES } from './types';
import { delay } from '../../util/delay';

export const useTrackPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlayingMetadata, setNowPlayingMetadata] =
    useState<NowPlayingMetadata>();

  useTrackPlayerEvents(
    [Event.RemotePlay, Event.RemotePause, Event.RemoteStop, Event.RemoteSeek],
    async event => {
      try {
        const num = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(num);
        await handleRemoteEvent(
          event,
          track.url.toString() === DEFAULT_TRACK.url
            ? PLAYING_STATES.STATE_RADIO
            : PLAYING_STATES.STATE_SHOW
        );
      } catch (e) {
        console.log(e);
      }
    }
  );

  const loadTrack = useCallback(
    async (track?: Track) => {
      try {
        await TrackPlayer.reset();
        if (!track) {
          await TrackPlayer.updateOptions(groupedRadioCapabilities);
          await TrackPlayer.add({
            ...DEFAULT_TRACK,
            artist: nowPlayingMetadata?.now_playing.song.artist,
            title: nowPlayingMetadata?.now_playing.song.title,
            artwork: nowPlayingMetadata?.now_playing.song.art
          });
        } else {
          await TrackPlayer.updateOptions(groupedShowCapabilities);
          await TrackPlayer.add(track);
        }
      } catch (e) {
        console.log(e);
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
        ...groupedRadioCapabilities,
        stopWithApp: true
      });
    } catch (e) {
      console.log('track e:', e);
    }
  };

  const resetPlayer = useCallback(async () => {
    try {
      await TrackPlayer.destroy();
      await setup();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setState = useCallback(async () => {
    await delay(1000);
    const state = await TrackPlayer.getState();
    // TODO: playing states may differ between platforms?
    setIsPlaying(
      (state as unknown) === State.Playing ||
        (state as unknown) === State.Buffering ||
        (state as unknown) === 'loading' ||
        (state as unknown) === 'buffering' ||
        (state as unknown) === State.Connecting
    );
  }, [setIsPlaying]);

  const handlePlay = useCallback(
    async (nowPlayingState: NowPlayingState) => {
      try {
        await fetchNowPlayingMetadata();
        if (isPlaying && nowPlayingState === PLAYING_STATES.STATE_RADIO) {
          console.log('radio reset');
          await resetPlayer();
        } else if (isPlaying && nowPlayingState === PLAYING_STATES.STATE_SHOW) {
          console.log('pause');
          await TrackPlayer.pause();
        } else {
          console.log('play');
          await TrackPlayer.play();
        }
        await setState();
      } catch (e) {
        console.log(e);
      }
    },
    [isPlaying, resetPlayer, setState]
  );

  const fetchNowPlayingMetadata = async () => {
    try {
      const resp = await fetch(
        'https://streaming.lahmacun.hu/api/nowplaying/1',
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      );
      setNowPlayingMetadata(await resp.json());
    } catch (e) {
      console.log(JSON.stringify(e));
    }
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
