import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { addCandidate } from '../api/candidateApi';
import { useNavigation } from '@react-navigation/native';

const AddCandidateScreen = () => {
    const [maUngVien, setMaUngVien] = useState('');
    const [tenUngVien, setTenUngVien] = useState('');
    const [moTaKinhNghiem, setMoTaKinhNghiem] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    const validateForm = () => {
        if (tenUngVien.length < 25) {
            Alert.alert('Lỗi', 'Tên ứng viên phải tối thiểu 25 ký tự');
            return false;
        }
        if (maUngVien.length < 8) {
            Alert.alert('Lỗi', 'Mã số ứng viên phải tối thiểu 8 ký tự');
            return false;
        }
        if (!moTaKinhNghiem) {
            Alert.alert('Lỗi', 'Mô tả kinh nghiệm không được bỏ trống');
            return false;
        }
        if (!email.includes('@')) {
            Alert.alert('Lỗi', 'Email phải có ký tự @');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            const newCandidate = {
                maUngVien,
                tenUngVien,
                moTaKinhNghiem,
                email,
                address,
            };
            try {
                const addedCandidate = await addCandidate(newCandidate);
                navigation.navigate('CandidateList', { newCandidate: addedCandidate });
                Alert.alert('Thành công', 'Ứng viên đã được thêm');
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể thêm ứng viên. Vui lòng thử lại.');
            }
        }
    };

    const handleCancel = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn hủy bỏ thêm mới không?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Có', onPress: () => navigation.navigate('CandidateList') },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên ứng viên"
                value={tenUngVien}
                onChangeText={setTenUngVien}
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập mã số ứng viên"
                value={maUngVien}
                onChangeText={setMaUngVien}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Mô tả kinh nghiệm"
                value={moTaKinhNghiem}
                onChangeText={setMoTaKinhNghiem}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Địa chỉ"
                value={address}
                onChangeText={setAddress}
                multiline
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
    textArea: {
        height: 80, // Increase the height for text areas
        textAlignVertical: 'top', // Align text to the top of the text area
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
        fontSize: 16,
    },
});

export default AddCandidateScreen;
