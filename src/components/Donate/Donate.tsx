import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Linking,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';

export const Donate = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.painting}
        onPress={() => Linking.openURL('https://lahmacun.hu/donate/')}>
        <Image
          style={{ width, height: width / 1.77, resizeMode: 'contain' }}
          source={require('../../../assets/img/creation-of-money.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Wanna support us?</Text>
      <View style={styles.description}>
        <Text>Geil! We need money to maintain Lahmacun radio.{'\n'}</Text>
        <Text>
          Server costs and studio rent both increased and we need Your help now
          more than ever.{'\n'}
        </Text>
        <Text>
          Touch the beautiful painting above or press the button below to
          donate.
        </Text>
      </View>
      <Button
        title={'DONATE'}
        onPress={() => Linking.openURL('https://lahmacun.hu/donate/')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  painting: {
    marginTop: 100
  },
  title: {
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: '10%',
    marginBottom: 75
  }
});
