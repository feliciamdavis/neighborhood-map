# Neighborhood Map

## What is it
This is a website with map and location information for part of Cupertino, California.

This is a project I worked on while completing my Nanodegree in Front End Web Development.

The project was to make a neighborhood map with at least 5 locations marked that could be filtered. We were required to use React and a Map API (I chose Mapbox) to create this website.

## Where to get it
Just go to it directly using this link:

- https://feliciamdavis.github.io/neighborhood-map/


To run it yourself, clone by following these steps in your terminal:

```
cd Desktop/(wherever you want this to be on your computer)

git clone https://github.com/feliciamdavis/neighborhood-map
```

Open `index.html` in your web browser.

## How to use it
When you load the webpage, you will have a map of Cupertino with several locations marked on the map. The location names will be listed on the left hand side of the page. There is a text box at the top left of the page for you to filter the locations by name. As you type, the markers on the map will change to only include those which you have filtered. When you click on location it shows you the location name and address. You can then use the "close" button to return to the full list of locations.

## Service Worker
When you run `npm run build` it creates an "optimized production build" that includes a service worker.

## Leaflet.js and Mapbox
This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.

## FourSquare
The FourSquare API is used to pull in information about popular locations in the neighborhood so that they can be displayed on the map.
