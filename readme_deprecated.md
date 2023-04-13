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


#### Available functions

* **cf.listObjectsToFetch(options)** 
<br /> List objects from third party that can be added(fetched) to Cashflowy. <br /> The output will also tell you if the object from third party is already present in Cashflowy. <br /> `listObjectsToFetch` is a wrapper for `GET /org/:orgID/integrations/:integrationID/{integration_name}/{object}/fetch`.

* **cf.fetchOneObject(options)**
<br /> Create an object in Cashflowy based on an object's data from third party, and create the integration lookup for the object. The resulting object in Cashflowy will have the object's third party data as its data. The Cashflowy object will also contain a mapping to the original object in the third party app. <br />
*Tip: A Cashflowy object can store integration data from multiple third party apps along with a mapping to the original objects in the third party apps.*

* **cf.linkOneObject(options)**
<br /> Link an object from third party data with the corresponding object in Cashflowy. When intending to create objects in Cashflowy, sometimes a third party app object will already be existing in Cashflowy. In such a case, `fetchOneObject` will lead to duplication. You'll want to use `linkOneObject` instead. <br />
This will do everything similar to `fetchOneObject` except that instead of creating a new object in Cashflowy, it will link the object's third-party data to an existing object in Cashflowy as integtration lookup data. <br />

* **cf.listObjectsToPush(options)** - List objects in Cashflowy that can be pushed to third party

* **cf.pushOneObject(options)** - Push one object from Cashflowy to third party

* **cf.refreshTPData(options)** - Refresh the third party data of an object already in Cashflowy

* **cf.updateWithTPData(options)** - Update Cashflowy data of a Cashflowy object with data from it's third party source. 


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
