
import { View, StyleSheet } from 'react-native';
import { Map } from '../../components/Maps/Map';
import { useLocationStore } from '../../store/location/useLocationState';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect } from 'react';

export const MapsScreen = () => {

  const {lastKnowLocation, getLocation} = useLocationStore();

  useEffect(() => {
    if (lastKnowLocation === null) {
      getLocation();
    }
  }, [])
  

  if (lastKnowLocation === null) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
     <Map initialLocation={lastKnowLocation} />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
 });