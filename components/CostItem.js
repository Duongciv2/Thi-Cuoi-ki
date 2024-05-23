// CostItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import formatCurrency from '../utils/formatCurrency';

const CostItem = ({ cost, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <Text style={styles.bold}>{cost.maSoBenhNhan}</Text>
                <Text>Chi phí khám bệnh: <Text>{formatCurrency(cost.chiPhiKhamBenh)}</Text></Text>
                <Text>Chi phí thuốc: <Text>{formatCurrency(cost.chiPhiThuoc)}</Text></Text>
                <Text>Chi phí xét nghiệm: <Text>{formatCurrency(cost.chiPhiXetNghiem)}</Text></Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default CostItem;
