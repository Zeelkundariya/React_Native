import React, { useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../../context/ThemeContext";
import { AnimatedPressable } from "../../components/AnimatedPressable";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const cameraRef = useRef<CameraView>(null);

  // Camera Permission
  const [permission, requestPermission] =
    useCameraPermissions();

  // Gallery Permission
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  // States
  const [photo, setPhoto] =
    useState<string | null>(null);

  const [captureTime, setCaptureTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  // ----------------------------------
  // Save Photo to Gallery
  // ----------------------------------
  const saveToGallery = async (uri: string) => {
    try {
      let granted = mediaPermission?.granted;

      // Ask Gallery Permission
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

      // Save Photo
      await MediaLibrary.saveToLibraryAsync(uri);

      setSaved(true);

      return true;
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Save Error",
        "Could not save photo to gallery."
      );

      return false;
    }
  };

  // ----------------------------------
  // Capture Photo
  // ----------------------------------
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

        // Automatically Save to Gallery
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
      console.log(error);
      Alert.alert(
        "Error",
        "Could not capture photo."
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // Retake Photo
  // ----------------------------------
  const retakePhoto = () => {
    setPhoto(null);
    setCaptureTime("");
    setSaved(false);
  };

  // ----------------------------------
  // Delete Photo Preview
  // ----------------------------------
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      saved
        ? "This will remove the photo from the survey preview. The saved photo will remain in your gallery."
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

  // ----------------------------------
  // Loading Camera Permission
  // ----------------------------------
  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primaryLight}
          />

          <Text style={styles.loadingText}>
            Opening Camera...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ----------------------------------
  // Camera Permission Not Granted
  // ----------------------------------
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIcon}>
            <Ionicons
              name="camera-outline"
              size={40}
              color={colors.primaryLight}
            />
          </View>

          <Text style={styles.permissionTitle}>
            Camera Permission
          </Text>

          <Text style={styles.permissionText}>
            Camera permission is required to capture
            survey photos.
          </Text>

          <AnimatedPressable
            style={styles.primaryButton}
            onPress={requestPermission}
          >
            <Ionicons
              name="camera"
              size={20}
              color={colors.card}
            />

            <Text style={styles.primaryButtonText}>
              Allow Camera
            </Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    );
  }

  // ----------------------------------
  // Photo Preview Screen
  // ----------------------------------
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
                color={colors.primary}
              />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.content
            }
          >

            {/* Photo */}
            <View style={styles.imageCard}>
              <Image
                source={{ uri: photo }}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Saved Status */}
              {saved && (
                <View style={styles.savedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={19}
                    color={colors.primaryLight}
                  />

                  <Text style={styles.savedText}>
                    Saved to Gallery
                  </Text>
                </View>
              )}
            </View>

            {/* Capture Time */}
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={colors.primaryLight}
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Captured At
                </Text>

                <Text style={styles.infoValue}>
                  {captureTime}
                </Text>
              </View>
            </View>

            {/* Retake Button */}
            <AnimatedPressable
              style={styles.primaryButton}
              onPress={retakePhoto}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={20}
                color={colors.card}
              />

              <Text style={styles.primaryButtonText}>
                Retake Photo
              </Text>
            </AnimatedPressable>

            {/* Delete Button */}
            <AnimatedPressable
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
            </AnimatedPressable>

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // ----------------------------------
  // Main Camera Screen
  // ----------------------------------
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
              color={colors.primary}
            />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }
        >

          {/* Title */}
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

            {/* Loading Overlay */}
            {loading && (
              <View style={styles.cameraLoader}>
                <ActivityIndicator
                  size="large"
                  color={colors.card}
                />

                <Text style={styles.capturingText}>
                  Capturing...
                </Text>
              </View>
            )}
          </View>

          {/* Gallery Information */}
          <View style={styles.galleryInfo}>
            <View style={styles.galleryIcon}>
              <Ionicons
                name="images-outline"
                size={21}
                color={colors.primaryLight}
              />
            </View>

            <Text style={styles.galleryInfoText}>
              Captured photos will automatically
              be saved to your gallery.
            </Text>
          </View>

          {/* Capture Button */}
          <AnimatedPressable
            style={[
              styles.captureButton,
              loading &&
                styles.captureButtonDisabled,
            ]}
            onPress={takePhoto}
            disabled={loading}
          >
            <Ionicons
              name="camera"
              size={22}
              color={colors.card}
            />

            <Text style={styles.captureButtonText}>
              {loading
                ? "Capturing..."
                : "Capture Photo"}
            </Text>
          </AnimatedPressable>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  // ----------------------------------
  // Main
  // ----------------------------------
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 50,
  },

  // ----------------------------------
  // Header
  // ----------------------------------
  header: {
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  // ----------------------------------
  // Title
  // ----------------------------------
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: 18,
  },

  // ----------------------------------
  // Camera
  // ----------------------------------
  cameraCard: {
    width: "100%",
    height: 380,
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

    backgroundColor: "rgba(0,0,0,0.5)",

    justifyContent: "center",
    alignItems: "center",
  },

  capturingText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },

  // ----------------------------------
  // Gallery Info
  // ----------------------------------
  galleryInfo: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 14,
    padding: 13,
    marginTop: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  galleryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,

    backgroundColor: "#D1FAE5",

    justifyContent: "center",
    alignItems: "center",
  },

  galleryInfoText: {
    flex: 1,

    color: colors.primary,

    fontSize: 12,
    lineHeight: 17,

    marginLeft: 10,
  },

  // ----------------------------------
  // Capture Button
  // ----------------------------------
  captureButton: {
    backgroundColor: colors.primary,

    paddingVertical: 15,

    borderRadius: 12,

    marginTop: 15,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonDisabled: {
    opacity: 0.6,
  },

  captureButtonText: {
    color: colors.white,

    fontSize: 15,
    fontWeight: "bold",

    marginLeft: 8,
  },

  // ----------------------------------
  // Primary Button
  // ----------------------------------
  primaryButton: {
    backgroundColor: colors.primary,

    paddingVertical: 14,
    paddingHorizontal: 20,

    borderRadius: 12,

    marginTop: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: colors.white,

    fontSize: 15,
    fontWeight: "bold",

    marginLeft: 8,
  },

  // ----------------------------------
  // Delete Button
  // ----------------------------------
  deleteButton: {
    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FECACA",

    paddingVertical: 14,

    borderRadius: 12,

    marginTop: 10,
    marginBottom: 10,

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

  // ----------------------------------
  // Photo Preview
  // ----------------------------------
  imageCard: {
    backgroundColor: colors.card,

    borderRadius: 18,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: "100%",
    height: 380,
  },

  savedBadge: {
    paddingVertical: 12,

    backgroundColor: colors.primaryHighlight,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  savedText: {
    color: colors.primary,

    fontSize: 13,
    fontWeight: "600",

    marginLeft: 6,
  },

  // ----------------------------------
  // Photo Info
  // ----------------------------------
  infoCard: {
    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

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

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },

  infoValue: {
    fontSize: 13,

    color: "#334155",

    fontWeight: "600",

    marginTop: 2,
  },

  // ----------------------------------
  // Permission Screen
  // ----------------------------------
  permissionContainer: {
    flex: 1,

    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center",

    padding: 30,
  },

  permissionIcon: {
    width: 80,
    height: 80,

    borderRadius: 40,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",
  },

  permissionTitle: {
    fontSize: 22,

    fontWeight: "bold",

    color: colors.text,

    marginTop: 18,
  },

  permissionText: {
    color: colors.textSecondary,

    textAlign: "center",

    marginTop: 8,

    lineHeight: 20,
  },

  center: {
    flex: 1,

    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: colors.textSecondary,
    marginTop: 12,
  },
});