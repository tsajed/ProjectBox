var Project = require('./models/projects');
var User = require('./models/users');

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
<<<<<<< HEAD
			title   : req.body.text,
			author : "Jason gillespie",
			body : "this is a new project",
			comments : [],
			hidden : false,
			meta : { votes : 0, favs : 0}
=======
			title  : req.body.text,
			author : true,
>>>>>>> 44067b1e083ff568bb805081ac957859ec092cda
		}, function(err, todo) {
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
	
	// create user and send back all users after creation
	app.post('/api/users', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		User.create({
			title   : req.body.text,
			firstname : "Jason",
			lastname : "Gillespie",
			projects : [],
			hidden : false,
			meta : { avvotes : 0, favs : 0}
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}

			// get and return all the projects after you create another
			Project.find(function(err, users) {
				if (err) {
					res.send(err)
				}
				res.json(users);
			});
		});

	});

	// delete a project
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
	
	// delete a user
	app.delete('/api/users/:user_id', function(req, res) {
		User.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err) {
				res.send(err);
			}

			// get and return all the projects after you create another
			User.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};