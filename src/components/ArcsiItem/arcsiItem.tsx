import React, { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { ShowItemProps } from './types';

export const ArcsiItem = (props: ShowItemProps) => {
  const { show, width } = props;
  const styles = StyleSheet.create({
    coverImage: {
      width: width,
      height: Math.min(width, 300),
      maxHeight: 600,
      maxWidth: 500,
      alignSelf: 'center'
    },
    showItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 25,
      marginHorizontal: '15%',
      maxWidth: 500
    },
    showName: {
      maxWidth: 500,
      flexWrap: 'wrap',
      backgroundColor: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10
    },
    showDetails: {
      fontFamily: 'Rubik',
      backgroundColor: 'white',
      padding: 20
    }
  });

  const showDescription = useMemo(
    () =>
      show.description.length >= 300
        ? show.description.slice(0, 300) + '...'
        : show.description,
    [show.description]
  );

  return (
    <TouchableNativeFeedback
      onPress={() => props.nav.navigate('Shows', { show })}>
      <View style={styles.showItem}>
        <Image
          style={styles.coverImage}
          source={{
            uri: show.cover_image_url
          }}
        />
        <View style={styles.showDetails}>
          <Text style={styles.showName} adjustsFontSizeToFit>
            {show.name}
          </Text>
          <Text>{showDescription}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
