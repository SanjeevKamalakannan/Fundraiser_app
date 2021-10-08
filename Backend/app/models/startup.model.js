module.exports = (sequelize, Sequelize) => {
    const Startup = sequelize.define("startups", {
      startupname: {
        type: Sequelize.STRING
      },
      startupsummary: {
        type: Sequelize.TEXT
      },
      startupdesc: {
        type: Sequelize.TEXT
      },
      startupfunds: {
        type: Sequelize.INTEGER
      },
      fundsraised: {
        type: Sequelize.INTEGER
      }
    });
  
    return Startup;
  };
  