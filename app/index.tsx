import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const Page = () => {
  const [scannedImage, setScannedImage] = useState<string[]>([]);

  const scanDocument = async () => {
    const {scannedImages} = await DocumentScanner.scanDocument();

    if (scannedImages && scannedImages.length > 0) {
      setScannedImage((s) => [...s, ...scannedImages]);
    }

    console.log('scannedImages', scannedImages);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Scan Document" onPress={scanDocument} />
      <FlatList
        data={scannedImage}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={{
              width: '100%',
              height: 300,
              backgroundColor: '#000',
            }}
            resizeMode="contain"
          />
        )}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
