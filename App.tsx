import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
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

const App: () => ReactNode = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  const HomeScreen = () => (
    <Tab.Navigator
      sceneContainerStyle={styles.scrollView}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Radio" component={Home} options={radioTabOptions} />
      <Tab.Screen name="Arcsi" component={Arcsi} options={arcsiTabOptions} />
    </Tab.Navigator>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView>
          <View style={styles.scrollView}>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Shows" component={ShowDetail} />
            </Stack.Navigator>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const RadioIcon = () => (
  <Image
    style={styles.radioIcon}
    source={require('./assets/img/lahmacun-logo.png')}
  />
);

const ArcsiIcon = () => (
  <Image
    style={styles.arcsiIcon}
    source={require('./assets/img/vinyl-record.png')}
  />
);

const TabBar = () => <View style={styles.tabOptions} />;

const radioTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: RadioIcon,
  tabBarBackground: TabBar,
  tabBarActiveTintColor: '#000000'
};

const arcsiTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ArcsiIcon,
  tabBarBackground: () => <View style={styles.tabOptions} />,
  tabBarActiveTintColor: '#000000'
};

const styles = StyleSheet.create({
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
  arcsiIcon: {
    width: 30,
    height: 30
  },
  tabOptions: {
    backgroundColor: LAHMACUN_PURPLE,
    width: '100%',
    height: '100%'
  }
});

export default App;
