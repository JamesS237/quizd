'use strict';

exports.authenticate = function(req, res) {
    res.render('index');
	  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
	    res.send(401, 'Wrong user or password');
	    return;
	  }

	  var profile = {
	    first_name: 'John',
	    last_name: 'Doe',
	    email: 'john@doe.com',
	    id: 123
	  };

	  // We are sending the profile inside the token
	  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

	  res.json({ token: token });
};