const db = require('../models/models');
let geodist = require('geodist');


var getAllCustomers = function(regFunction){

    db.Customers.findAll().then(rows => {
        var allCustomers = [];
        rows.forEach(function (row) {
            let  customer = {
                id: row.dataValues.id,
                name: row.dataValues.name,
                weigth: row.dataValues.weight,
                volume: row.dataValues.volume,
                longitude: row.dataValues.longitude,
                latitude: row.dataValues.latitude}
            allCustomers.push(customer);
        });
        allCustomers.sort(( a,b )=>{
            return geodist({lat: a.latitude, lon: a.longitude}, {lat: b.latitude, lon: b.longitude})
        })
        regFunction(allCustomers);

    }).catch(err => {
        console.log('error neki',err.message);
    })
}



var addCustomer = async (obj,fun)=>{
        db.Customers.create({ name: obj.name, volume: obj.volume, weight: obj.weight, longitude: obj.longitude, latitude: obj.latitude})
            .then(row => {
                console.log("Kupac uspjesno dodata u tabelu.");
                fun();
            })
            .catch(err => {
            console.log(console.error);
            return console.log(err.message);
        })

}

const deleteCustomer = async function(customerId, reload) {
    db.Customers.destroy({
        where: {
            id: customerId,
        }
    }).catch(err => {
        console.log(err.message)
    }).then(r => {
        console.log("Kupac uspjesno izbrisan iz baze.");
        reload();
    });
};

module.exports = {
    getAllCustomers,
    addCustomer,
    deleteCustomer
};
