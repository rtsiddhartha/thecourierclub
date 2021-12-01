const Claim = require("../models/claim.model.js");


// Create a User
exports.create = (req, res) => {
    if (!req.body.email) {
      return res.status(400).send({
        message: "Claim can not be empty",
      });
    }
  
      const claim = new Claim({
        productName: req.body.productName, 
        cost: req.body.cost,
        email: req.body.email,
        comment: req.body.comment,
        status: req.body.status
      });
  
    // Save Product in the database
    claim
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
        });
      });
  };


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Claim.find()
      .then((claims) => {
        res.send(claims);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving claims.",
        });
      });
  };
  
  // Find a single user with a userId
  exports.findOne = (req, res) => {
    Claim.findById(req.params.claimId)
      .then((claims) => {
        if (!claims) {
          return res.status(404).send({
            message: "claim not found with id " + req.params.claimId,
          });
        }
        res.send(claims);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.claimId,
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.claimId,
        });
      });
  };
  
  // Update a product identified by the productId in the request
  exports.update = (req, res) => {

    const claim = new Claim({
      _id: req.params.claimId,
      productName: req.body.productName, 
      cost: req.body.cost,
      email: req.body.email,
      comment: req.body.comment,
      status: req.body.status
  });
  
    // Find product and update it with the request body
    Claim.findByIdAndUpdate(
      req.params.claimId,
      claim,
      { new: true }
    )
      .then((claim) => {
        if (!claim) {
          return res.status(404).send({
            message: "User not found with id " + req.params.claimId,
          });
        }
        res.send(claim);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.claimId,
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + req.params.claimId + err,
        });
      });
  };
  