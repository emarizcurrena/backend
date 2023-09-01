import mongoose from 'mongoose'

//MONGOOSE
const URI = 'mongodb+srv://emarizcurrena:Autenticosdecadentes7@cluster0.agfidzr.mongodb.net/43400DB?retryWrites=true&w=majority'
mongoose.connect(URI)
    .then(() => console.log('conectado a la db'))
    .catch(error => console.log(error))