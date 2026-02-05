import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const chips = ['Pasta', 'Chicken Salad', 'Grilled Tofu','Garlic Bread'];

const foodItems = [
{ name: 'Pasta', image: require('../assets/Spicy.png') },
{ name: 'Chicken Salad', image: require('../assets/Chicken salad.jpg')}, 
  { name: 'Beef Wellington', image: require('../assets/beef wellington.jpg') },
 { name: 'Grilled Tofu', image: require('../assets/grilled tofu.jpg') },
  { name: 'Garlic Bread', image: require('../assets/bred.jpg') },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Results', { prompt: item.name })}
      activeOpacity={0.8}
    >
     <Image
  source={typeof item.image === 'string' ? { uri: item.image } : item.image}
  style={styles.cardImg}
/>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Aniketh</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconStub} />
          <TouchableOpacity style={[styles.iconStub, { marginLeft: 12 }]} />
        </View>
      </View>

      {/* Most Searched */}
      <Text style={styles.sectionTitle}>Most Searched This Week</Text>
      <View style={styles.chipsRow}>
        {chips.map((c, i) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, i < chips.length - 1 && { marginRight: 8 }]}
            onPress={() => setQuery(c)}
          >
            <Text>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Food Grid */}
      <FlatList
        data={foodItems}
        numColumns={2}
        keyExtractor={(item) => item.name}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Ask AI Bar */}
      <View style={styles.askRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ask Ai..."
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.askButton}
          onPress={() => navigation.navigate('Results', { prompt: query })}
          disabled={!query.trim()}
        >
          <Text style={styles.askButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F9E8', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  icons: { flexDirection: 'row' },
  iconStub: { width: 28, height: 28, backgroundColor: '#ccc', borderRadius: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  chipsRow: { flexDirection: 'row', marginBottom: 16 },
  chip: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  cardImg: { width: '100%', height: 120 },
  cardTitle: { padding: 8, fontWeight: '600' },
  askRow: { flexDirection: 'row', alignItems: 'center', marginTop: 'auto' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, height: 44 },
  askButton: { marginLeft: 8, backgroundColor: '#2B7A0B', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  askButtonText: { color: '#fff', fontWeight: '600' },
});