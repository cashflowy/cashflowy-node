var axios = require('axios');
var _ = require('lodash');

var allowed_objects = [
	'transactions',
	'vendors',
	'purchase_order_requests',
	'integration_lookups',
]
class Cashflowy {
	constructor(options){
		this.api_key = options.api_key || '';
		this.api_secret = options.api_secret || '';
		this.app_url = options.app_url || 'https://app.cashflowy.io';
		this.limit = 100;
		this.page = 1;
		this.sort = 'createdAt DESC';
	};
	async find(options){
		console.log('\n\n\n\n\n\n=================');
		console.log('yo yo yo');

		if(allowed_objects.indexOf(options.object)==-1)
			throw new Error('invalid object');
		var limit = _.get(options,'query.limit')||this.limit;
		var page = _.get(options,'query.page')||this.page;
		if(_.get(options,'query.page'))
			delete options.query.page;
		var skip = (page-1)*limit;
		var config = {
			method: 'GET',
			url: `${this.app_url}/apis/v1/${options.object}`,
			params:{
				populate:false,
				sort:this.sort,
				skip:skip,
				limit:limit,
			},
			headers: {
				"api-key":this.api_key,
				"api-secret":this.api_secret,
			},
			// data:options.update,
		};
		_.merge(config.params,options.query);
		var response = await axios(config);
		return response.data;
	};
	async findOne(options){

	};
	async create(options){

	};
	async updateOne(options){

	};
	async update(options){

	};
}

module.exports = Cashflowy;


/*
options:{
	object:'invoice',
	filter:{},
	sort:'',
	limit:'',
	skip:'',
	page:'',
	populate:
	body:{}
}
*/
