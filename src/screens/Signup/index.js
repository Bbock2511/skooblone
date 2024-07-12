import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../../services/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../../redux/actions'
import { setUserLoadingAction } from '../../../redux/actions'
import { MaterialIcons } from '@expo/vector-icons'

import * as Font from 'expo-font'

const STATUSBAR_HEIGHT = Constants.statusBarHeight

const addDatabase = async (db, data) => {
    const usersRef = doc(db, 'users', auth.currentUser.uid)

    try {
        await setDoc(usersRef, {
            email: data.email.charAt(0).toLowerCase() + data.email.slice(1),
            userName: data.userName,
        })
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

const schema = yup.object({
    userName: yup.string().required('Nome de usuário é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup
        .string()
        .min(6, 'A senha deve conter no mínimo 6 dígitos')
        .required('Informe a senha'),
})

const Signup = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const [showPassword, setShowPassword] = useState(false)

    const { userLoading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        setUserLoadingAction(true, dispatch)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                addDatabase(db, data)
                setUserAction(
                    { email: data.email, uid: userCredential.user.uid },
                    dispatch
                )
            })
            .catch((error) => {
                if (error.code == 'auth/user-not-found') {
                    Alert.alert('Usuário não encontrado')
                } else if (error.code == 'auth/invalid-credential') {
                    Alert.alert(
                        'Credencais inválidas',
                        'Verifique se o email e senha estão corretos'
                    )
                } else if (error.code == 'auth/email-already-in-use') {
                    Alert.alert(
                        'Email já cadastrado',
                        'Esse email já está cadastrado no sistema'
                    )
                }
            })
            .finally(() => {
                setUserLoadingAction(false, dispatch)
            })
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Dancing-Script-Bold': require('../../../assets/fonts/DancingScript-Bold.ttf'),
            })
            setFontLoaded(true)
        }

        loadFonts()
    }, [])

    if (!fontLoaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../../../assets/Logo.png')}
                    style={{ width: 80, height: 80, alignSelf: 'center' }}
                />
                <Text style={styles.title}>Lendo no Vagão</Text>
                <Controller
                    control={control}
                    name="userName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: errors.userName && 'red' },
                            ]}
                            placeholder="Nome completo"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.userName && (
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'red',
                        }}
                    >
                        {errors.userName?.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: errors.email && 'red' },
                            ]}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && (
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'red',
                        }}
                    >
                        {errors.email?.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View
                            style={[
                                styles.passwordContainer,
                                {
                                    borderColor: errors.password
                                        ? 'red'
                                        : 'black',
                                },
                            ]}
                        >
                            <TextInput
                                style={{
                                    height: 50,
                                    width: '88%',
                                    padding: 10,
                                }}
                                placeholder="Senha"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={{
                                    height: '100%',
                                    justifyContent: 'center',
                                    borderTopEndRadius: 15,
                                    borderBottomEndRadius: 15,
                                    paddingEnd: 5,
                                }}
                                onPress={toggleShowPassword}
                            >
                                <MaterialIcons
                                    name={
                                        showPassword
                                            ? 'visibility-off'
                                            : 'visibility'
                                    } // Alterne entre os ícones de mostrar e ocultar
                                    size={22}
                                    color={showPassword ? 'gray' : 'black'} // Altere a cor do ícone com base no estado showPassword
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.password && (
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'red',
                        }}
                    >
                        {errors.password?.message}
                    </Text>
                )}

                {userLoading ? (
                    <View style={styles.loadingComponent}>
                        <ActivityIndicator size={'small'} color={'tomato'} />
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                    >
                        <Text style={{ color: '#F9F9F9' }}>Entrar</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text
                        style={{
                            color: '#517EF5',
                            textDecorationLine: 'underline',
                            marginTop: 5,
                        }}
                    >
                        Já possuo conta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8D49E',
    },
    card: {
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        width: '85%',
        justifyContent: 'center',
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Dancing-Script-Bold',
        marginBottom: 15,
        color: 'tomato',
        width: '100%',
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '70%',
        borderRadius: 15,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
    },
    submitButton: {
        backgroundColor: 'tomato',
        padding: 10,
        width: '50%',
        borderRadius: 20,
        marginTop: 15,
        alignItems: 'center',
    },
    loadingComponent: {
        padding: 10,
        width: '50%',
        borderRadius: 20,
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: '#FF634750',
        borderRadius: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        marginBottom: 10,
        borderWidth: 1,
        width: '70%',
        justifyContent: 'space-between',
        borderRadius: 15,
        height: 50,
        marginTop: 10,
    },
})

export default Signup
