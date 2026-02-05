import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generate, vote } from '../api';

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { prompt } = route.params;
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchAI() {
      setLoading(true);
      try {
        const res = await generate(prompt);
        setOutput(res.output || 'No response.');
        setId(res.meta?.id || null);
      } catch (e) {
        setOutput('Error fetching response.');
      } finally {
        setLoading(false);
      }
    }
    fetchAI();
  }, [prompt]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.prompt}>Prompt: {prompt}</Text>

      <View style={styles.outputCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#2B7A0B" />
        ) : (
          <Text>{output}</Text>
        )}
      </View>

      <View style={styles.voteRow}>
        <TouchableOpacity
          style={[styles.voteBtn, { backgroundColor: '#2B7A0B' }]}
          onPress={() => id && vote(id, 'support')}
        >
          <Text style={styles.voteText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteBtn, { backgroundColor: '#FF7A59' }]}
          onPress={() => id && vote(id, 'dont_support')}
        >
          <Text style={styles.voteText}>Don't Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.tryAnother}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.tryAnotherText}>Try another</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F9E8', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  prompt: { fontSize: 16, marginBottom: 12 },
  outputCard: { backgroundColor: '#fff', borderRadius: 8, padding: 12, minHeight: 120 },
  voteRow: { flexDirection: 'row', marginTop: 16 },
  voteBtn: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginHorizontal: 4 },
  voteText: { color: '#fff', fontWeight: '700' },
  tryAnother: { marginTop: 16, alignSelf: 'center', backgroundColor: '#2B7A0B', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  tryAnotherText: { color: '#fff', fontWeight: '600' },
});