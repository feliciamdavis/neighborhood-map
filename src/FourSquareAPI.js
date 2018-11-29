const CLIENT_ID = 'RICOZY013QG1TRXDONIAMCKDYIJP3225UJSUCNPMWX5DGDWU'
const CLIENT_SECRET = 'MQD3LI0QFZMMUUO3K3L1NRY0TMFQFMUK0MKLI0D5YKE5QKVT'

export class FourSquareAPI {

    static getVenues(lat, lng, search = '', limit = 20) {
        return fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=${limit}&ll=${lat},${lng}&query=${search}`)
            .then(response => response.json())
    }

}