var express = require('express');
var router = express.Router();
var data = require('../helpers/data');

/* GET users listing. */


router.get('/',function(req, res,next){
    data.getAllCustomers((allCustomers)=>{
        res.send(allCustomers);
    })

});

router.post('/', function(req, res, next) {
    //napraviomo objekat od podataka koje smo postali na rutu i talav objekat dodajemo u lisu
    var customer = {
        name: req.body.name,
        volume: req.body.volume,
        weight: req.body.weight,
        longitude: req.body.longitude,
        latitude: req. body.latitude
    };
    //data.push(location);
    data.addCustomer(customer,function(){
        res.send('Uspjesno dodat navedeni objekat u tabelu kupac. ');
    });

});


router.delete('/:id', function(req, res, next){
    data.deleteCustomer(req.params.id,function(){
        res.send('Uspjesno izbrisan navedeni objekat iz tabele kupac. ');
    });



});

module.exports = router;
