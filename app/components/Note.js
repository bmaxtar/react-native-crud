//import liraries
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';

// create a component
const Note = ({item, onPress}) => {
    const {title, desc} = item;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
           <Text style={styles.title} numberOfLines={2}>{title}</Text>
           <Text style={styles.desc} numberOfLines={3}>{desc}</Text>

        </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width - 25;
// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding: 20,
        margin: 8,
        borderRadius: 10,
        
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.LIGHT,
    },
    desc: {
        fontWeight: 'bold',
    },
});

//make this component available to the app
export default Note;
