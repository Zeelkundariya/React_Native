import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function MarkAttendanceScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('Fetching precise location...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission is required.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
      if (reverseGeocode.length > 0) {
        const addr = reverseGeocode[0];
        setAddress(`${addr.name || ''}, ${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`.replace(/, ,/g, ',').replace(/^, /, '').replace(/, $/, ''));
      } else {
        setAddress('Location found, address unavailable');
      }
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) setPhotoUri(photo.uri);
      setIsCameraActive(false);
    }
  };

  const handleSubmit = async () => {
    if (!location || !photoUri) return;
    setSubmitting(true);
    
    try {
      const now = new Date();
      const newRecord = {
        id: Date.now().toString(),
        date: now.toISOString(),
        address: address,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        photoUri: photoUri,
      };

      const existingData = await AsyncStorage.getItem('attendance_history');
      const history = existingData ? JSON.parse(existingData) : [];
      history.unshift(newRecord);
      await AsyncStorage.setItem('attendance_history', JSON.stringify(history));

      setTimeout(() => {
        setSubmitting(false);
        Alert.alert('Success', 'Attendance marked successfully!', [
          { text: 'OK', onPress: () => {
             setPhotoUri(null);
             router.push('/(tabs)/history');
          }}
        ]);
      }, 1500);

    } catch (e) {
      console.error(e);
      setSubmitting(false);
      Alert.alert('Error', 'Failed to save attendance.');
    }
  };

  if (!permission) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#4A90E2" /></View>;
  }

  if (isCameraActive) {
    if (!permission.granted) {
      return (
        <View style={styles.center}>
          <Ionicons name="camera-outline" size={60} color="#8892b0" style={{marginBottom: 20}} />
          <Text style={styles.permissionText}>Camera access is required for selfies.</Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={requestPermission}>
            <Text style={styles.btnTextPrimary}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsCameraActive(false)}>
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureBtn} onPress={handleTakePicture}>
              <View style={styles.captureBtnInner} />
            </TouchableOpacity>
            <View style={{width: 50}} />
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Location Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={24} color="#4A90E2" />
          <Text style={styles.cardTitle}>Location Details</Text>
        </View>
        
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : location ? (
          <>
            <Text style={styles.addressText}>{address}</Text>
            <View style={styles.coordsRow}>
              <View style={styles.coordBox}>
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>{location.coords.latitude.toFixed(5)}</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>{location.coords.longitude.toFixed(5)}</Text>
              </View>
            </View>
            <View style={styles.mapWrapper}>
              <MapView 
                style={styles.map} 
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}>
                   <Ionicons name="location-sharp" size={40} color="#E24A4A" />
                </Marker>
              </MapView>
            </View>
          </>
        ) : (
          <View style={{padding: 40}}>
            <ActivityIndicator size="small" color="#4A90E2" />
            <Text style={{textAlign: 'center', marginTop: 10, color: '#8892b0'}}>Locating you...</Text>
          </View>
        )}
      </View>

      {/* Selfie Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="camera" size={24} color="#4A90E2" />
          <Text style={styles.cardTitle}>Selfie Verification</Text>
        </View>
        
        {photoUri ? (
          <View style={styles.photoWrapper}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
            <TouchableOpacity style={styles.btnSecondary} onPress={() => setIsCameraActive(true)}>
              <Ionicons name="refresh" size={18} color="#4A90E2" style={{marginRight: 5}}/>
              <Text style={styles.btnTextSecondary}>Retake Selfie</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="person-circle-outline" size={70} color="#ccd6f6" />
            <Text style={styles.placeholderText}>Please take a selfie to verify your identity at this location.</Text>
            <TouchableOpacity style={styles.btnPrimaryOutline} onPress={() => setIsCameraActive(true)}>
              <Ionicons name="camera" size={18} color="#4A90E2" style={{marginRight: 8}}/>
              <Text style={styles.btnTextSecondary}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.submitBtn, (!location || !photoUri || submitting) && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!location || !photoUri || submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="cloud-upload" size={22} color="#fff" style={{marginRight: 10}}/>
            <Text style={styles.submitBtnText}>Submit Attendance</Text>
          </>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f4f7f6' },
  permissionText: { fontSize: 16, color: '#495670', textAlign: 'center', marginBottom: 20 },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a192f',
    marginLeft: 10,
  },
  
  errorText: { color: '#e74c3c', fontSize: 14, textAlign: 'center', marginTop: 10 },
  addressText: { fontSize: 15, color: '#495670', marginBottom: 15, lineHeight: 22 },
  
  coordsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  coordBox: { flex: 1, backgroundColor: '#f8f9fa', padding: 10, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  coordLabel: { fontSize: 11, color: '#8892b0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  coordValue: { fontSize: 14, fontWeight: '600', color: '#0a192f' },
  
  mapWrapper: { height: 180, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f0f0f0' },
  map: { flex: 1 },
  
  photoWrapper: { alignItems: 'center' },
  photo: { width: 140, height: 140, borderRadius: 70, marginBottom: 15, borderWidth: 4, borderColor: '#e6f1ff' },
  photoPlaceholder: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#f8f9fa', borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccd6f6' },
  placeholderText: { fontSize: 13, color: '#8892b0', textAlign: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 20, lineHeight: 20 },
  
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  faceGuide: { width: width * 0.7, height: width * 0.9, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', borderRadius: width * 0.35, borderStyle: 'dashed' },
  guideText: { color: '#fff', marginTop: 20, fontSize: 16, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  cameraControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 40, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)' },
  captureBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  captureBtnInner: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#fff' },
  cancelBtn: { padding: 15 },
  
  btnPrimary: { backgroundColor: '#4A90E2', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10, alignItems: 'center' },
  btnPrimaryOutline: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e6f1ff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnSecondary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnTextPrimary: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnTextSecondary: { color: '#4A90E2', fontSize: 14, fontWeight: '600' },
  
  submitBtn: { flexDirection: 'row', backgroundColor: '#00C853', paddingVertical: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#00C853', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  submitBtnDisabled: { backgroundColor: '#A5D6A7', shadowOpacity: 0, elevation: 0 },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});