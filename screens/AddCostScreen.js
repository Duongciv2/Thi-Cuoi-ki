import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { addCost } from '../api/costApi'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook để có thể điều hướng

const AddCostScreen = () => {
    const [maSoBenhNhan, setMaSoBenhNhan] = useState('');
    const [chiPhiKhamBenh, setChiPhiKhamBenh] = useState('');
    const [chiPhiThuoc, setChiPhiThuoc] = useState('');
    const [chiPhiXetNghiem, setChiPhiXetNghiem] = useState('');
    const [ghiChu, setGhiChu] = useState('');
    const navigation = useNavigation(); // Sử dụng hook useNavigation để điều hướng

    const validateForm = () => {
        if (maSoBenhNhan.length < 10 || maSoBenhNhan.length > 50) {
            Alert.alert('Lỗi', 'Mã số bệnh nhân phải có từ 10 đến 50 ký tự');
            return false;
        }
        if (parseFloat(chiPhiKhamBenh) <= 100000) {
            Alert.alert('Lỗi', 'Chi phí khám bệnh phải lớn hơn 100.000đ');
            return false;
        }
        const chiPhiThuocValue = parseFloat(chiPhiThuoc);
        if (chiPhiThuocValue <= 500000 || chiPhiThuocValue >= 2000000) {
            Alert.alert('Lỗi', 'Chi phí thuốc phải lớn hơn 500.000đ và nhỏ hơn 2.000.000đ');
            return false;
        }
        if (parseFloat(chiPhiXetNghiem) <= 100000) {
            Alert.alert('Lỗi', 'Chi phí xét nghiệm phải lớn hơn 100.000đ');
            return false;
        }
        if (ghiChu.length > 512) {
            Alert.alert('Lỗi', 'Ghi chú không được vượt quá 512 ký tự');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            const newCost = {
                maSoBenhNhan,
                chiPhiKhamBenh: parseFloat(chiPhiKhamBenh),
                chiPhiThuoc: parseFloat(chiPhiThuoc),
                chiPhiXetNghiem: parseFloat(chiPhiXetNghiem),
                ghiChu,
            };
            try {
                const addedCost = await addCost(newCost);
                navigation.navigate('CostList', { refresh: true }); // Điều hướng về trang CostList và gửi dữ liệu là cần làm mới
                Alert.alert('Thành công', 'Viện phí đã được thêm');
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể thêm viện phí. Vui lòng thử lại.');
            }
        }
    };
    const handleCancel = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn hủy bỏ thêm mới không?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Có', onPress: () => navigation.navigate('CostList') },
            ]
        );
    };

    return (
<View style={styles.container}>
    <Text style={styles.label}>Mã số bệnh nhân</Text>
    <TextInput
        style={styles.input}
        placeholder="Nhập mã số bệnh nhân"
        value={maSoBenhNhan}
        onChangeText={setMaSoBenhNhan}
    />
    <Text style={styles.label}>Chi phí khám</Text>
    <TextInput
        style={styles.input}
        placeholder="Nhập chi phí khám"
        value={chiPhiKhamBenh}
        onChangeText={setChiPhiKhamBenh}
        keyboardType="numeric"
    />
    <Text style={styles.label}>Chi phí xét nghiệm</Text>
    <TextInput
        style={styles.input}
        placeholder="Nhập chi phí xét nghiệm"
        value={chiPhiXetNghiem}
        onChangeText={setChiPhiXetNghiem}
        keyboardType="numeric"
    />
    <Text style={styles.label}>Chi phí thuốc</Text>
    <TextInput
        style={styles.input}
        placeholder="Nhập chi phí thuốc"
        value={chiPhiThuoc}
        onChangeText={setChiPhiThuoc}
        keyboardType="numeric"
    />
    <Text style={styles.label}>Ghi chú</Text>
    <TextInput
        style={[styles.input, styles.textArea]}
        value={ghiChu}
        onChangeText={setGhiChu}
    />
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleCancel}>
            <Text style={styles.buttonText}>Hủy bỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu lại</Text>
        </TouchableOpacity>
    </View>
</View>

        
    );
};

const styles = StyleSheet.create({
    textArea: {
        height: 80, // Increase the height for text areas
        textAlignVertical: 'top', // Align text to the top of the text area
    },
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    buttonWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#007AFF', // Màu chữ của nút
    },
    label: {
        fontWeight: 'bold', // Định dạng in đậm cho tiêu đề
        marginBottom: 8, // Khoảng cách dưới của tiêu đề
    },
    
});

export default AddCostScreen;
