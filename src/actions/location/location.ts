import Geolocation from "@react-native-community/geolocation";
import { Location } from "../../infraestructure/Interfaces/Location";


export const getCurrectPosition = async (): Promise<Location> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
            resolve({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        }, (err) => {
            console.log(err);
            reject(err.message)
        }, {
            enableHighAccuracy: true,
        });
    })
}

export const watchCurrentLocation = (locationCallback: (location: Location) => void): number => {

    return Geolocation.watchPosition(info => {
        locationCallback({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
        })
    }, (err) => {
        console.log(err);
    }, {
        enableHighAccuracy: true,
    });
}

export const clearWatchLocation = (watchId: number) => {
    Geolocation.clearWatch(watchId);
}