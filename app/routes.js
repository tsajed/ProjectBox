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
			title   : req.body.text,
			author : "Jason gillespie",
			body : req.body.descr,
			comments : [],
			hidden : false,
			meta : { votes : 0, favs : 0}
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
	
	// create user and send back all users after creation
	app.post('/api/users', function(req, res) {

		// Find if username already exists
		User.findOne({ 'username' : req.body.text }, function (err, user) {
			if (err) return handleError(err);
			if (user != null) {
				user = null;
				res.json(user);
				return 0;
			}
			
		
		// create a todo, information comes from AJAX request from Angular
			User.create({
				title   : "student2343",
				username : req.body.text,
				password : req.body.descr,
				firstname : "Jason",
				lastname : "Gillespie",
				projects : [],
				hidden : false,
				meta : { avvotes : 0, favs : 0}
			}, function(err, todo) {
				if (err) {
					res.send(err);
				}

				// get and return user object 
				User.findOne({ 'username' : req.body.text }, function (err, user) {
					if (err) return handleError(err);
					console.log(user.title);
					console.log(req.body.descr);
					res.json(user);
				});
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
			User.find(function(err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};