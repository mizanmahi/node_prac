const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_USER);
const app = express();

app.use(cors());
app.use(express.json());

const uri =
   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASS}@phero-crud.9f5td.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

//* Home route
app.get('/', (req, res) => {
   res.send('<h1>Welcome to the node practice (user management) server</h1>');
});

//* Adding an user
app.post('/users', (req, res) => {
   const newUser = req.body;
   client.connect((err) => {
      const heroesCollection = client.db('shomin-heroes').collection('heroes');

      heroesCollection
         .insertOne(newUser)
         .then((response) => res.json(response));

      //   client.close();
   });
});

//* Getting all the users
app.get('/users', (req, res) => {
   client.connect(async (err) => {
      const heroesCollection = client.db('shomin-heroes').collection('heroes');

      const cursor = heroesCollection.find({});
      const users = await cursor.toArray();
      res.send(users);

      //   client.close();
   });
});

// * Deleting an user
app.delete('/user/:id', (req, res) => {
   const id = req.params.id;

   client.connect(async (err) => {
      const heroesCollection = client.db('shomin-heroes').collection('heroes');

      heroesCollection.deleteOne({ _id: ObjectId(id) }).then((response) => {
         res.json(response);
      });

      //   client.close();
   });
});

//* Getting an user for update
app.get('/user/:id', (req, res) => {
   const id = req.params.id;
   client.connect(async (err) => {
      const heroesCollection = client.db('shomin-heroes').collection('heroes');

      const cursor = heroesCollection.find({ _id: ObjectId(id) });
      const user = await cursor.toArray();
      res.send(user);

      //   client.close();
   });
});

//* Updating an user
app.put('/users/update/:id', (req, res) => {
   const id = ObjectId(req.params.id);

   client.connect(async (err) => {
      const heroesCollection = client.db('shomin-heroes').collection('heroes');
      const { userName, email } = req.body;

      heroesCollection
         .updateOne(
            { _id: id },
            { $set: { userName, email } },
            { upsert: true }
         )
         .then((response) => {
            res.json(response);
         });

      //   client.close();
   });
});

app.listen(PORT, () => console.log('App is running on port 5000'));
