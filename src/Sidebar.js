import React from 'react'
import './Sidebar.css'

export class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        // Bind event handlers to *this* this
        this.filterTextChanged = this.filterTextChanged.bind(this)
        this.placeButtonClicked = this.placeButtonClicked.bind(this)
        this.closeButtonClicked = this.closeButtonClicked.bind(this)
    }

    filterTextChanged(event) {
        const newFilterText = event.target.value
        this.props.updateFilterText(newFilterText)
    }

    placeButtonClicked(event) {
        const placeButton = event.target
        const foundPlace = this.props.places.find(place => place.venue.name === placeButton.innerText)
        this.props.updateSelectedPlace(foundPlace)
    }

    closeButtonClicked() {
        this.props.updateSelectedPlace(undefined)
        this.props.updateFilterText('')
    }

    render() {
        return (
            <section className="sidebar">
                {
                    !this.props.selectedPlace
                        ? this.renderFilterAndResults()
                        : this.renderSelectedPlaceInfo()
                }
                <div className="legal">Location information by Foursquare</div>
            </section>
        )
    }

    renderFilterAndResults() {
        const lowerCaseFilterText = this.props.filterText.toLowerCase()
        const filteredPlaces = this.props.places.filter(place => {
            const lowerCaseName = place.venue.name.toLowerCase()
            return lowerCaseName.includes(lowerCaseFilterText)
        })
        return (
            <div>
                <div className="filter-bar">
                    <input type="text" placeholder="Filter by Location Name" onChange={this.filterTextChanged}></input>
                </div>
                <div className="filter-results">
                    {
                        filteredPlaces.length > 0
                            ? this.renderPlaces(filteredPlaces)
                            : this.renderPlacesEmpty()
                    }
                </div>
            </div>
        )
    }

    renderSelectedPlaceInfo() {
        const venue = this.props.selectedPlace.venue
        return (
            <div className="selected-place">
                <div>
                    {venue.name}
                </div>
                <div>
                    {venue.location.formattedAddress.map(addrLine => {
                        return (
                            <div key={addrLine}>
                                {addrLine}
                            </div>
                        )
                    })}
                </div>
                <button className="close" onClick={this.closeButtonClicked}>
                    Close and Return to List
                </button>
            </div>
        )
    }

    renderPlaces(filteredPlaces) {
        return (
            <ol>
                {filteredPlaces.map(place => {
                    return (
                        <li key={place.venue.id}>
                            <button onClick={this.placeButtonClicked}>
                                {place.venue.name}
                            </button>
                        </li>
                    )
                })}
            </ol>
        )
    }

    renderPlacesEmpty() {
        return (
            <div className="warning">
                No Places Found
            </div>
        )
    }

}