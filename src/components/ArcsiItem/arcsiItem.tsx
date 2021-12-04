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
      height: width,
      maxHeight: 300,
      maxWidth: 500,
      overflow: 'hidden'
    },
    showItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 25,
      paddingHorizontal: '15%',
      maxWidth: 500
    },
    showName: {
      maxWidth: width,
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
    <View style={styles.showItem}>
      <TouchableNativeFeedback
        onPress={() => props.nav.navigate('Shows', { show })}>
        <View>
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
    </View>
  );
};
