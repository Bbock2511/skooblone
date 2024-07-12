import { Image, Text, TouchableOpacity, View } from "react-native"


const SplashScreen = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10}}>
                <Image source={require('../../assets/Logo.png')} style={{width: 80, height: 80, resizeMode: 'contain'}}/>
                <View style={{width: 2, height: 60, backgroundColor: 'tomato'}}/>
                <View style={{width: '60%'}}>
                    <Text style ={{}}>A leitura é uma porta aberta para um mundo de descobertas sem fim.</Text>
                    <Text style={{color: 'grey'}}>Sandro Costa</Text>

                </View>
            </View>
            <TouchableOpacity style={{width: '50%', height: 40, borderRadius: 20, backgroundColor: 'tomato',
                justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{color: '#efefef'}}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen