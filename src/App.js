import React from 'react'
import './App.css'
import { Sidebar } from './Sidebar'
import { Map } from './Map'
import { FourSquareAPI } from './FourSquareAPI'

window.FourSquareAPI = FourSquareAPI

export class App extends React.Component {

    state = {

        center: {
            lat: 37.3230,
            lng: -122.0322,
        },

        places: [],

        filterText: '',

        selectedPlace: undefined,

    }

    constructor(props) {
        super(props)
        // Bind event handlers to *this* this
        this.updateFilterText = this.updateFilterText.bind(this)
        this.updateSelectedPlace = this.updateSelectedPlace.bind(this)
        // Get venues from Foursquare & update state
        FourSquareAPI.getVenues(this.state.center.lat, this.state.center.lng).then(places => {
            this.setState({
                places: places.response.groups[0].items
            })
        })
    }

    updateFilterText(newFilterText) {
        this.setState({
            filterText: newFilterText,
        })
    }

    updateSelectedPlace(newSelectedPlace) {
        this.setState({
            selectedPlace: newSelectedPlace,
        })
    }

    render() {
        return (
            <div className="app">
                <Sidebar
                    places={this.state.places}
                    filterText={this.state.filterText}
                    updateFilterText={this.updateFilterText}
                    selectedPlace={this.state.selectedPlace}
                    updateSelectedPlace={this.updateSelectedPlace}
                />
                <Map
                    center={this.state.center}
                    places={this.state.places}
                    filterText={this.state.filterText}
                    selectedPlace={this.state.selectedPlace}
                    updateSelectedPlace={this.updateSelectedPlace}
                />
            </div>
        )
    }

}
