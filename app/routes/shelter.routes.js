// routes for shelter api

module.exports = function(app) {


    var shelters = require('../controllers/shelter.controller.js');

    // create new shelter
    app.post('/shelters', shelters.create);


    // retrieve all shelters
    app.get('/shelters', shelters.findAll);


    // retrieve a single shelter with shelterId
    app.get('/shelters/:shelterId', shelters.findOne);

    // retrieve single shelter with unique_key
    //app.get('/shelters', shelters.findByUniqueKey);

    // update a shelter with shelterId
    app.put('/shelters/:shelterId', shelters.update);


    // delete a shelter with shelterId
    app.delete('/shelters/:shelterId', shelters.delete);

}
