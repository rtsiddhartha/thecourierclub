module.exports = (app) => {
    const claims = require('../controllers/claim.controller.js');

    // Create
    app.post('/claim', claims.create);

    // Retrieve all
    app.get('/claims', claims.findAll);

    // Retrieve a single 
    app.get('/claim/:claimId', claims.findOne);

    app.post('/claim/:claimId', claims.update);
}