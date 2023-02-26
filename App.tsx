import React, { ReactNode } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Home } from './src/components/Home';
import { Shows } from './src/components/Shows';
import { LAHMACUN_PURPLE } from './src/util/constants';
import { ShowDetail } from './src/components/ShowDetail/showDetail';
import { ShowEpisodeDetail } from './src/components/ShowEpisodeDetail/showEpisodeDetail';
import { Donate } from './src/components/Donate/Donate';

const App: () => ReactNode = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  const HomeScreen = () => (
    <Tab.Navigator
      sceneContainerStyle={styles.scrollView}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Radio" component={Home} options={radioTabOptions} />
      <Tab.Screen name="Shows" component={Shows} options={showsTabOptions} />
      <Tab.Screen name="Donate" component={Donate} options={donateTabOptions} />
    </Tab.Navigator>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View>
          <View style={styles.scrollView}>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="ShowDetail" component={ShowDetail} />
              <Stack.Screen name="Episode" component={ShowEpisodeDetail} />
            </Stack.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const RadioIcon = ({ focused }: { focused: boolean }) => (
  <Image
    style={{ ...styles.radioIcon, ...(!focused ? styles.inactive : '') }}
    source={require('./assets/img/lahmacun-logo.png')}
  />
);

const ShowsIcon = ({ focused }: { focused: boolean }) => (
  <Image
    style={{ ...styles.showsIcon, ...(!focused ? styles.inactive : '') }}
    source={require('./assets/img/vinyl-record.png')}
  />
);

const DonateIcon = ({ focused }: { focused: boolean }) => (
  <Image
    style={{ ...styles.donateIcon, ...(!focused ? styles.inactive : '') }}
    source={require('./assets/img/money.png')}
  />
);

const TabBar = () => <View style={styles.tabOptions} />;

const radioTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: RadioIcon,
  tabBarBackground: TabBar,
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#606060'
};

const showsTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ShowsIcon,
  tabBarBackground: TabBar,
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#606060'
};

const donateTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: DonateIcon,
  tabBarBackground: TabBar,
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#606060'
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 15
  },
  scrollView: {
    backgroundColor: LAHMACUN_PURPLE,
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  radioIcon: {
    width: 30,
    height: 25
  },
  showsIcon: {
    width: 30,
    height: 30
  },
  donateIcon: {
    width: 30,
    height: 30
  },
  inactive: {
    tintColor: '#606060'
  },
  tabOptions: {
    backgroundColor: LAHMACUN_PURPLE,
    width: '100%',
    height: '100%'
  }
});

export default App;
