import { Platform, PixelRation } from 'react-native';

export function getPixelSize(pixels) {
  return Platform.select({
    ios: pixels,
    android: PixelRation.getPixelSizeForLayoultSize(pixels)
  })
}
