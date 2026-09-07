import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductItemProps = {
  item: Product;
  onSelect: (product: Product) => void;
};

const ProductItem = React.memo(({ item, onSelect }: ProductItemProps) => {
  console.log(`[Render] ProductItem: ${item.name}`);

  return (
    <Pressable style={styles.itemContainer} onPress={() => onSelect(item)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default ProductItem;
