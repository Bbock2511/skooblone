import { useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import sortearFrase from "../../functions/sortPhrase";


const SplashScreen = ({ navigation }) => {
    const [frase, setFrase] = useState({});

    useEffect(() => {
        setFrase(sortearFrase())
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Image source={require('../../assets/Logo.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                <View style={{ width: 2, height: 60, backgroundColor: 'tomato' }} />
                <View style={{ width: '60%' }}>
                    <Text style={{}}>{frase.frase}</Text>
                    <Text style={{ color: 'grey' }}>{frase.autor}</Text>

                </View>
            </View>
            <TouchableOpacity style={{
                width: '50%', height: 40, borderRadius: 20, backgroundColor: 'tomato',
                justifyContent: 'center', alignItems: 'center'
            }}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{ color: '#efefef' }}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen