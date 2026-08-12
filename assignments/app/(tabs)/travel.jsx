import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Linking,
    StyleSheet,
} from "react-native";

import {
    CameraView,
    useCameraPermissions,
    useMicrophonePermissions,
} from "expo-camera";

import * as Location from "expo-location";

import {
    VideoView,
    useVideoPlayer,
} from "expo-video";

export default function App() {
    const camera = useRef(null);

    const [cameraPermission, requestCameraPermission] =
        useCameraPermissions();

    const [micPermission, requestMicPermission] =
        useMicrophonePermissions();

    const [screen, setScreen] = useState("camera");

    const [facing, setFacing] = useState("back");
    const [flash, setFlash] = useState("off");
    const [torch, setTorch] = useState(false);

    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);
    const [recording, setRecording] = useState(false);

    const [status, setStatus] = useState("Camera Ready");

    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState("");

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [tracking, setTracking] = useState(false);

    const locationWatcher = useRef(null);

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const [photos, setPhotos] = useState([]);
    const [cameraSound, setCameraSound] = useState(true);

    /* CAMERA */

    const switchCamera = () => {
        setFacing(
            facing === "back" ? "front" : "back"
        );
    };

    const changeFlash = () => {
        if (flash === "off") {
            setFlash("on");
        } else if (flash === "on") {
            setFlash("auto");
        } else {
            setFlash("off");
        }
    };

    const toggleTorch = () => {
        if (facing === "front") {
            Alert.alert(
                "Torch",
                "Torch works with the back camera"
            );
            return;
        }

        setTorch(!torch);

        setStatus(
            torch ? "Torch Off" : "Torch On"
        );
    };

    /* PHOTO */

    const takePhoto = async () => {
        if (!camera.current) return;

        setStatus("Getting Location");

        const data = await getLocation();

        if (!data) return;

        setStatus("Taking Photo");

        const result =
            await camera.current.takePictureAsync();

        if (!result) return;

        const coords = data.location.coords;

        const newPhoto = {
            id: Date.now(),

            name: "Photo " + (photos.length + 1),

            uri: result.uri,

            address: data.address,

            latitude: coords.latitude,

            longitude: coords.longitude,

            altitude: coords.altitude,

            accuracy: coords.accuracy,

            speed: coords.speed,

            heading: coords.heading,

            timestamp: data.location.timestamp,

            date: new Date().toLocaleDateString(),

            time: new Date().toLocaleTimeString(),

            favorite: false,
        };
        setPhoto(result.uri);

        setPhotos([
            ...photos,
            newPhoto,
        ]);

        setStatus("Photo Saved With Location");
    };
    /* VIDEO */

    const startVideo = async () => {
        if (!camera.current) return;

        const permission =
            await requestMicPermission();

        if (!permission.granted) {
            Alert.alert(
                "Microphone",
                "Microphone permission required"
            );
            return;
        }

        setRecording(true);
        setVideo(null);
        setStatus("Recording Video");

        const result =
            await camera.current.recordAsync();

        if (result) {
            setVideo(result.uri);
        }

        setRecording(false);
        setStatus("Video Saved");
    };

    const stopVideo = () => {
        if (!camera.current) return;

        camera.current.stopRecording();

        setRecording(false);
        setStatus("Video Stopped");
    };

    /* QR AND BARCODE */

    const scanCode = ({ data }) => {
        if (scanResult) return;

        setScanResult(data);
        setScanning(false);
        setStatus("Code Scanned");
    };

    const resetScanner = () => {
        setScanResult("");
        setScanning(false);
        setStatus("Camera Ready");
    };

    /* LOCATION */

    const getLocation = async () => {
        const permission =
            await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Location",
                "Location permission required"
            );
            return null;
        }

        const result =
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

        const newAddress =
            await getAddress(
                result.coords.latitude,
                result.coords.longitude
            );

        setLocation(result);
        setAddress(newAddress);

        return {
            location: result,
            address: newAddress,
        };
    };
    /* ADDRESS */

    const getAddress = async (
        latitude,
        longitude
    ) => {
        const result =
            await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

        if (result.length === 0) {
            return "Address not available";
        }

        const place = result[0];

        return (
            `${place.name || ""}, ` +
            `${place.city || ""}, ` +
            `${place.region || ""}, ` +
            `${place.country || ""}`
        );
    };
    /* LIVE LOCATION */

    const startTracking = async () => {
        const permission =
            await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) return;

        setTracking(true);

        locationWatcher.current =
            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                },
                newLocation => {
                    setLocation(newLocation);

                    getAddress(
                        newLocation.coords.latitude,
                        newLocation.coords.longitude
                    );
                }
            );
    };

    const stopTracking = () => {
        locationWatcher.current?.remove();

        locationWatcher.current = null;

        setTracking(false);
    };

    /* SEARCH */

    const searchLocation = async () => {
        if (!search) {
            Alert.alert(
                "Search",
                "Enter an address"
            );
            return;
        }

        const result =
            await Location.geocodeAsync(search);

        if (result.length === 0) {
            Alert.alert(
                "Search",
                "Location not found"
            );
            return;
        }

        setSearchResult(result[0]);
    };

    /* GOOGLE MAPS */

    const openGoogleMaps = (
        latitude,
        longitude
    ) => {
        const url =
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        Linking.openURL(url);
    };

    /* DELETE PHOTO */

    const deletePhoto = id => {
        Alert.alert(
            "Delete Photo",
            "Delete this photo?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setPhotos(
                            photos.filter(
                                photo => photo.id !== id
                            )
                        );
                    },
                },
            ]
        );
    };
    /* RENAME PHOTO */
    const renamePhoto = id => {
        Alert.prompt(
            "Rename Photo",
            "Enter new name",

            name => {
                if (!name) return;

                setPhotos(
                    photos.map(photo =>
                        photo.id === id
                            ? { ...photo, name: name }
                            : photo
                    )
                );
            }
        );
    };

    /*FAVOURITE PHOTO */
    const favoritePhoto = id => {
        setPhotos(
            photos.map(photo =>
                photo.id === id
                    ? {
                        ...photo,
                        favorite: !photo.favorite,
                    }
                    : photo
            )
        );
    };
    /* VIDEO PREVIEW */

    const VideoPreview = () => {
        const player = useVideoPlayer(video);

        return (
            <View style={styles.card}>
                <Text style={styles.heading}>
                    Video Preview
                </Text>

                <VideoView
                    player={player}
                    style={styles.video}
                    nativeControls
                />

                <Text>
                    Video URI:
                </Text>

                <Text>{video}</Text>
            </View>
        );
    };

    /* CAMERA SCREEN */

    const CameraScreen = () => {
        if (!cameraPermission) {
            return (
                <View style={styles.center}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (!cameraPermission.granted) {
            return (
                <View style={styles.center}>
                    <Text style={styles.heading}>
                        Camera Permission
                    </Text>

                    <Button
                        title="Allow Camera"
                        onPress={requestCameraPermission}
                    />
                </View>
            );
        }

        return (
            <ScrollView
                contentContainerStyle={styles.page}
            >
                <Text style={styles.title}>
                    Camera
                </Text>

                <Text style={styles.status}>
                    Status: {status}
                </Text>

                <CameraView
                    ref={camera}
                    style={styles.camera}
                    facing={facing}
                    flash={flash}
                    enableTorch={torch}
                    onBarcodeScanned={
                        scanning
                            ? scanCode
                            : undefined
                    }
                    barcodeScannerSettings={{
                        barcodeTypes: [
                            "qr",
                            "ean13",
                            "ean8",
                            "code128",
                        ],
                    }}
                />

                <View style={styles.card}>
                    <Button
                        title="Switch Camera"
                        onPress={switchCamera}
                    />

                    <Button
                        title={`Flash: ${flash}`}
                        onPress={changeFlash}
                    />

                    <Button
                        title={
                            cameraSound
                                ? "Camera Sound: On"
                                : "Camera Sound: Off"
                        }
                        onPress={toggleCameraSound}
                    />

                    <Button
                        title={
                            torch
                                ? "Turn Torch Off"
                                : "Turn Torch On"
                        }
                        onPress={toggleTorch}
                    />

                    <Button
                        title="Take Photo"
                        onPress={takePhoto}
                    />

                    {!recording ? (
                        <Button
                            title="Start Video"
                            onPress={startVideo}
                        />
                    ) : (
                        <Button
                            title="Stop Video"
                            onPress={stopVideo}
                        />
                    )}

                    <Button
                        title={
                            scanning
                                ? "Stop Scanner"
                                : "Scan QR / Barcode"
                        }
                        onPress={() => {
                            setScanning(!scanning);
                            setScanResult("");
                        }}
                    />

                    {scanResult !== "" && (
                        <View style={styles.scanBox}>
                            <Text>
                                Result: {scanResult}
                            </Text>

                            <Button
                                title="Reset Scanner"
                                onPress={resetScanner}
                            />
                        </View>
                    )}
                </View>

                {photo && (
                    <View style={styles.card}>
                        <Text style={styles.heading}>
                            Photo Preview
                        </Text>

                        <Image
                            source={{ uri: photo }}
                            style={styles.image}
                        />

                        <Text>
                            URI: {photo}
                        </Text>
                    </View>
                )}

                {video && <VideoPreview />}
            </ScrollView>
        );
    };

    /* LOCATION SCREEN */

    const LocationScreen = () => (
        <ScrollView
            contentContainerStyle={styles.page}
        >
            <Text style={styles.title}>
                Location
            </Text>

            <Button
                title="Get Current Location"
                onPress={getLocation}
            />

            <Button
                title={
                    tracking
                        ? "Stop Live Tracking"
                        : "Start Live Tracking"
                }
                onPress={
                    tracking
                        ? stopTracking
                        : startTracking
                }
            />

            {location && (
                <View style={styles.card}>

                    <Text style={styles.heading}>
                        Complete Location Details
                    </Text>

                    <Text>
                        Latitude: {location.coords.latitude}
                    </Text>

                    <Text>
                        Longitude: {location.coords.longitude}
                    </Text>

                    <Text>
                        Altitude: {location.coords.altitude} meters
                    </Text>

                    <Text>
                        Accuracy: {location.coords.accuracy} meters
                    </Text>

                    <Text>
                        Speed: {location.coords.speed} m/s
                    </Text>

                    <Text>
                        Heading: {location.coords.heading}°
                    </Text>

                    <Text>
                        Address: {address}
                    </Text>

                    <Text>
                        Timestamp:{" "}
                        {new Date(
                            location.timestamp
                        ).toLocaleString()}
                    </Text>

                    <Button
                        title="Open Google Maps"
                        onPress={() =>
                            openGoogleMaps(
                                location.coords.latitude,
                                location.coords.longitude
                            )
                        }
                    />

                </View>
            )}
            <View style={styles.card}>
                <Text style={styles.heading}>
                    Search Location
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter address"
                    value={search}
                    onChangeText={setSearch}
                />

                <Button
                    title="Search"
                    onPress={searchLocation}
                />

                {searchResult && (
                    <View>
                        <Text>
                            Latitude:{" "}
                            {searchResult.latitude}
                        </Text>

                        <Text>
                            Longitude:{" "}
                            {searchResult.longitude}
                        </Text>

                        <Button
                            title="Open in Google Maps"
                            onPress={() =>
                                openGoogleMaps(
                                    searchResult.latitude,
                                    searchResult.longitude
                                )
                            }
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );

    /* GALLERY */

    const GalleryScreen = () => (
        <ScrollView
            contentContainerStyle={styles.page}
        >

            <Text style={styles.title}>
                Gallery
            </Text>

            {photos.length === 0 && (
                <Text>
                    No photos
                </Text>
            )}

            {photos.map(photo => (

                <View
                    key={photo.id}
                    style={styles.card}
                >

                    <Image
                        source={{
                            uri: photo.uri,
                        }}
                        style={styles.image}
                    />

                    <Text style={styles.heading}>
                        {photo.name}
                    </Text>

                    <Text>
                        Date: {photo.date}
                    </Text>

                    <Text>
                        Time: {photo.time}
                    </Text>

                    <Text>
                        Address: {photo.address}
                    </Text>

                    <Text>
                        Latitude: {photo.latitude}
                    </Text>

                    <Text>
                        Longitude: {photo.longitude}
                    </Text>

                    <Text>
                        Favorite:{" "}
                        {photo.favorite
                            ? "Yes"
                            : "No"}
                    </Text>

                    <Button
                        title="Rename Photo"
                        onPress={() =>
                            renamePhoto(photo.id)
                        }
                    />

                    <Button
                        title={
                            photo.favorite
                                ? "Remove Favorite"
                                : "Add Favorite"
                        }
                        onPress={() =>
                            favoritePhoto(photo.id)
                        }
                    />

                    <Button
                        title="Open in Google Maps"
                        onPress={() =>
                            openGoogleMaps(
                                photo.latitude,
                                photo.longitude
                            )
                        }
                    />

                    <Button
                        title="Delete Photo"
                        onPress={() =>
                            deletePhoto(photo.id)
                        }
                    />

                </View>

            ))}

        </ScrollView>
    );    /* HOME */

    const HomeScreen = () => (
        <View style={styles.center}>
            <Text style={styles.title}>
                Travel Guardian
            </Text>

            <Text>
                Camera and Location App
            </Text>
        </View>
    );

    /* MAIN APP */

    return (
        <View style={styles.app}>
            <View style={styles.content}>
                {screen === "home" && (
                    <HomeScreen />
                )}

                {screen === "camera" && (
                    <CameraScreen />
                )}

                {screen === "location" && (
                    <LocationScreen />
                )}

                {screen === "gallery" && (
                    <GalleryScreen />
                )}
            </View>

            <View style={styles.navigation}>
                <TouchableOpacity
                    onPress={() => setScreen("home")}
                >
                    <Text>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setScreen("camera")}
                >
                    <Text>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setScreen("location")}
                >
                    <Text>Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setScreen("gallery")}
                >
                    <Text>Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


/* STYLES */

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    content: {
        flex: 1,
    },

    page: {
        padding: 20,
        paddingBottom: 100,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    status: {
        textAlign: "center",
        marginBottom: 10,
    },

    camera: {
        width: "100%",
        height: 450,
    },

    card: {
        backgroundColor: "white",
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },

    video: {
        width: "100%",
        height: 250,
    },

    scanBox: {
        backgroundColor: "#eee",
        padding: 10,
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },

    navigation: {
        height: 60,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});