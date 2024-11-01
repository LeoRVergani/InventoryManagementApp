import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons"

export default function Header() {

    function handleLogout() {
        AsyncStorage.removeItem(userData)
        AsyncStorage.removeItem(profile)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        )
    }

    return (
        
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                height: 100,
                width: '100%',
                backgroundColor: '#9df0c5',
                borderTopLeftRadius: 30,
                borderBottomRightRadius: 30           
                }}>

                <View style={styles.icon}>
                <AntDesign name="user" size={40} color="#FFF" />
                </View>

                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'flex-end'      
                }}>                
                
                <Text style={{fontWeight: 'bold'}}>Olá, Admin</Text>
                
                <TouchableOpacity  onPress={handleLogout} style={styles.btnLogout}>
                    <Text style={styles.textLogout}>Sair</Text>
                </TouchableOpacity>
                </View>
                
                
            </View>
        
    )
}

const styles = StyleSheet.create({
    btnLogout: {
        backgroundColor: '#50CC8C',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    textLogout: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    icon: {
        backgroundColor: '#50CC8C',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
})