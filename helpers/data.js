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
                latitude: row.dataValues.latitude,
                posjecen: 0
            };
            allCustomers.push(customer);
        });

        let sortirani_niz = [];
        let min = Math.ceil(0);
        let max = Math.floor(allCustomers.length);
        let random_index =  Math.floor(Math.random() * (max - min)) + min;
        console.log(random_index)
        if(allCustomers.length !== 0) {
            if (allCustomers.length === 1){
                random_index = 0;
            }
            allCustomers[random_index].posjecen = 1;
            let trenutni = random_index;
            let udaljenost = 0;
            sortirani_niz.push(allCustomers[trenutni]);

            while(sortirani_niz.length !== allCustomers.length){
                let min_udaljenost = 10000000000;
                let min_index = -1;
                for(let j = 0; j<allCustomers.length; j++){
                    if(allCustomers[j].posjecen === 0){
                        udaljenost = geodist({lat: allCustomers[j].latitude, lon: allCustomers[j].longitude},
                            {lat: allCustomers[trenutni].latitude, lon: allCustomers[trenutni].longitude});
                        if (udaljenost <= min_udaljenost){
                            min_udaljenost = udaljenost;
                            min_index = j;
                        }
                    }
                }
                if (min_index === -1) {
                    break;
                }
                trenutni = min_index;
                allCustomers[min_index].posjecen = 1;
                sortirani_niz.push(allCustomers[min_index])

            }
        }

        regFunction(sortirani_niz);

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
