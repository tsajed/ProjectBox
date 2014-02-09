var Project = require('./models/projects');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all projects
	app.get('/api/projects', function(req, res) {

		// use mongoose to get all projects in the database
		Project.find(function(err, projects) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(projects); // return all projects in JSON format
		});
	});

	// create todo and send back all projects after creation
	app.post('/api/projects', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Project.create({
			title  : req.body.text,
			body   : "hello",
			author : true,
		}, function(err, project) {
			if (err) {
				res.send(err);
			}

			// get and return all the projects after you create another
			Project.find(function(err, project) {
				if (err) {
					res.send(err)
				}
				res.json(project);
			});
		});

	});

	// delete a todo
	app.delete('/api/projects/:project_id', function(req, res) {
		Project.remove({
			_id : req.params.project_id
		}, function(err, project) {
			if (err) {
				res.send(err);
			}

			// get and return all the projects after you create another
			Project.find(function(err, projects) {
				if (err)
					res.send(err)
				res.json(projects);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};