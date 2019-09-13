const { Router } = require('express');

const router = Router();


router.get("/", (req, res) => {
	res.render("index");
});

//upload
router.post('/upload', (req, res) => {
	if(req.files != null){
		console.log(req.files);
		console.log(req.body);
	}else{
		console.log("No files selected");
	}
	res.send({response: true});
});

module.exports = router;