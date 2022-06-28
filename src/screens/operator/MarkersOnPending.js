import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LatLng, LeafletView,MapShapeType,AnimationType } from 'react-native-leaflet-view';

const MarkersOnPending = () => {
  return (
    <View style={{flex:1}}>
     <LeafletView
    //  ownPositionMarker={{
    //     id: '1',
    //     coords: {lat: 36.00, lng:-76.00},
    //     icon: "❤️",
    //     size: [24, 24],
        
    //   }}
         // The rest of your props, see the list below
         mapShapes={[
            {
              shapeType: MapShapeType.CIRCLE,
              color: "#123123",
              id: "1",
              center: { lat: 34.225727, lng: -77.94471 },
              radius: 2000
            }
          ]}    />
    </View>
  )
}

export default MarkersOnPending

const styles = StyleSheet.create({})