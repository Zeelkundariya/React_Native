import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

interface AttendanceRecord {
  id: string;
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  photoUri: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await AsyncStorage.getItem('attendance_history');
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const clearHistory = async () => {
    await AsyncStorage.removeItem('attendance_history');
    setHistory([]);
  };

  const renderItem = ({ item }: { item: AttendanceRecord }) => {
    const dateObj = new Date(item.date);
    return (
      <View style={styles.card}>
        <Image source={{uri: item.photoUri}} style={styles.thumb} />
        <View style={styles.info}>
          <Text style={styles.date}>{dateObj.toLocaleDateString()} - {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={14} color="#8892b0" style={{marginTop: 2}} />
            <Text style={styles.address} numberOfLines={2}>{item.address}</Text>
          </View>
          <Text style={styles.coords}>Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {history.length > 0 && (
        <View style={styles.headerRow}>
          <Text style={styles.totalText}>Total Records: {history.length}</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="document-text-outline" size={80} color="#ccd6f6" />
          <Text style={styles.emptyText}>No attendance records found.</Text>
        </View>
      ) : (
        <FlatList 
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  totalText: {
    fontSize: 14,
    color: '#8892b0',
    fontWeight: '600',
  },
  clearText: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a192f',
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#495670',
    marginLeft: 4,
    flex: 1,
  },
  coords: {
    fontSize: 12,
    color: '#8892b0',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#8892b0',
    textAlign: 'center',
  },
});