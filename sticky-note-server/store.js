
class Store {
  constructor(){
		// Singleton Pattern
		if(! Store.instance){
			this.data = new Array();
			Store.instance = this;
		}
		return Store.instance;
  }

	add(item){
		localStorage.setItem(item.id, item);
		// this.data.push(item);
	}
	
  queryById(id){
		return localStorage.getItem(id)
    // return this.data.find(d => d.id === id);
	}
  // queryByTag(tag){
  //   return this.data.filter(d => d.tag === tag);
	// }

	update(item){
		let storedItem = localStorage.getItem(item.id);
		storedItem.title = item.title;
		storedItem.content = item.content;
		storedItem.tag = item.tag;
		localStorage.setItem(item.id,storedItem)
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