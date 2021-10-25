import React, { PropsWithChildren, useMemo } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Show, ShowItem } from '../Arcsi/types';
import { useTrackPlayer } from '../Player/useTrackPlayer';
import { useShowEpisode } from './useShowEpisode';

export const ShowEpisode = (
  props: PropsWithChildren<{ item: ShowItem; show: Show }>
) => {
  const { description, image_url, name, id } = props.item;
  const { cover_image_url, name: showName } = props.show;
  // TODO get the canonical URL from backend
  const canonizedCoverUrl = useMemo(() => {
    const parts = cover_image_url.split('/');
    return `https://media.lahmacun.hu/${parts[3]}/${image_url}`;
  }, [image_url, cover_image_url]);

  const { loadTrack, handlePlay } = useTrackPlayer();

  const { onPlayClick } = useShowEpisode({
    id,
    canonizedCoverUrl,
    name,
    showName,
    loadTrack,
    handlePlay
  });

  return (
    <View style={styles.wrapper}>
      <Image style={styles.coverImage} source={{ uri: canonizedCoverUrl }} />
      <Text>{name}</Text>
      <Text style={styles.episodeDescription}>{description}</Text>
      <Button title={'Play'} onPress={async () => await onPlayClick()} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start'
  },
  coverImage: {
    width: 200,
    height: 200
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  episodeDescription: {
    maxWidth: 150
  }
});
