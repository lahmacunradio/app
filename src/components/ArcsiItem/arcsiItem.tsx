import React from 'react';
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
      height: width
    },
    showItem: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 15
    },
    showName: {
      maxWidth: width,
      flexWrap: 'wrap',
      textAlign: 'center'
    }
  });

  return (
    <View style={styles.showItem}>
      <TouchableNativeFeedback
        onPress={() => props.nav.navigate('Shows', { show })}>
        <Image
          style={styles.coverImage}
          source={{
            uri: show.cover_image_url
          }}
        />
      </TouchableNativeFeedback>
      <Text style={styles.showName} adjustsFontSizeToFit>
        {show.name}
      </Text>
    </View>
  );
};
