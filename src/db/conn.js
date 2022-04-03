const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://AkshayNew:AKShay8375@registeredusersdetail.cbd1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useUnifiedTopology:true,

}).then(()=>{
    console.log('connection successful');
}).catch((e)=>console.error(`The error is ${e}`) )