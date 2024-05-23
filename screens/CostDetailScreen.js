import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getCost, deleteCost } from '../api/costApi';
import { useNavigation, useRoute } from '@react-navigation/native';

const CostDetailScreen = () => {
    const [cost, setCost] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const route = useRoute();
    const navigation = useNavigation();
    const { id, onDelete } = route.params;

    useEffect(() => {
        const fetchCost = async () => {
            try {
                const fetchedCost = await getCost(id);
                setCost(fetchedCost);
                calculateTotalCost(fetchedCost); // Tính tổng tiền khi dữ liệu được tải
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể lấy thông tin viện phí.');
            }
        };

        fetchCost();
    }, [id]);

    const calculateTotalCost = (cost) => {
        const { chiPhiKhamBenh, chiPhiThuoc, chiPhiXetNghiem } = cost;
        const total = chiPhiKhamBenh + chiPhiThuoc + chiPhiXetNghiem;
        setTotalCost(total);
    };

    const handleDelete = async () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xóa thông tin viện phí này không?',
            [
                { text: 'Không', style: 'cancel' },
                {
                    text: 'Có', onPress: async () => {
                        try {
                            await deleteCost(id);
                            onDelete(id);  // Gọi callback để cập nhật danh sách
                            navigation.goBack();
                            Alert.alert('Thành công', 'Thông tin viện phí đã được xóa');
                        } catch (error) {
                            Alert.alert('Lỗi', 'Không thể xóa thông tin viện phí. Vui lòng thử lại.');
                        }
                    }
                },
            ]
        );
    };

    if (!cost) {
        return (
            <View style={styles.errorContainer}>
                <Text>Không thể tìm thấy thông tin viện phí.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Mã số bệnh nhân:</Text>
                <Text style={styles.value}>{cost.maSoBenhNhan}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Chi phí khám bệnh:</Text>
                <Text style={styles.value}>{cost.chiPhiKhamBenh}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Chi phí thuốc:</Text>
                <Text style={styles.value}>{cost.chiPhiThuoc}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Chi phí xét nghiệm:</Text>
                <Text style={styles.value}>{cost.chiPhiXetNghiem}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Tổng tiền:</Text>
                <Text style={styles.value}>{totalCost}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWrapper} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Xóa thông tin</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailItem: {
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default CostDetailScreen;
