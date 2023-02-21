import React from 'react';
import Picture from './Picture';
import {StyleSheet, FlatList, View} from 'react-native';

const ImageList = ({list}) => {
  return (
    <View style={styles.list}> 
      <FlatList
        data={list}
        renderItem={({item}) => <Picture item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
});

export default ImageList;
