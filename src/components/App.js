import React, {useEffect, useState} from 'react';
import ImageList from './ImageList';

import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [imageData, setImageData] = useState([]);

  const fetchImageData = async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list');
      const json = await response.json();
      setImageData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ImageList list={imageData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
