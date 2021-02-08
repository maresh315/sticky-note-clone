module.exports = class Note{
	id = 0;
	title = '';
	content = '';
	tag = '';
	
	constructor({id = Date.now(),title,content,tag}){
		this.id = id
		this.title = title
		this.content = content
		this.tag = tag
	}
}