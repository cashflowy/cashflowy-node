# Cashflowy Node SDK

## Installation
```shell 
npm install cashflowy --save
```

## Documentation

Cashflowy is build using Sailsjs. Sails has blueprint APIs. This is a wrapper that supports sails blueprint APIs. For those how are not familiar with Sailsjs, Sails supports REST/CRUD APIs out of the box. This is a wrapper for that. 

This wrapper supports CRUD: 
- Create object
- Update object
- Read object/objects
- Delete object

Cashflowy uses blueprint APIs and some custom APIs.  

### Initialisation
```javascript
var Cashflowy = require('cashflowy');
var cf  = new Cashflowy({
	api_key:'some_api_key',
	api_secret:'some_api_secret',
})
```

### Blue print APIs 

#### Supported objects 

The following objects can be queried via blueprint APIs. 
- transactions
- vendors
- users
- 

#### Find

#### FindOne

#### Create

#### Update

#### UpdateOne

#### Delete

### Custom API endpoints
These end points are shared with 