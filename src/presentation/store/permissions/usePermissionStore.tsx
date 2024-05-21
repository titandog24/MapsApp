import { create } from "zustand";
import type { PermissionStatus } from "../../../infraestructure/Interfaces/Permissions"
import { requestLocationPermission, checkLocationPermission } from '../../../actions/permissions/location';

interface PermissionsState {
    locationStatus: PermissionStatus

    requestLocaltionPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()( set =>({
    locationStatus: 'undetermined',

    requestLocaltionPermission: async () => {
        const status = await requestLocationPermission();

        set({locationStatus: status})

        return status;
    },

    checkLocationPermission: async () => {
        const status = await checkLocationPermission();

        set({locationStatus: status})

        return status;
    }
}))