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

#### listObjectsToFetch 
list objects from 3rd party that can be added to cashflowy



#### fetchOneObject
create object in cashflowy from 3rd party

#### linkOneObject
link an object from 3rd party data with the item on cashflowy

#### listObjectsToPush
list objects in cashflowy that can be pushed to a 3rd party

#### pushOneObject
push one object from cashflowy to 3rd party. 

#### refreshTPData
refresh 3rd party data
required fields
- org
- object_type
- object_id
- integration_type
- integration

#### updateWithTPData
update cashflowy data with 3rd party data. 




'fetchObjects':['frontendAPI','populateIntegration'],
	'fetchOneObject':['frontendAPI','populateIntegration'],
	'linkOneObject':['frontendAPI','populateIntegration'],
	'pushObjects':['frontendAPI','populateIntegration'],
	'pushOneObject':['frontendAPI','populateIntegration'],
	zohoCallback:true,
},
DataController:{
	'*':['isAuthenticated','canAccessThisOrg'],
	'fetchIntegrationDataAgain':['frontendAPI'],
	'updateWithIntegrationData':['frontendAPI'],