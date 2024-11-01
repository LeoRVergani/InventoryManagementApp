import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native"

export default function Filial() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Tela de Filial</Text>
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
