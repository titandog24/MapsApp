


import { PropsWithChildren, useEffect } from 'react'
import { View, Text, AppState } from 'react-native'
import { usePermissionStore } from '../store/permissions/usePermissionStore'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecked = ({ children }: PropsWithChildren) => {

  const { locationStatus, checkLocationPermission } = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {

      return navigation.reset({
        routes: [{ name: 'MapsScreen' }]
      });

    } else if (locationStatus === 'undetermined') {
      return navigation.reset({
        routes: [{ name: 'PermissionScreen' }]
      });
    }
  }, [locationStatus])

  useEffect(() => {
    checkLocationPermission();
  }, [])


  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    }
  }, [])



  return children
}

