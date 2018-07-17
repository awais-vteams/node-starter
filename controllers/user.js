let User = require('../model/user');
let config = require('../config/database');
let jwt = require('jwt-simple');

let functions = {
  authenticate: function (req, res) {
    console.log(req.body);
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(403).send({success: false, msg: 'Authentication failed, User not found'});
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.encode(user, config.secret);
            res.json({
              success: true,
              token: "JWT " + token,
              user: {id: user._id, name: user.name, company: user.company, role: user.role}
            });
          } else {
            return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
          }
        })
      }

    })
  },
  addNew: function (req, res) {
    if ((!req.body.email) || (!req.body.password)) {
      res.json({success: false, msg: 'Enter all values'});
    }
    else {
      let newUser = User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        company: req.body.company || '',
        city: req.body.city || '',
        address: req.body.address || '',
        phone: req.body.phone || '',
      });

      newUser.save(function (err, user) {
        if (err) {
          return res.status(406).send({success: false, msg: 'Failed to save or email already exist'})
        }
        else {
          let token = jwt.encode(user, config.secret);
          res.json({
            success: true,
            msg: 'Successfully saved',
            token: "JWT " + token,
            user: {id: user._id, name: user.name, company: user.company, role: user.role}
          });
        }
      })
    }
  },
  getUser: function (req, res) {
    User.findOne({
      _id: req.body.Id
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(403).send({success: false, msg: 'Authentication failed, Profile not found'});
      } else {
        res.json({success: true, user: user});
      }
    })
  },

  updateUser: function (req, res) {
    User.findOneAndUpdate({_id: req.body._id}, req.body, function (err, user) {
      if (err) {
        return res.status(500).send({success: false, msg:'Failed to update or Email already exist.'})
      }
      else {
        res.json({success: true, msg: 'Successfully updated'});
      }
    })
  }
};

module.exports = functions;
