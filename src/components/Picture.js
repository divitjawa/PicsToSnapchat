import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const Picture = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.picture}
      onPress={() => shareImageToSnapchat(item.download_url)}>
      <Image source={{uri: item.download_url}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>Author: {item.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const isValidHttpUrl = url => {
  let test;
  try {
    test = new URL(url);
  } catch (_) {
    return false;
  }

  return url.startsWith('https:') || url.startsWith('http:');
};

const shareImageToSnapchat = photoUrl => {
  console.log('url', photoUrl);

  let imagePath = null;

  const fs = RNFetchBlob.fs;
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', 'https://fastly.picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I')
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      // here's base64 encoded image
      // var base64Data = `data:image/jpg;base64,` + base64Data;
      // imagePath = base64Data;
      try {
        const shareResponse = await Share.open({
          message: 'test',
          url: 'file://' + imagePath,
        });
      } catch (error) {
        console.log('error', error);
      }
      // remove the file from storage
      return RNFetchBlob.fs.unlink(imagePath);
    });
};

const styles = StyleSheet.create({
  picture: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});

export default Picture;
