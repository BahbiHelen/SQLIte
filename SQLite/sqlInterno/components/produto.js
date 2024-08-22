import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function Produto({ data, onDelete, onSelect }) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{data.nome} - {data.quantidade}</Text>
            <Button title="Editar" onPress={onSelect} />
            <Button title="Excluir" onPress={onDelete} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        marginBottom: 8,
    },
    texto: {
        fontSize: 16,
    },
});


export function Produto({ data, onDelete }) {
    return (
        <Pressable style={styles.container} >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity>
                <MaterialIcons name="onDelete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} ></TouchableOpacity>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
    },
    text: {
        flex: 1,
    },
});
