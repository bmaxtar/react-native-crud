import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
    return (
        <View style={[StyleSheet.container, {...containerStyle}]}>
            <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Recherche...' />
            {value ? (<AntDesign name="close" size={20} color={colors.PRIMARY} onPress={onClear}
            style={styles.clearIcon}
             />
             ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 20,
        fontSize: 20,
        margin: 20,
    },
    container: {
        justifyContent: 'center',
    },
    clearIcon:{
        position: 'absolute',
        right: 35,
        top: 30,
    },
});

export default SearchBar;