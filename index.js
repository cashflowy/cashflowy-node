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
		if(allowed_objects.indexOf(options.object)==-1)
			throw new Error('invalid object');
		var limit = options.limit || this.limit;
		var page = options.page || this.page;
		if(_.get(options,'query.page'))
			delete options.query.page;
		var skip = (page-1)*limit;
		var config = {
			method: 'GET',
			url: `${this.app_url}/apis/v1/${options.object}`,
			params:{
				populate:options.populate || false,
				sort:options.sort || this.sort,
				skip:skip,
				limit:limit,
				where: JSON.stringify(options.where),
			},
			headers: {
				"api-key":this.api_key,
				"api-secret":this.api_secret,
			},
			// data:options.update,
		};
		// _.merge(config.params,options.query);
		var response = await axios(config);
		return response.data;
	};
	async findOne(options){
		var results = await this.find(options);
		if(results.length==1)
			return results[0];
		else if(results.length>1)
			throw new Error('more that one object found');
		else if(results.length==0);
			throw new Error('no object found');
		
	};
	async create(options){

	};
	async updateOne(options){

	};
	async update(options){

	};
	async listObjectsToFetch(options){
		var limit = _.get(options,'query.limit')||this.limit;
		var page = _.get(options,'query.page')||this.page;
		if(_.get(options,'query.page'))
			delete options.query.page;
		var skip = (page-1)*limit;
		var config = {
			method: 'GET',
			url: `${this.app_url}/org/${options.org}/integrations/${options.integration}/${options.integration_type}/${options.tp_type}/fetch`,
			params:{
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
	}
	async fetchOneObject(options){
		var config = {
			method: 'POST',
			url: `${this.app_url}/org/${options.org}/integrations/${options.integration}/${options.third_party}/${options.tp_object}/fetch_one`,
			params:{},
			headers: {
				"api-key":this.api_key,
				"api-secret":this.api_secret,
			},
			data:options.data,
		};
		var response = await axios(config);
		return response.data;
	};
	async linkOneObject(options){
		var config = {
			method: 'POST',
			url: `${this.app_url}/org/${options.org}/integrations/${options.integration}/${options.integration_type}/${options.tp_type}/link_one`,
			params:{},
			headers: {
				"api-key":this.api_key,
				"api-secret":this.api_secret,
			},
			data:options.data,
		};
		var response = await axios(config);
		return response.data;
	};
	async passthrough(options){
		var config = {
			method: options.method,
			url: `${this.app_url}/org/${options.org}/integrations/${options.integration}/passthrough`,
			params:{
				url:options.url,
			},
			headers: {
				"api-key":this.api_key,
				"api-secret":this.api_secret,
			},
			data:options.data,
		};
		_.merge(config.params,options.params);
		var response = await axios(config);
		return response.data;
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