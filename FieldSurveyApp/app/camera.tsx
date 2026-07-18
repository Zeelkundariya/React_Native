import React, { useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const [photo, setPhoto] =
    useState<string | null>(null);

  const [captureTime, setCaptureTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  // Loading Camera Permission
  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#059669"
          />

          <Text style={styles.loadingText}>
            Opening Camera...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Camera Permission Not Granted
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIcon}>
            <Ionicons
              name="camera-outline"
              size={40}
              color="#059669"
            />
          </View>

          <Text style={styles.permissionTitle}>
            Camera Permission
          </Text>

          <Text style={styles.permissionText}>
            Camera permission is required to capture
            survey photos.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={requestPermission}
          >
            <Ionicons
              name="camera"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.primaryButtonText}>
              Allow Camera
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Save Photo to Gallery
  const saveToGallery = async (uri: string) => {
    try {
      let granted = mediaPermission?.granted;

      if (!granted) {
        const result =
          await requestMediaPermission();

        granted = result.granted;
      }

      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Gallery permission is required to save photos."
        );

        return false;
      }

      await MediaLibrary.saveToLibraryAsync(uri);

      setSaved(true);

      return true;
    } catch (error) {
      Alert.alert(
        "Save Error",
        "Could not save photo to gallery."
      );

      return false;
    }
  };

  // Capture Photo
  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      setLoading(true);
      setSaved(false);

      const result =
        await cameraRef.current.takePictureAsync();

      if (result) {
        setPhoto(result.uri);

        setCaptureTime(
          new Date().toLocaleString()
        );

        // Automatically save photo
        const wasSaved =
          await saveToGallery(result.uri);

        if (wasSaved) {
          Alert.alert(
            "Photo Saved",
            "Photo captured and saved to your gallery."
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not capture photo."
      );
    } finally {
      setLoading(false);
    }
  };

  // Retake Photo
  const retakePhoto = () => {
    setPhoto(null);
    setCaptureTime("");
    setSaved(false);
  };

  // Delete Preview
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      saved
        ? "This will remove the photo from this survey preview. The saved copy will remain in your gallery."
        : "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
            setSaved(false);
          },
        },
      ]
    );
  };

  // Photo Preview
  if (photo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerSmall}>
                SMART FIELD SURVEY
              </Text>

              <Text style={styles.headerTitle}>
                Photo Preview
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons
                name="image-outline"
                size={26}
                color="#047857"
              />
            </View>
          </View>

          {/* Preview Content */}
          <View style={styles.content}>
            <View style={styles.imageCard}>
              <Image
                source={{ uri: photo }}
                style={styles.image}
              />

              {saved && (
                <View style={styles.savedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#059669"
                  />

                  <Text style={styles.savedText}>
                    Saved to Gallery
                  </Text>
                </View>
              )}
            </View>

            {/* Photo Information */}
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#059669"
                />
              </View>

              <View>
                <Text style={styles.infoLabel}>
                  Captured At
                </Text>

                <Text style={styles.infoValue}>
                  {captureTime}
                </Text>
              </View>
            </View>

            {/* Retake */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={retakePhoto}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.primaryButtonText}>
                Retake Photo
              </Text>
            </TouchableOpacity>

            {/* Delete */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deletePhoto}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#DC2626"
              />

              <Text style={styles.deleteButtonText}>
                Delete Preview
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Camera Screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>
              SMART FIELD SURVEY
            </Text>

            <Text style={styles.headerTitle}>
              Camera
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="camera-outline"
              size={26}
              color="#047857"
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Capture Survey Photo
          </Text>

          <Text style={styles.subtitle}>
            Take a clear photo for your field survey.
          </Text>

          {/* Camera */}
          <View style={styles.cameraCard}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
            />

            {loading && (
              <View style={styles.cameraLoader}>
                <ActivityIndicator
                  size="large"
                  color="#FFFFFF"
                />
              </View>
            )}
          </View>

          {/* Gallery Info */}
          <View style={styles.galleryInfo}>
            <Ionicons
              name="images-outline"
              size={21}
              color="#059669"
            />

            <Text style={styles.galleryInfoText}>
              Captured photos will be saved to your gallery.
            </Text>
          </View>

          {/* Capture Button */}
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            disabled={loading}
          >
            <Ionicons
              name="camera"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.captureButtonText}>
              {loading
                ? "Capturing..."
                : "Capture Photo"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#047857",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Header
  header: {
    backgroundColor: "#047857",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerSmall: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 18,
  },

  // Camera
  cameraCard: {
    height: 390,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#000000",
    position: "relative",
  },

  camera: {
    flex: 1,
  },

  cameraLoader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Gallery Information
  galleryInfo: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 12,
    padding: 13,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  galleryInfoText: {
    flex: 1,
    color: "#047857",
    fontSize: 12,
    marginLeft: 9,
  },

  // Buttons
  captureButton: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  primaryButton: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  deleteButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Photo Preview
  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  image: {
    width: "100%",
    height: 380,
  },

  savedBadge: {
    padding: 12,
    backgroundColor: "#ECFDF5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  savedText: {
    color: "#047857",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },

  // Photo Information
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },

  infoValue: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    marginTop: 2,
  },

  // Permission
  permissionContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },

  permissionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 18,
  },

  permissionText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  center: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#64748B",
    marginTop: 12,
  },
});