import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#4A90E2',
      tabBarInactiveTintColor: '#8892b0',
      tabBarStyle: {
        backgroundColor: '#0a192f',
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      headerStyle: { backgroundColor: '#0a192f' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Mark Attendance',
          tabBarIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History',
          tabBarIcon: ({ color }) => <Ionicons name="time" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}