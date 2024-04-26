import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useLoading } from '../context/LoadingProvider';
import { HttpService } from '../service/http.service';
import { arrayBufferToBase64 } from '../utils/buffer';

export function useSaveFile() {

  const { setIsLoading } = useLoading()
  const saveFile = async (base: string, filename: string, url: string) => {
    const path = `${FileSystem.documentDirectory}${filename}`;
    try {
      const file = await new HttpService().get(url, { responseType: 'arraybuffer' })
      const base64 = arrayBufferToBase64(file.data)
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
        // FileSystem.getContentUriAsync(path).then(cUri => {
        //   IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        //     data: cUri,
        //     flags: 1,
        //     type: 'application/jpg'
        //   });
        // });
      } else {
        console.error('Permission not granted')
      }
      await Sharing.shareAsync(path);
    } catch (e) {
      console.error(e);
    } finally {
      // setIsLoading(false)
    }
  };

  return { saveFile };
}
