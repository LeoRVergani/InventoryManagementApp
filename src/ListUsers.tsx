import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native"

export default function ListUsers() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Tela de lista de usuários</Text>
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
