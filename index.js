const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();


const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7eooxat.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/', async(req, res)=>{
    res.send('protfolio web server is running')
});

function run (){
    try{
        const clientCommetnCollection = client.db('protfolio').collection('userComment');

        app.post('/protfolio', async(req, res)=>{
            const comment = req.body;
            const result = await clientCommetnCollection.insertOne(comment);
            res.send(result);
        });

        app.get('/protfolio', async (req, res)=>{
            const query = {};
            const userComment = await clientCommetnCollection.find(query).toArray();
            res.send(userComment);
        })

    }
    finally{

    }
}

run();

app.listen(port , () => console.log('server is running'));