import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Location } from '../../../infraestructure/Interfaces/Location';
import { FAB } from '../ui/FAB';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationState';

interface Props {
    showsUserLocation?: boolean,
    initialLocation: Location
}

export const Map = ({ showsUserLocation = true, initialLocation }: Props) => {

    const mapREF = useRef<MapView>();
    const cameraLocation = useRef<Location>(initialLocation);
    const [isUserWatchLocation, setisUserWatchLocation] = useState(true)
    const [isShowThePolyLine, setisShowThePolyLine] = useState(false)

    const { getLocation, lastKnowLocation, watchLocation, clearWatchLocation
    ,userLocations } = useLocationStore();

    const moveCamaraToLocation = (location: Location) => {
        if (!mapREF.current) return;
        mapREF.current.animateCamera({ center: location })
    }

    const moveToCurrentLocation = async () => {
        if (!lastKnowLocation) {
            moveCamaraToLocation(initialLocation);
        }
        const location = await getLocation();
        if (!location) return;

        moveCamaraToLocation(location);
    }

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        }
    }, [])

    useEffect(() => {
        if (lastKnowLocation && isUserWatchLocation) {
            moveCamaraToLocation(lastKnowLocation);
        }
    }, [lastKnowLocation, isUserWatchLocation])


    return (
        <>
            <MapView
                ref={(map) => mapREF.current = map!}
                showsUserLocation={showsUserLocation}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                onTouchStart={() => setisUserWatchLocation(false)}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                   {
                    isShowThePolyLine &&
                    <Polyline coordinates={userLocations}
                    strokeColor='blue'
                    strokeWidth={5} />
                   }
                {/* <Marker title='Es el titulo del marcador'
                    description='Es la descripcion del marcador'
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }} 
                    image={require('../../../assets/marker.png')}/> */}
            </MapView>
            <FAB
                iconName={(!isShowThePolyLine) ? 'eye-outline' : 'eye-off-outline'}
                onPress={()=> setisShowThePolyLine(!isShowThePolyLine)}
                style={{
                    bottom: 140,
                    right: 20
                }}
            />
            <FAB
                iconName={(!isUserWatchLocation) ? 'walk-outline' : 'accessibility-outline'}
                onPress={()=> setisUserWatchLocation(!isUserWatchLocation)}
                style={{
                    bottom: 80,
                    right: 20
                }}
            />
            <FAB
                iconName='compass-outline'
                onPress={moveToCurrentLocation}
                style={{
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});