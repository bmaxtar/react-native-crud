//import liraries
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}-${month}-${year} - ${hrs}:${min}:${sec}`;
};
// create a component
const NoteDetail = (props) => {
    const [note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const {setNotes} = useNotes();
    const [showModal, setShowModal] = useState(false); 
    const [isEdit, setIsEdit] = useState(false);

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if(result !== null) notes = JSON.parse(result);

        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes); 
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    const displayDeleteAlert = () => {
        Alert.alert('Etes-vous sur', 'Cette action supprime votre note en permannce !', [
            {
                text: 'Delete',
                onPress: deleteNote,
            },
            {
                text: 'Non merci !',
                onPress: () => console.log('Non merci !'),
            }
        ], {
            cancelable: true,
        })
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);

        const newNotes = notes.filter(n => {
            if (n.id === note.id){
                n.title = title;
                n.desc = desc;
                n.isUpdated = true;
                n.time = time;

                setNote(n);
            }
            return n;
        });

        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    };

    const handleOnClose = () =>  setShowModal(false);

    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    };

    return (
        <>
        <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
            <Text style={styles.time}>{note.isUpdated 
             ? `Modifée le ${formatDate(note.time)}`
             : `Créée le ${formatDate(note.time)}`}</Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>
        <View style={styles.btnContainer}>
            <RoundIconBtn antIconName='delete' style={{backgroundColor: colors.ERROR, marginBottom: 15}}
            onPress={displayDeleteAlert}
            />
            <RoundIconBtn antIconName='edit' style={{backgroundColor: colors.ORANGE}} onPress={openEditModal} />
        </View>
        <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      // flex: 1,
       paddingHorizontal: 20,

    },
    title:{
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold',
    },
    desc:{
        fontSize: 20,
        opacity: 0.6, 
    },
    time:{
        textAlign: 'right',
        fontSize: 13,
        opacity: 0.5,
    },
    btnContainer:{
        position: 'absolute',
        right: 20,
        bottom: 30,
    },
});

//make this component available to the app
export default NoteDetail;
