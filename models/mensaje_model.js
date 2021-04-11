const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El nombre es obligatorio' ],
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El nombre es obligatorio' ],
    },
    mensaje: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    }
}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);