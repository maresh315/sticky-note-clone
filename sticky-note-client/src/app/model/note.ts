export class Note{
	id?:number
	title:string;
	content:string;
	tag:string;
	updated:Date
	
	constructor({id = Note.prototype.id,title,content,tag,updated=Note.prototype.updated}){
		this.id = id;
		this.title = title;
		this.content = content;
		this.tag = tag;
		this.updated = updated;
	}
}