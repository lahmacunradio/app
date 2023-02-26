import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { ShowItem } from '../ShowItem/ShowItem';
import { useShows } from './useShows';
import { SearchItem } from '../SearchItem';

export const Shows = (props: NativeStackScreenProps<any>) => {
  const [searchText, setSearchText] = useState<string>('');
  const { isLoading, sections } = useShows({ searchText });
  const { width } = useWindowDimensions();
  const { navigation } = props;

  return (
    <View style={styles.wrapper}>
      <KeyboardAwareSectionList
        sections={sections}
        contentContainerStyle={styles.showItemWrapper}
        renderItem={({ item, index }) => (
          <ShowItem
            key={index}
            show={item}
            width={width - 60}
            nav={navigation}
          />
        )}
        ListHeaderComponent={
          isLoading || !sections[0].data ? (
            <Image source={require('../../../assets/img/spinner.gif')} />
          ) : (
            <View>
              <Text style={styles.title}>Lahmacun Shows</Text>
              <SearchItem
                value={searchText}
                setValue={setSearchText}
                searchFor={'shows'}
              />
            </View>
          )
        }
        renderSectionHeader={({ section }) =>
          section.data.length ? (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          ) : (
            <Text />
          )
        }
        stickySectionHeadersEnabled={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={3}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={100}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    marginTop: 50
  },
  sectionTitle: {
    fontFamily: 'Rubik',
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 25
  },
  showItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '10%'
  }
});
