import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator,} from "react-native";

import { CameraView, useCameraPermissions,} from "expo-camera";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] =useCameraPermissions();
  const [photo, setPhoto] =useState<string | null>(null);
  const [captureTime, setCaptureTime] =useState("");

  const [loading, setLoading] =useState(false);

  // Checking permission
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Opening Camera...</Text>
      </View>
    );
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text> Camera permission is required </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}>
          <Text style={styles.buttonText}> Allow Camera </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Capture Photo
  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      setLoading(true);

      const result =
        await cameraRef.current.takePictureAsync();

      if (result) {
        setPhoto(result.uri);
        setCaptureTime(
          new Date().toLocaleString()
        );
      }
    } catch (error) {
      Alert.alert(
        "Error","Could not capture photo"
      );
    } finally {
      setLoading(false);
    }
  };

  // Retake Photo
  const retakePhoto = () => {
    setPhoto(null);
    setCaptureTime("");
  };

  // Delete Photo
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
          },
        },
      ]
    );
  };

  // Photo Preview
  if (photo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Photo Preview </Text>

        <Image
          source={{ uri: photo }}
          style={styles.image}
        />

        <Text style={styles.time}> Captured: {captureTime} </Text>

        <TouchableOpacity style={styles.button} onPress={retakePhoto}>
          <Text style={styles.buttonText}> Retake Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deletePhoto}>
          <Text style={styles.buttonText}> Delete Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Camera </Text>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"/>

      {loading && (
        <ActivityIndicator
          size="large"
          style={styles.loader}/>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={takePhoto}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading? "Capturing...": "Capture Photo"} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  camera: {
    width: "100%",
    height: 400,
  },

  image: {
    width: "100%",
    height: 400,
  },

  time: {
    marginTop: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    alignItems: "center",
    marginTop: 15,
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  loader: {
    marginTop: 10,
  },
});