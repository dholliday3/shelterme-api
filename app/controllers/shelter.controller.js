

var Shelter = require('../models/shelter.model.js');

exports.create = function(req, res) {
    // create and save a new shelter
    if(!req.body) {
        return res.status(400).send({message: "Shelter cannot be empty " + req.body});
    }

    var shelter = new Shelter({unique_key: req.body.unique_key,
                            shelter_name: req.body.shelter_name,
                            capacity: req.body.capacity,
                            restrictions: req.body.restrictions,
                            longitude: req.body.longitude,
                            latitude: req.body.latitude,
                            address: req.body.address,
                            special_notes: req.body.special_notes,
                            phone_number: req.body.phone_number
                            });

    shelter.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "some error occured while creating a shelter"});
        } else {
            res.send(data);
        }
    });

};

exports.findAll = function(req, res) {

    if (req.query.unique_key) {
        req.query.unique_key = Number(req.query.unique_key);
    }

    Shelter.find(req.query, function(err, shelter) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "some error occurred while retrieving all shelters."});
        } else {
            res.send(shelter[0]);
        }
    });

    // retrieve and return all notes from databse
    Shelter.find(function(err, shelters){
        if(err) {
            console.log(err);
            res.status(500).send({message: "some error occurred while retrieving all shelters."});
        } else {
            res.send(shelters);
        }
    });
};

exports.findOne = function(req, res) {
    // find single shelter with shelterId
    Shelter.findById(req.params.shelterId, function(err, shelter) {


        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Shelter not found with id " + req.params.shelterId});
            }
            return res.status(500).send({message: "error retrieving shelter with id " + req.params.shelterId});
        }

        if(!shelter) {
            return res.status(404).send({message: "shelter found with id " + req.params.shelterId});
        }

        res.send(shelter[0]);
    });

};

/*
exports.findByUniqueKey = function(req, res) {
    // find single shleter with unique_key
    Shelter.find(req.query, function(err, shelter) {
        if(err) {
            console.log(err);
            return res.status(500).send({message: "error retrieving shelter with unique_key " + req.query.unique_key});
        }
        if(!shelter) {
            return res.status(404).send({message: "shelter found with unique_key" + req.query.unique_key});
        }

        res.send(shelter);
    });
}
*/


exports.update = function(req, res) {
    //update note ID'd with teh shelterId in the request
    Shelter.findById(req.params.shelterId, function(err, shelter) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Shelter not found with id " + req.params.shelterId});
            }
            return res.status(500).send({message: "Error finding note with id " + req.params.shelterId});
        }

        if(!shelter) {
            return res.status(404).send({message: "Shelter not found with id " + req.params.shelterId});
        }

        shelter.unique_key = req.body.unique_key;
        shelter.shelter_name = req.body.shelter_name;
        shelter.capacity = req.body.capacity;
        shelter.restrictions = req.body.restrictions;
        shelter.longitude = req.body.longitude;
        shelter.latitude = req.body.latitude;
        shelter.address = req.body.address;
        shelter.special_notes = req.body.special_notes;
        shelter.phone_number = req.body.phone_number;

        shelter.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update shelter with id " + req.params.shelterId});
            } else {
                res.send(data);
            }
        });
    });
};


exports.delete = function(req, res) {
    // delete a shetler with specified shelterId
    Shelter.findByIdAndRemove(req.params.shelterId, function(err, shelter) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Shelter not found with id " + req.params.shelterId});
            }
            return res.status(500).send({message: "Could not delete shelter with id " + req.params.shelterId});
        }

        if(!shelter) {
            return res.status(404).send({message: "Shelter not found with id " + req.params.shelterId});
        }

        res.send({message: "Shelter deleted successfully!"})
    });
};
