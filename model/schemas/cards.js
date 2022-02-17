const { Schema, model } = require('mongoose');

const Cards = new Schema({
  cardsArr: [{
    word: String,
    translation: String
  }]
});

module.exports = model('Cards', Cards);

