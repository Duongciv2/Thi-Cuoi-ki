import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CandidateItem = ({ candidate, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <Text style={styles.name}>{candidate.tenUngVien}</Text>
                <Text>Mã số: {candidate.maUngVien}</Text>
                <Text>Email: {candidate.email}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CandidateItem;
