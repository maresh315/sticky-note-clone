if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./storage');
}

class Store {
  constructor(){
		// Singleton Pattern
		if(! Store.instance){
			// this.data = new Array();
			// this.localStorage = new LocalStorage('./storage');
			Store.instance = this;
		}
		return Store.instance;
  }

	add(item){
		let incoming = JSON.stringify(item)
		localStorage.setItem(item.id, incoming);
		// this.data.push(item);
	}
	query(){
		let items = [];
		for (let i=0; i<localStorage.length; i++) {
			try {
				const key = localStorage.key(i)
				const element = localStorage.getItem(key);
				items.push(JSON.parse(element));
			} catch{// returns empty list in the event the storage is empty
				return items
			}
		}
		return items.sort();
	}
  queryById(id){
		return JSON.parse(localStorage.getItem(id))
    // return this.data.find(d => d.id === id);
	}
  // queryByTag(tag){
  //   return this.data.filter(d => d.tag === tag);
	// }

	update(item){
		let storedItem = JSON.parse(localStorage.getItem(item.id));
		storedItem.title = item.title;
		storedItem.content = item.content;
		storedItem.tag = item.tag;
		storedItem.updated = Date.now();
		this.delete(item.id);
		localStorage.setItem(item.id,JSON.stringify(storedItem))
		// let storedItem = this.data.find(d => d.id === item.id);
		// let itemIndex = this.data.findIndex(d => d.id === storedItem.id);

		// this.data[itemIndex].title = item.title;
		// this.data[itemIndex].content = item.content;
		// this.data[itemIndex].tag = item.tag;
	}

	delete(id){
		localStorage.removeItem(id)
		// let storedItem = this.data.find(d => d.id === id);
		// let itemIndex = this.data.findIndex(d => d.id === storedItem.id);

		// this.data.splice(itemIndex,1);
	}
	
}

const instance = new Store();
Object.freeze(instance); // Prevents modification to const variables properties

module.exports = instance;