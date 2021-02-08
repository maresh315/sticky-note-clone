export class Note{
	id?:number
	title:string;
	content:string;
	tag:string;
	
	constructor({id = Note.prototype.id,title,content,tag}){
		this.id = id
		this.title = title
		this.content = content
		this.tag = tag
	}
}