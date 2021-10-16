import React, { ReactNode, useContext, useReducer } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Home } from './src/components/Home';
import { Arcsi } from './src/components/Arcsi';
import { LAHMACUN_PURPLE } from './src/util/constants';
import { ShowDetail } from './src/components/ShowDetail/showDetail';
import { NowPlayingState, PLAYING_STATES } from './src/components/Player/types';
import playingStateReducer from './src/util/playingStateReducer';

export const PlayingStateContext = React.createContext({
  nowPlayingState: { state: PLAYING_STATES.STATE_RADIO },
  dispatch: (value: any) => {
    return;
  }
});

const App: () => ReactNode = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();
  const [nowPlayingState, dispatch] = useReducer(playingStateReducer, {
    state: 0
  });

  const HomeScreen = () => (
    <Tab.Navigator
      sceneContainerStyle={styles.scrollView}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Radio" component={Home} options={radioTabOptions} />
      <Tab.Screen name="Arcsi" component={Arcsi} options={arcsiTabOptions} />
    </Tab.Navigator>
  );

  return (
    <PlayingStateContext.Provider value={{ nowPlayingState, dispatch }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.scrollView}>
              <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Shows" component={ShowDetail} />
              </Stack.Navigator>
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </PlayingStateContext.Provider>
  );
};

const radioIcon = () => {
  return (
    <Image
      style={{
        width: 30,
        height: 25
      }}
      source={require('./assets/img/lahmacun-logo.png')}
    />
  );
};

const arcsiIcon = () => {
  return (
    <Image
      style={{
        width: 30,
        height: 30
      }}
      source={require('./assets/img/vinyl-record.png')}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: LAHMACUN_PURPLE,
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white,
    height: '100%',
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    height: 600,
    width: 600
  },
  icon: {
    width: 200,
    height: 200
  }
});

const radioTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: radioIcon,
  tabBarBackground: () => (
    <View
      style={{
        backgroundColor: LAHMACUN_PURPLE,
        width: '100%',
        height: '100%'
      }}
    />
  ),
  tabBarActiveTintColor: '#000000'
};

const arcsiTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: arcsiIcon,
  tabBarBackground: () => (
    <View
      style={{
        backgroundColor: LAHMACUN_PURPLE,
        width: '100%',
        height: '100%'
      }}
    />
  ),
  tabBarActiveTintColor: '#000000'
};

export default App;
