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
	
	app.get('/api/projects/user/:name', function(req, res) {

	
		// use mongoose to get all projects in the database
		Project.find({ 'author' : req.params.name} , function(err, projects) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(projects); // return all projects in JSON format
		});
	});
	
	app.get('/api/users', function(req, res) {
	
		User.findOne({ 'username' : req.body.text,
						'password' : req.body.descr }, function (err, user) {
						
			if (err) return handleError(err);
			if (user == null) {

				res.json(user);
				return;
			}
			console.log(req.body.username);
			console.log(req.body.password);
			res.json(user);
		});
	});
			
				
			
		

	// create project and send back all projects after creation
	app.post('/api/projects', function(req, res) {

		// create a project, information comes from AJAX request from Angular
		Project.create({
			title   : req.body.text,
			author : "Jason gillespie",
			body : req.body.descr,
			url : req.body.url,
			category : req.body.category,
			comments : [],
			hidden : false,
			up : 0,
			down: 0,
			meta : { votes : 0, favs : 0}
		}, function(err, project) {
			if (err) {
				res.send(err);
			}

			// get and return all the projects after you create another
			Project.findOne({ _id : project._id}, function(err, project) {
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
				//res.send("username taken");
				return;
			}
			
		// create a project, information comes from AJAX request from Angular
			user = {
				title   : "student2343",
				username : req.body.text,
				password : req.body.descr,
				firstname : "Jason",
				lastname : "Gillespie",
				projects : [],
				hidden : false,
				meta : { avvotes : 0, favs : 0}

			};
			
			User.create(user , function(err, project) {

				if (err) {
					res.send(err);
				} 
				
				res.json(user);
				console.log(user.username);
			});
						
		});

	});
	
	app.post('/api/users/vote/:vote_num', function(req, res) {
	
		User.findOne({ 'username' : req.body.text }, function (err, user) {
			if (err) return handleError(err);
			if (user == null) {
				res.json(user);
				//res.send("username taken");
				return;
			}
			
			var votes = user.avvotes + req.params.vote_num;
			var number = user.number + 1;
			
			User.update({ 'username' : req.body.text }, { 'avvotes' : votes }, { multi: true }, 
				function (err, numberAffected, raw) {
					if (err) return handleError(err);
					console.log('The number of updated documents was %d', numberAffected);
					console.log('The raw response from Mongo was ', raw);
			});
		});
	});
	
	app.post('/api/projects/vote/:project_id', function(req, res) {
	
		
		Project.findOne({ _id : req.params.project_id }, function (err, project) {
			if (err) return handleError(err);
			if (project == null) {
				res.json(project);
				//res.send("username taken");
				return;
			}

			var num = 0;
			
			if(req.body.type == 'up') {
				num = project.up + 1;
			
				Project.update({ _id : req.params.project_id }, { 'up' : num }, { multi: true }, 
					function (err, numberAffected, raw) {
						if (err) return handleError(err);
						console.log('The number of updated documents was %d', numberAffected);
						console.log('The raw response from Mongo was ', raw);
						
						res.json(project);
				});
			}
			else {
			
				num = project.down + 1;
			
				Project.update({ _id : req.params.project_id }, { 'down' : num }, { multi: true }, 
					function (err, numberAffected, raw) {
						if (err) return handleError(err);
						console.log('The number of updated documents was %d', numberAffected);
						console.log('The raw response from Mongo was ', raw);
						
						res.json(project);
				});
			}
		});
	});
	
	app.post('/api/comment/:project_id', function(req, res) {
	
		var id = (req.params.project_id);
		Project.findOne({ _id	: req.params.project_id }, function (err, project) {
			if (err) return handleError(err);
			if (project == null) {
				res.json(project);
				//res.send("username taken");
				return;
			}
			
			var comments = project.comments;
			comments.push(req.body.comment);
			
			Project.update({ _id : req.params.project_id }, { 'comments' : comments }, { multi: true }, 
				function (err, numberAffected, raw) {
					if (err) return handleError(err);
					console.log('The number of updated documents was %d', numberAffected);
					console.log('The raw response from Mongo was ', raw);
					console.log(project.comments[0]);
					res.json(project);
			});
		});
	});
	
	app.post('/api/users/project/:project_id', function(req, res) {
	
		User.findOne({ 'username' : req.body.username }, function (err, user) {
			if (err) return handleError(err);
			if (user == null) {
				res.json(user);
				//res.send("username taken");
				return;
			}
			
			user.projects.push(req.params.project_id);
			
			User.update({ 'username' : req.body.username }, { 'projects' : user.projects }, { multi: true }, 
				function (err, numberAffected, raw) {
					if (err) return handleError(err);
					console.log('The number of updated documents was %d', numberAffected);
					console.log('The raw response from Mongo was ', raw);
					res.json(user);
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

			// get and return all the projects after you delete another
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

			User.find(function(err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file
	});
	
	app.get('/login/:username', function(req, res) {
		res.redirect('profile.html');
		res.json({ username : req.params.username});
	});
};