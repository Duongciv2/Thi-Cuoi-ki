import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getCandidate, deleteCandidate } from '../api/candidateApi';
import { useNavigation, useRoute } from '@react-navigation/native';

const CandidateDetailScreen = () => {
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    const { id, onDelete } = route.params;

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const fetchedCandidate = await getCandidate(id);
                setCandidate(fetchedCandidate);
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể lấy thông tin ứng viên.');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidate();
    }, [id]);

    const handleDelete = async () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xóa ứng viên này không?',
            [
                { text: 'Không', style: 'cancel' },
                {
                    text: 'Có', onPress: async () => {
                        try {
                            await deleteCandidate(id);
                            onDelete(id);  // Gọi callback để cập nhật danh sách
                            navigation.goBack();
                            Alert.alert('Thành công', 'Ứng viên đã được xóa');
                        } catch (error) {
                            Alert.alert('Lỗi', 'Không thể xóa ứng viên. Vui lòng thử lại.');
                        }
                    }
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!candidate) {
        return (
            <View style={styles.errorContainer}>
                <Text>Không thể tìm thấy thông tin ứng viên.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Tên ứng viên:</Text>
                <Text style={styles.value}>{candidate.tenUngVien}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Mã số ứng viên:</Text>
                <Text style={styles.value}>{candidate.maUngVien}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Mô tả kinh nghiệm:</Text>
                <Text style={styles.value}>{candidate.moTaKinhNghiem}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{candidate.email}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>{candidate.address || 'N/A'}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWrapper} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Xóa ứng viên</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default CandidateDetailScreen;
