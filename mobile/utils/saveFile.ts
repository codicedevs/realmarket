import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as MediaLibrary from 'expo-media-library';
import FileViewer from 'react-native-file-viewer';
import { HttpService } from '../service/http.service';
import { arrayBufferToBase64 } from '../utils/buffer';
var RNFS = require('react-native-fs');

export async function saveFilejpg(base64: string, filename: string) {
  const path = `${FileSystem.documentDirectory}${filename}`
  try {
    await FileSystem.writeAsStringAsync(path, base64, { encoding: FileSystem.EncodingType.Base64 });
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(path);
      const album = await MediaLibrary.getAlbumAsync('Documentos');
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync('Documentos', asset, false);
      }
      FileSystem.getContentUriAsync(path).then(cUri => {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: cUri,
          flags: 1,
          type: 'application/pdf'
        });
      });

      return `${FileSystem.documentDirectory}${filename}`
    }
  } catch (e) {
    console.error(e)
  }
}

export const saveFilePdf = async (base: string, filename: string, url: string) => {
  const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
  try {
    const file = await new HttpService().get(url, { responseType: 'arraybuffer' });
    const base64 = arrayBufferToBase64(file.data);
    await RNFS.writeFile(path, base64, 'base64')
      .then(() => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
    // Intenta abrir el archivo guardado con una aplicación
    FileViewer.open(path)
      .then(() => {
      })
      .catch(error => {
        console.error(error);
      });
  } catch (e) {
    console.error(e);
  }
};