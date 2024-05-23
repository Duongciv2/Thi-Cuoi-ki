import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useNavigation hook để có thể điều hướng
import { fetchCosts } from '../api/costApi';
import formatCurrency from '../utils/formatCurrency'; // Import hàm formatCurrency
import CostItem from '../components/CostItem';

const CostListScreen = ({ route }) => {
    const [costs, setCosts] = useState([]);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [search, setSearch] = useState('');
    const [totalAmount, setTotalAmount] = useState(0); // Tổng số tiền
    const navigation = useNavigation();

    // Sử dụng useFocusEffect để gọi lại fetchData mỗi khi trang được focus
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    // Nếu có dữ liệu cần làm mới từ trang AddCostScreen
    useEffect(() => {
        if (route.params?.newCost) {
            fetchData();
        }
    }, [route.params?.newCost]);

    // Hàm fetchData để lấy dữ liệu mới từ API
    const fetchData = async () => {
        try {
            const data = await fetchCosts();
            setCosts(data);
            setFilteredCosts(data);
            calculateTotalAmount(data); // Tính toán tổng số tiền khi dữ liệu được tải
        } catch (error) {
            console.error('Error fetching costs:', error.message);
            Alert.alert('Lỗi', 'Không thể tải danh sách viện phí. Vui lòng thử lại sau.');
        }
    };

    // Hàm tính toán tổng số tiền
    const calculateTotalAmount = (data) => {
        const total = data.reduce((acc, cur) => {
            return acc + cur.tongTien;
        }, 0);
        setTotalAmount(total);
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
            const newData = costs.filter(item => {
                const itemData = `${item.maSoBenhNhan.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCosts(newData);
            calculateTotalAmount(newData); // Tính toán tổng số tiền khi thực hiện tìm kiếm
        } else {
            setFilteredCosts(costs);
            calculateTotalAmount(costs); // Tính toán tổng số tiền khi hủy tìm kiếm
        }
    };

    // Hàm hiển thị mỗi mục trong danh sách
    const renderItem = ({ item }) => (
        <CostItem 
            cost={item} 
            onPress={() => navigation.navigate('CostDetail', { id: item.id })} 
        />
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm viện phí"
                value={search}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCosts}
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
});

export default CostListScreen;
