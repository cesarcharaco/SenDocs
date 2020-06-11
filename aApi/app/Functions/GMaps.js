const googleMapsClient = use('@google/maps').createClient({
  key: 'AIzaSyB3mKhXOcuQdXHsXEDHDoyHpOMjBbbaQ50',
  Promise: Promise
});
const axios = use('axios');
const attach = use('retry-axios');
const raxConfig = {
  retry: 3,
  noResponseRetries: 2,
  retryDelay: 100,
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
  backoffType: 'exponential',
  onRetryAttempt: err => {
    const cfg = attach.getConfig(err);
  }
}
const axiosInstance = axios.create(raxConfig);
const { SphericalUtil, PolyUtil } = use('node-geometry-library')

const {Client, Status} = use('@googlemaps/google-maps-services-js');
const client = new Client({axiosInstance});


async function getDistance(from, to) {
  return new Promise(async resolve => {
    client
    .distancematrix({
      params: {
        origins: from,
        destinations: to,
        key: process.env.GOOGLE_MAPS_API_KEY
      },
      timeout: 5000
    })
    .then(r => {
      resolve(r.data.rows[0].elements)
    })
    .catch(e => {
    });
  })
/*   return googleMapsClient.distanceMatrix({
    origins: from,
    destinations: to,
    mode: 'driving',
    units: 'metric'})
    .asPromise()
    .then((response) => {
      return response.json.rows[0];
    })
    .catch((err) => {
      console.log(err);
  }); */
}
async function getDistanceBetween(data) {
  let response = await SphericalUtil.computeDistanceBetween(
    {lat: 10.4411236, lng: -68.8986095}, //from object {lat, lng}
    {lat: 10.073109, lng: -69.29053800000001} // to object {lat, lng}
  );
  return response;
}

async function getContainsLocation(polygon, shops) {
  var shopsInLocations = []
  for (let i of shops) {
    let response =  await PolyUtil.containsLocation(
      { lat: i.lat, lng: i.lng}, // point object {lat, lng}
      polygon.polygon
    )
    if (response === true ) {
      shopsInLocations.push({ lat: i.lat, lng: i.lng, _id: i._id })
    }
  }

  return shopsInLocations;
}

module.exports.getDistanceBetween = getDistanceBetween;
module.exports.getContainsLocation = getContainsLocation;
module.exports.getDistance = getDistance;
