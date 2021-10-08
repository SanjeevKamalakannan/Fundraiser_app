const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Startup = db.startup;

const Op = db.Sequelize.Op;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  getUsers = function(){
    return User.findAll(
      { 
        where : 
        {
          username : {[Op.not]: 'admin123'} 
        }
      }
    )
    };
  getStartups = function(){
    return Startup.findAll()
    };

  var UsersPromise = getUsers();
  var StartupsPromise = getStartups();

  Promise.all([UsersPromise, StartupsPromise]).then((results)=>{
    var data = []
    data.push(results[0])
    data.push(results[1])
    return res.send(data);
  }).catch((err) => {
    return next(err);
  });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.createStartup = (req, res) => {
  Startup.create({
    startupname: req.body.data.startupName,
    startupsummary: req.body.data.startupSummary,
    startupdesc: req.body.data.startupDesc,
    startupfunds : req.body.data.startupFunds,
    fundsraised : 0,
    userId : req.body.id
  })
    .then(startup => 
      { res.send(startup);
    })
};
exports.findStartupById = (req,res) => {
  return Startup.findByPk(req.body.id)
    .then((startup) => {
      res.send({
        startupId : startup.id,
        startupName : startup.startupname,
        startupSummary: startup.startupsummary,
        startupDesc: startup.startupdesc,
        startupFunds: startup.startupfunds, 
        fundsRaised : startup.fundsraised     
      })
    })
};
exports.getUserStartups = (req,res) => {
  return User.findByPk(req.body.id, { include: ["startups"] })
    .then((startup) => {
      res.send({
        startups : startup.startups     
      })
    })
}
exports.updateStartupById = (req,res) => {
  const startupid = req.body.id;
  const intfund = Number(req.body.yourfund)
  const totalfunds = req.body.data.fundsRaised+intfund
  return Startup.findByPk(startupid)
  .then((startup) => {
    if (startup) {
      startup.update({
        fundsraised: totalfunds
      })
      .success(function () {})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Startup with id=" 
    });
  });
};
exports.updateStartupDetailsById = (req,res) => {
  const startupid = req.body.id;
  return Startup.findByPk(startupid)
  .then((startup) => {
    if (startup) {
      startup.update({
        startupname : req.body.data.startupName,
        startupdesc : req.body.data.startupDesc,
        startupsummary : req.body.data.startupSummary,
        startupfunds : req.body.data.startupFunds
      })
      .success(function () {})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Startup with id=" 
    });
  });
};
exports.getAllStartups = (req,res) => {
  return Startup.findAll()
    .then((startup) => {
      res.send(startup)
    })
};

exports.deleteStartup = (req,res) => {
  console.log("---------------------")
  const deleteid = req.body.id
  console.log(deleteid)
  Startup.destroy({
    where: { id: deleteid }
  })
    .then(num => {
      if (num == 1) {
        console.log("Tutorial was deleted successfully!")
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
}