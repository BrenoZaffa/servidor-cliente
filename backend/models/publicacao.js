const mongoose = require('mongoose');
const { userSchema } = require('./user');

const {Schema} = mongoose;

const publicacaoSchema = new Schema({
    titulo: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    conteudo: { type: String, required: true, minlength: 3 },
    data: { type: Date, required: true },
    estrada: { type: String, required: true, minlength: 3 },
    quilometro: { type: Number, required: true },
    usuario: {type: [userSchema]}
});

const Publicacao = mongoose.model('Publicacao', publicacaoSchema);

module.exports = Publicacao;