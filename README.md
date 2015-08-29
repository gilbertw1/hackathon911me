# 911me

## Get Started

For the first step, you will need to install dependencies.

```
cd /path/to/hackathon911me
npm install
```

This app requires access to the Mapbox API. You will need to update apiAccess.json
with your Mapbox API credentials. An example of the apiAccess file exists as a
starting point.

```
cp apiAccess.json.example apiAccess.json
vim apiAccess.json #edit the json file to include your api key
```

To start the app:

```
node bin/www
```
