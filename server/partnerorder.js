const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get object
router.get('/', async (req,res) => {
    const data = await loadPartnerOrderCollection();
    res.socket.setNoDelay();
    res.send(await data.find({}).toArray());
});

//insert object
router.post('/', async(req,res) => {
    const data = await loadPartnerOrderCollection();
    
    await data.insertOne(
        req.body
    );
    res.status(201).send();
});


//edit dbdata
router.put("/updatedata", async (req,res) => {
    const data = await loadPartnerOrderCollection();
    let querry = {_id: new mongodb.ObjectID(req.body._id)}

    let updateObj = { $set :{
        id : req.body.id,
        name: req.body.name,
        active: req.body.active,
        orders: req.body.orders,
    }}
        
    data.updateOne(querry, updateObj, function(err, res) {
        if (err) throw err;
        });
        
    res.status(200).send();
});


async function loadPartnerOrderCollection() {
    //const uri = 'mongodb://localhost/'
    const uri = process.env.NODE_ENV === 'production'? 'mongodb+srv://djole:Ord3rcontrol@cluster0-y2psw.mongodb.net/test?retryWrites=true&w=majority' 
    : 'mongodb+srv://rajovicmirko:Mirkasin.12345@cluster0-folf1.mongodb.net/admin?retryWrites=true&w=majority';
    const dbName = 'orders'
    const collection = 'partnerorder'

    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const data = client.db(dbName).collection(collection);

    return data;
}
module.exports = router;
