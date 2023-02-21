import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {CreativeKit} from '@snapchat/snap-kit-react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Picture = ({item}) => {

  return (
    <TouchableOpacity
      style={styles.picture}
      onPress={() => {
        const photoUrl = item.download_url;
        console.log('photourl', photoUrl)

        if (isValidHttpUrl(photoUrl)) {
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
          })
            .fetch('GET', photoUrl)
            .then(res => {
                console.log('res', res)
                shareImageToSnapchat(`file://${res.data}`);
            });
        } else {
            shareImageToSnapchat(photoUrl);
        }
      }}>
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

const shareImageToSnapchat = url => {

  const photoContent = {
    content: {
      uri: url,
    },
    caption: 'caption string',
    attachmentUrl: '',
  };
  CreativeKit.sharePhoto(photoContent)
    .then(() => {
      console.log('shared');
    })
    .catch(error => {
      console.log('error', error);
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
