const express = require('express');

const db = require("../data/db-config");

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
.catch(err => {
    res.status(500).json({ errorMessage: 'Unable to get cars'});
})
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where({ id })
    .first()
    .then( car => {
        res.json(car)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Unable to get cars'})
    })
})

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars')
    .insert(carData, 'id')
    .then(ids => {
        db('cars')
        .where({ id: ids[0] })
        .then( newEntry => {
            res.status(201).json(newEntry);
        })
    })
    .catch(err => {
        console.log('POST error', err);
        res.status(500).json({ errorMessage: 'Unable to post data'})
    })
})

module.exports = router;