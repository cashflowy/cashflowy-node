# Cashflowy Node SDK

## Installation
```shell 
npm install cashflowy --save
```

## Documentation

Cashflowy is built using Sailsjs. Sails has Blueprint APIs. This is a wrapper that supports the Sails blueprint APIs. 
For those who are not familiar with Sailsjs, Sails supports REST/CRUD APIs out of the box. This is a wrapper for that. 

This wrapper supports CRUD: 
- Create object
- Update object
- Read object/objects
- Delete object

Cashflowy uses Blueprint APIs and some custom APIs.  

---

### Initialisation
```javascript
var Cashflowy = require('cashflowy');
var cf  = new Cashflowy({
	api_key:'some_api_key',
	api_secret:'some_api_secret',
})
```
---

### A. Blueprint APIs 

#### Supported objects 

The following objects can be queried via blueprint APIs. 
- transactions
- vendors
- users

#### Endpoints
* find
* findOne
* create
* update
* updateOne
* delete

### B. Custom APIs

#### Supported objects
* transactions
* vendors
* purchase_order_requests
* integration_lookups

#### Required data/options
* org:
* integration:
* integration_type:
* tp_type:
* sort:
* limit:
* page:

**Options - in detail**

* org:
  * Number
  * Eg. 22 (Find an organization's ID from the URL once you are logged in to Cashflowy and viewing the organization's data. `app.cashflowy.io/org/{orgID}/`
* integration: 
  * Number
  * Eg. 14 (Find an integration's ID from the URL when viewing the integration. `app.cashflowy.io/org/{orgID}/integrations/{integrationID}/`
* integration_type:
  * String. 
  * Available integration types 
    * cf_col (Cashflowy Collector App)
    * cf_gst (Cashflowy GST App)
    * cf_por (Cashflowy POR App) 
    * quickbooks
    * razorpayx
    * zoho_books
    * zoho_creator
* tp_type:
  * String
  * Available third party object types
    * transactions
    * vendors 
    * purchase_order_requests
    * integration_lookups
* Additional options
  * sort:
    * String 
      * createdAt DESC
      * createdAt ASC
  * limit:
    * Number (Eg. 100) - The number of objects to scan
  * page:
    * Number (Eg. 1) - Which page to scan from the list with multiple pages of {limit} items


#### Available actions

* listObjectsToFetch(options) - List objects from third party that can be added(fetched) to Cashflowy

* fetchOneObject(options) - Create an object in Cashflowy based on an object from third party

* linkOneObject(options) - Link an object from third party data with the corresponding object in Cashflowy

* listObjectsToPush(options) - List objects in Cashflowy that can be pushed to third party

* pushOneObject(options) - Push one object from Cashflowy to third party

* refreshTPData(options) - Refresh the third party data of an object already in Cashflowy

* updateWithTPData(options) - Update Cashflowy data of a Cashflowy object with data from it's third party source. 


---

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
