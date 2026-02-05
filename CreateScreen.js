import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CreateScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ritvik</Text>
      <Text style={styles.prompt}>What can I help you create?</Text>

      <View style={styles.tiles}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={styles.tile} />
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your idea..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Results', { prompt: text })}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F9E8', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  prompt: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tile: { width: '30%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, height: 44 },
  button: { marginLeft: 8, backgroundColor: '#2B7A0B', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});