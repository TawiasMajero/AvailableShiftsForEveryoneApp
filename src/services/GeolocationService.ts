import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';

export async function getLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos =>
              resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            err => reject(err),
            { enableHighAccuracy: true },
          );
        } else {
          reject('Permission denied');
        }
      });
    } else {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        err => reject(err),
        { enableHighAccuracy: true },
      );
    }
  });
}
