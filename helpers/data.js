const db = require('../models/models');
let geodist = require('geodist');

var getAllCustomers = function(regFunction){

    db.Customers.findAll().then(rows => {
        var allCustomers = [];
        rows.forEach(function (row) {
            let  customer = {
                id: row.dataValues.id,
                name: row.dataValues.name,
                weight: row.dataValues.weight,
                volume: row.dataValues.volume,
                adress: row.dataValues.adress,
                longitude: row.dataValues.longitude,
                latitude: row.dataValues.latitude,
                visited: 0
            };
            allCustomers.push(customer);
        });

        let sorted = [];
        let min = Math.ceil(0);
        let max = Math.floor(allCustomers.length);
        let random_index =  Math.floor(Math.random() * (max - min)) + min;
        console.log(random_index)
        if(allCustomers.length !== 0) {
            if (allCustomers.length === 1){
                random_index = 0;
            }
            allCustomers[random_index].visited = 1;
            let curent_index = random_index;
            let dist = 0;
            sorted.push(allCustomers[curent_index]);

            while(sorted.length !== allCustomers.length){
                let min_dist = 10000000000;
                let min_index = -1;
                for(let j = 0; j<allCustomers.length; j++){
                    if(allCustomers[j].visited === 0){
                        dist = geodist({lat: allCustomers[j].latitude, lon: allCustomers[j].longitude},
                            {lat: allCustomers[curent_index].latitude, lon: allCustomers[curent_index].longitude});
                        if (dist <= min_dist){
                            min_dist = dist;
                            min_index = j;
                        }
                    }
                }
                if (min_index === -1) {
                    break;
                }
                curent_index = min_index;
                allCustomers[min_index].visited = 1;
                sorted.push(allCustomers[min_index])

            }
        }

        regFunction(sorted);

    }).catch(err => {
        console.log('error neki',err.message);
    })
}



var addCustomer = async (obj,fun)=>{
        db.Customers.create({ name: obj.name, volume: obj.volume, weight: obj.weight, adress: obj.adress, longitude: obj.longitude, latitude: obj.latitude})
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
