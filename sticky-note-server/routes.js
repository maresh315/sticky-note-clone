const express = require('express');
const store = require('./store');
const Note = require('./models');

const router = express.Router();


// get all notes
router.get('/notes', (req, res) =>{
	// let notes = store.data
	let notes = [];
	for (let i = 0; i < localStorage.length; i++) {
		const element = array[i];
		notes.push(element);
	}
	res.send(notes);
});

// router.get('/notes/:tag', (req,res) =>{
// 	let tag = String(req.params.tag);
// 	res.send(store.queryByTag(tag))
// })

// get a note
router.get('/note/:id', (req, res) =>{
	let id = Number(req.params.id);
	res.send(store.queryById(id));
})

// create a note
router.post('/notes', (req, res) =>{
	let note = new Note({
		title: req.body.title,
		content: req.body.content,
		tag: req.body.tag
	});

	store.add(note);
	res.status(200).send()
});

// update a note
router.put('/notes/:id',(req, res) =>{
	let note = new Note({
		id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		tag: req.body.tag
	});

	store.update(note);
	res.status(200).send()
});

// delete a note
router.delete('/notes/:id', (req, res) =>{
	let id = Number(req.params.id);
	store.delete(id);
	res.status(200).send()
});

module.exports = router;