export default {
	getSessionStorage: function( key ){
		return JSON.parse( sessionStorage.getItem( key ))
	},
	setSessionStorage( key, data){
		if(typeof data != 'string'){
			data = JSON.stringify( data )
		}
		localStorage.setItem(key, data)
	},
	getStorage( key ){
		return JSON.parse( localStorage.getItem( key ))
	},
	setStorage( key, data){
		if(typeof data != 'string'){
			data = JSON.stringify( data )
		}
		localStorage.setItem(key, data)
	},
	merge(target) {
		for (let i = 1, j = arguments.length; i < j; i++) {
			let source = arguments[i] || {};
			for (let prop in source) {
				if (source.hasOwnProperty(prop)) {
					let value = source[prop];
					if (value !== undefined) {
					  target[prop] = value;
					}
				}
			}
		}

		return target;
	}
}