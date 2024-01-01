import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExpoLeaflet, MapLayer } from "expo-leaflet";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { locationsInfo, mapMarkers } from "./mapMarkers";

function AboutScreen() {
  const mapLayer: MapLayer[] = [
    {
      baseLayerName: "OpenStreetMap", // This will be seen in the layer selection control
      baseLayerIsChecked: true, // If the layer is selected in the layer selection control
      layerType: "TileLayer",
      baseLayer: true,

      url: `https://tile.jawg.io/42349c5d-6fd3-4acf-8c9e-3b0c4a3532d4/{z}/{x}/{y}{r}.png?access-token=Q3PsX6zAjvO5rohsnhQJgyBnwnIG0CjPKxFoxkivPYFQ2XFV1ugVz21UWOoQM4eH`,
      attribution:
        "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
    },
  ];
  const mapOptions = {
    attributionControl: false,
    zoomControl: Platform.OS === "web",
  };
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupId, setPopupId] = useState("");
  function handlePopupClicked(id: string) {
    setPopupId(id);
    setPopupVisible(true);
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        pointerEvents="none"
        colors={["#22272C", "#22272C00"]}
        style={{
          position: "absolute",
          width: "100%",
          height: 90,
          top: 0,
          zIndex: 99,
        }}
      />
      <LinearGradient
        pointerEvents="none"
        colors={["#2e343b00", "#2e343bcc"]}
        style={{
          position: "absolute",
          width: "100%",
          height: 60,
          bottom: 0,
          zIndex: 99,
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Where To Find Us</Text>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <ExpoLeaflet
          mapOptions={mapOptions}
          mapMarkers={mapMarkers}
          mapCenterPosition={{
            lat: 35.89,
            lng: 10.62,
          }}
          zoom={9}
          mapLayers={mapLayer}
          onMessage={(message) => {
            if (message.tag === "onMapMarkerClicked") {
              handlePopupClicked(message.mapMarkerId);
            }
          }}
        />
      </View>
      <Modal visible={popupVisible} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000055",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 200,
              backgroundColor: "#2e343b",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: "70%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <View
                  style={{
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 100,
                    padding: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="bank-outline"
                    size={48}
                    color="#fff"
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "poppins600",
                    fontSize: 18,
                  }}
                >
                  {locationsInfo.find((loc) => loc.id === popupId)?.name}
                </Text>
                <Text
                  style={{
                    color: "#ccc",
                    fontFamily: "poppins400",
                    fontSize: 16,
                  }}
                >
                  {locationsInfo.find((loc) => loc.id === popupId)?.PhoneNumber}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setPopupVisible(false);
              }}
              style={{
                flex: 1,
                backgroundColor: "#596573",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "poppins600", color: "#fff" }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272C",
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    height: 80,
    width: "100%",
    alignItems: "center",
    zIndex: 100,
  },
  title: {
    fontFamily: "poppins600",
    color: "#fff",
    fontSize: 26,
  },
});

export default AboutScreen;
