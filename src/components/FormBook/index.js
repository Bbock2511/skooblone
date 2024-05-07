import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import * as yup from 'yup'
import { db } from "../../../services/firebaseConfig"
import { useState } from "react"
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { set } from "firebase/database"

const schema = yup.object({
    title: yup.string().required('Título é obrigatório'),
    author: yup.string().required('Autor é obrigatório'),
    pages: yup.number().required('Número de páginas é obrigatório'),
    imageUrl: yup.string().required('Link de imagem é obrigatório'),
    resume: yup.string().required('Resumo é obrigatório'),
})

const FormBook = ({ setModalVisible, setRequest }) => {
    const [ bookLoading, setBookLoading ] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const verifyBook = async (db, title) => {
        const bookRef = query(collection(db, 'books'), where('title', '==', title))
        const snapshot = await getDocs(bookRef)

        if (snapshot.empty) {
            return false
        }
        else {
            return true
        }

    }

    const addBookDatabase = async (db, data) => {
        const bookExists = await verifyBook(db, data.title.charAt(0).toUpperCase() + data.title.slice(1))

        if (bookExists) {
            Alert.alert('Livro já cadastrado', 'Esse livro já está cadastrado no sistema')
        } else{

            const bookRef = doc(db, 'books', data.title.charAt(0).toUpperCase() + data.title.slice(1))
        
            try {
                await setDoc(bookRef, {
                    title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
                    author: data.author.charAt(0).toUpperCase() + data.author.slice(1),
                    pages: data.pages,
                    imageurl: data.imageUrl,
                    resume: data.resume.charAt(0).toUpperCase() + data.resume.slice(1),
                })
            } catch (error) {
                console.error("Error adding document: ", error)
            }
        }
    }

    const onSubmit = async (data) => {
        setBookLoading(true)
        await addBookDatabase(db, data)
        setBookLoading(false)
        setRequest(true)
        setModalVisible(false)
    }

    return ( 
        <View>
            <Controller 
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, {borderColor: errors.title && 'red'}]}
                        placeholder="Título"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.title && <Text
                style={{
                    alignSelf: 'center',
                    color: 'red'
                }}
                >
                    {errors.title?.message}
                </Text>
            }
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                <Controller 
                    control={control}
                    name="author"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, {borderColor: errors.author && 'red', width: '58%', marginRight: '2%'}]}
                            placeholder="Autor"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller 
                    control={control}
                    name="pages"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, {borderColor: errors.pages && 'red', width: '25%'}]}
                            placeholder="Páginas"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            inputMode="numeric"
                        />
                    )}
                />
                
            </View>

            {
                errors.author && <Text
                    style={{
                        alignSelf: 'center',
                        color: 'red'
                    }}
                    >
                        {errors.author?.message}
                    </Text>
            }

            {
                    errors.pages && <Text
                        style={{
                            alignSelf: 'center',
                            color: 'red'
                        }}
                        >
                        
                        {errors.pages?.message}
                        
                        </Text>
            }

            <Controller 
                control={control}
                name="imageUrl"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, {borderColor: errors.imageUrl && 'red'}]}
                        placeholder="Link da imagem"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )} 
            />
            {errors.imageUrl && <Text
                style={{
                    alignSelf: 'center',
                    color: 'red'
                }}
                >
                    {errors.imageUrl?.message}
                </Text>
            }

            <Controller 
                control={control}
                name="resume"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, {borderColor: errors.resume && 'red', minHeight: 80}]}
                        placeholder="Resumo"
                        multiline
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.resume && <Text
                style={{
                    alignSelf: 'center',
                    color: 'red'
                }}
                >
                    {errors.resume?.message}
                </Text>
            }

            {bookLoading ? 
                <View style={styles.loadingComponent}>
                    <ActivityIndicator size={'small'} color={'tomato'}/>
                </View>
                : 
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={{color: "#F9F9F9"}}>Adicionar</Text>
                </TouchableOpacity>
            }
            
        </View>
            
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '85%',
        borderRadius: 15,
        marginTop: 10,
        borderWidth: 1,
        padding: 5,
        alignSelf: 'center',
    },
    submitButton: {
        backgroundColor: 'tomato',
        padding: 10,
        alignSelf: 'center',
        width: '50%',
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
})

export default FormBook;