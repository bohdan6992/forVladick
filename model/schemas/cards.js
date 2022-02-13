const { Schema, model } = require('mongoose');

const Cards = new Schema({
  cardsArr: [{
    type: String,
  }]
});

module.exports = model('Cards', Cards);