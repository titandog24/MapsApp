

import { View, Text, StyleSheet, Pressable } from 'react-native'
import { usePermissionStore } from '../../store/permissions/usePermissionStore'

export const PermissionScreen = () => {

  const {locationStatus, requestLocaltionPermission} = usePermissionStore();


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <Text>Habilitar Ubicación</Text>
      <Pressable
        style={globalStyles.btnPrimary}
        onPress={requestLocaltionPermission}
       >
        <Text style={{color: 'white'}}>Habilitar localización</Text>
       </Pressable>

       <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}


const globalStyles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    margin: 10
  }
})