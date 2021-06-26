import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';

const reverseData = date => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if(aInt , bInt) return 1;
        if(aInt == bInt) return 0;
        if(aInt > bInt) return -1;
    });
};

const NoteScreen = ({user, navigation}) => {
    const [greet, setGreet] = useState('jour');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);
    const {notes, setNotes, findNotes} = useNotes();

    const findGreet = () => {
        const hrs = new Date().getHours();

        if(hrs === 0 || hrs < 12) return setGreet('jour');
        if(hrs === 1 || hrs < 17) return setGreet (' après midi');
        if(hrs === 1 || hrs > 17) return setGreet('soir');

    };

    useEffect(() => {
        findGreet();

    }, []);

    const reverseNotes = reverseData(notes);

    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now()};
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
                
    };

    const openNote = (note) => {
        navigation.navigate('NoteDetail', { note });
    };

    const handleOnSearchInput = async text => {
        setSearchQuery(text);
        if(!text.trim()){
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes();
        }

        const filteredNotes = notes.filter(note => {
            if(note.title.toLowerCase().includes(text.toLowerCase())){
                return note;
            }
        });

        if(filteredNotes.length){
            setNotes([...filteredNotes]);
        } else{
            setResultNotFound(true);
        }
    };

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
    };

    return (
        <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={StyleSheet.container}>
            <Text style={styles.header}>{`Bon${greet} ${user.name}`}</Text>
            {notes.length ?(
                <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} containerStyle={{ marginVertical: 15 }}
                onClear={handleOnClear} />
            ): null}

            {resultNotFound ? <NotFound/> : <FlatList data={reverseNotes}
             numColumns={2}
            columnWrapperStyle={{
                justifyContent: 'space-between',
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
                <Note onPress={() => openNote(item)} item={item} />)}
            />}

        {!notes.length ? (
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <View style={[StyleSheet.absoluteFillObject ,styles.emptyHeaderContainer]}>
           <Text style={styles.emptyHeader}>Ajouter Notes</Text>
           </View>
           </TouchableWithoutFeedback>
        ): null}
        </View>
        </TouchableWithoutFeedback>

     

        <RoundIconBtn onPress={() => setModalVisible(true)} antIconName='plus' style={styles.addBtn} />

        <NoteInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit} />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        marginTop: 10,
    },

    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },

    emptyHeader: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
        marginTop: 600,
    },

    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,

    },
    addBtn: {
        position: 'absolute',
        right: 25,
        bottom: 50,
        zIndex: 1,
    },
});

export default NoteScreen;