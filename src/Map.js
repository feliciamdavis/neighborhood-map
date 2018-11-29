/*globals L*/
import React from 'react'
import './Map.css'

export class Map extends React.Component {

    constructor(props) {
        super(props)
        this.mapRef = React.createRef()
        this.markers = []
        // Bind event handlers to *this* this
        this.markerClicked = this.markerClicked.bind(this)
    }

    render() {
        // Aria role referenced from: https://stackoverflow.com/questions/44712753/what-is-a-suitable-wai-aria-role-attribute-for-a-map-element
        return (
            <section ref={this.mapRef} className="map" role="application">
            </section>
        )
    }

    // Apply map to DOM after it's ready
    componentDidMount() {
        this.leafletMap = L.map(this.mapRef.current, {
            center: this.props.center,
            zoom: 14,
            scrollWheelZoom: false
        })
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
            mapboxToken: 'pk.eyJ1IjoiZGF2aXNmZWxpY2lhbSIsImEiOiJjam94eHB3eTgyZGFjM3FxaXBoMmh3MWI5In0.xrynjZRYCn_75TVasn8u4Q',
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
                + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(this.leafletMap)

        this.renderMarkers()
    }

    componentDidUpdate() {
        this.renderMarkers()
    }

    renderMarker(place) {
        // https://leafletjs.com/reference-1.3.0.html#marker
        const marker = new L.marker(
            place.venue.location,
            {
                title: place.venue.name,
                alt: place.venue.name,
            }
        )
        marker.addTo(this.leafletMap)

        marker.on('click', this.markerClicked)

        // If selected add style to get new color
        const markerEl = marker.getElement()
        if (place === this.props.selectedPlace) {
            markerEl.classList.add('selected')
        }

        this.markers.push(marker)
    }

    // Select location marker
    markerClicked(event) {
        const marker = event.target
        const foundPlace = this.props.places.find(place => place.venue.name === marker.options.title)
        this.props.updateSelectedPlace(foundPlace)
    }

    // Render map markers
    renderMarkers() {
        // Removes markers
        for (const marker of this.markers) {
            marker.remove()
        }

        // Reset list of markers
        this.markers = []

        // Gets filtered places
        const lowerCaseFilterText = this.props.filterText.toLowerCase()
        const filteredPlaces = this.props.places.filter(place => {
            const lowerCaseName = place.venue.name.toLowerCase()
            return lowerCaseName.includes(lowerCaseFilterText)
        })

        // Render map markers
        for (const place of filteredPlaces) {
            this.renderMarker(place)
        }
    }

}
