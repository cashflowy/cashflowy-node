# Cashflowy Node SDK

## Installation
```shell 
npm install cashflowy --save
```

## Documentation
This library makes it simpler to use Cashflowy passthrough APIs.
Advantages of using passthough
- no overheads
- no sharing of 3rd party api credentials
- no messing with various 3rd party authentication protocols
- automation code looks clean and precise with only business logic 

### Before
``` js
var env = require('./env/por_pipeline.env.js');
async  function regeneratetoken(){
	const regenerateurl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${env.zb.refresh_token}&client_id=${env.zb.client_id}&client_secret=${env.zb.client_secret}&redirect_uri=${env.zb.redirect_uri}&grant_type=refresh_token`;
	var config ={
		method:'post',
		url:regenerateurl
	}
	return await axios(config);
	 //JSON.parse(res.body).access_token;
}

var getAccessToken = async function(){
	const access_tokenreq =  await regeneratetoken();
	const access_token = access_tokenreq.data.access_token;
	return access_token;
}
var zoho_access_token = results.getAccessToken;
var config = {
	method:'post',
	url:'https://books.zoho.in/api/v3/purchaseorders?organization_id=21341241234',
	headers: {
		'Authorization':'Zoho-oauthtoken '+zoho_access_token,
	},
	data:{
		vendor_id:results.getZohoVendorLookup.tp_id,
		purchaseorder_number:por.remote_id.trim(),
		date:por.date.substr(0,10),
		line_items:line_items,
		custom_fields: [
		  {
		    "customfield_id": "579006000000022035",
		    "value": por.remote_id,
		  }
		],
	}
}
var res = await axios(config);
return res.data.purchaseorder;

```

### After

``` js
var cf = new Cashflowy(require(`../../env/cf_app.env.js`));
var options = {
	method:'POST',
	url:'/purchaseorders', // organization_id=21341241234 also does not need to be mentioned. Cashflowy knows.
	integration:9,
	org:22,
	data:{
		vendor_id:results.getZohoVendorLookup.tp_id,
		purchaseorder_number:por.remote_id.trim(),
		date:por.date.substr(0,10),
		line_items:line_items,
		custom_fields: [
		  {
		    "customfield_id": "579006000000022035",
		    "value": por.remote_id,
		  }
		],
	}
}
var result = await cf.passthrough(options)
return result.purchaseorder;

```

### Documentation of passthrough APIs
https://docs.cashflowy.io/passthrough-api.html

#### 3rd party Tools supported by Cashflowy passthrough
- Google sheets - https://docs.cashflowy.io/passthrough-api/google-sheets/
- Zoho books - https://docs.cashflowy.io/passthrough-api/zoho-books.html
- Postgres - https://docs.cashflowy.io/passthrough-api/postgresql/
- Stripe - https://docs.cashflowy.io/passthrough-api/stripe.html
- Cashflowy POR app - https://docs.cashflowy.io/passthrough-api/por/
- Quickbooks - 
- 

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