import axios, { Axios } from "axios"
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native"

    function handleLogin() {

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            email: email,
            password: password
        })
        .then((response) => {
            if(response.data.profile === "admin") {
                // navegue para tela HOME
            } else if (response.data.profile === "filial"){
                // navegue tela movimentação
            } else {
                // navegue tela movimentação dos motoristas
            }
        })
        .catch(() => {
            alert('Senha errada.')
        })
    }

export default function Login() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Tela de Login</Text>
                <Image 
                    source={require('../assets/caminhaoLogin.jpeg')}
                    style={{width: 200, height: 200}}
                />
            </View>
        </SafeAreaView>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
