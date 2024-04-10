import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export async function saveFile(base64: string, filename: string) {
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
      console.log('guardado')
    }
  } catch (e) {
    console.error(e)
  }
}