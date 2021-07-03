import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

// create a component
const NoteInputModal = ({visible, onClose, onSubmit, note, isEdit}) => {
    const[title, setTitle] = useState('');
    const[desc, setDesc] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
       if(isEdit){
           setTitle(note.title)
           setDesc(note.desc)
       }
    }, [isEdit]);

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesc(text);
    };

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();

        if (isEdit){
        //for edit
        onSubmit(title, desc, Date.now());
        } else{
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    };

    const closeModal = () => {
        if (!isEdit){
            setTitle('');
            setDesc('');
        }
        onClose();
    };

    return (
    <>
    <StatusBar hidden />
    <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
        <TextInput value={title} placeholder='Titre' style={[styles.input, styles.title]} onChangeText={(text) => handleOnChangeText(text, 'title')} />
        <TextInput value={desc} multiline placeholder='Note' style={[styles.input, styles.desc]} onChangeText={(text) => handleOnChangeText(text, 'desc')}  />
        </View>
        <View style={styles.btnContainer}>
        <RoundIconBtn size={15} antIconName='check' onPress={handleSubmit} />
        { title.trim() || desc.trim() ?
        (<RoundIconBtn size={15} style={{marginLeft: 15}} antIconName='close' onPress={closeModal} />): null
        }
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
    </Modal>
    </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    desc:{
        height: 100,

    },
    modalBG:{
        flex: 1,
        zIndex: -1,
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
});

//make this component available to the app
export default NoteInputModal;
