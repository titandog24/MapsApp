import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, onPress, style }: Props) => {

    return (
        <Pressable
            style={[styles.btn, style]}
            onPress={onPress}>
            <Text>
                <Icon name={iconName}
                    size={30}
                    color={'white'} />
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        zIndex: 100,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5
        },
        elevation: 5,
    }
})