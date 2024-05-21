import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCandidates } from '../api/candidateApi';

const CandidateListScreen = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const data = await fetchCandidates();
            setCandidates(data);
            setFilteredCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error.message);
            Alert.alert('Lỗi', 'Không thể tải danh sách ứng viên. Vui lòng thử lại sau.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddCandidate', { addCandidateToList })}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const addCandidateToList = (newCandidate) => {
        setCandidates(prevCandidates => [newCandidate, ...prevCandidates]);
        setFilteredCandidates(prevCandidates => [newCandidate, ...prevCandidates]);
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
            const newData = candidates.filter(item => {
                const itemData = `${item.tenUngVien.toUpperCase()} ${item.maUngVien.toUpperCase()} ${item.email.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCandidates(newData);
        } else {
            setFilteredCandidates(candidates);
        }
    };

    const handleDeleteFromList = (id) => {
        setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate.id !== id));
        setFilteredCandidates(prevCandidates => prevCandidates.filter(candidate => candidate.id !== id));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CandidateDetail', { id: item.id, onDelete: handleDeleteFromList })}>
            <View style={styles.item}>
                <Text>{item.tenUngVien}</Text>
                <Text>{item.maUngVien}</Text>
                <Text>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm ứng viên"
                value={search}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCandidates}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        fontSize: 24,
        color: '#007AFF',
        marginRight: 16,
    },
});

export default CandidateListScreen;
