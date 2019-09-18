const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:data');


const Customers = sequelize.define('customer',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,

    },
    adress:{
        type: Sequelize.STRING,
        allowNull: true
    },
    volume:{
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    weight:{
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    name:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    }
});

const createTables = function() {

    sequelize.sync({ logging: console.log, force: true }).then(fullfil => {

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');

            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

    });
};

//sve lokacije

const locationList = sequelize.define('location', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});


locationList.belongsTo(Customers, {
    foreignKey: 'id_customer',
    targetKey: 'id'
});

module.exports.Customers = Customers;
module.exports.locationList = locationList;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.createTables = createTables;