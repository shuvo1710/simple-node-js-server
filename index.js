const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
// const { query } = require('express')
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const users =[
    {id:1, name:"nahid",email:"nahid@gmail.com"},
    {id:2, name:"nabila",email:"nabila@gmail.com"},
    {id:3, name:"nabida",email:"nabida@gmail.com"},
]
// userName: shuvo01
// password: gdiKe9nHY7Jp0xDd



const uri = "mongodb+srv://shuvo01:gdiKe9nHY7Jp0xDd@cluster0.1mrcu36.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    const userCollection = client.db('simpleNode').collection('users')
    const user = {name:'nahiyamahi', email:'nahi@gmail.com'}
    // const result = await userCollection.insertOne(user)
    // console.log(result)

    app.get('/users', async(req,res)=>{
        const cursor = userCollection.find({})
        const users = await cursor.toArray()
        res.send(users)
    })



    app.post('/users', async(req,res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user)
        console.log(result)
        user._id= result.insertedId;
        res.send(user)
    })


}
finally{
    
}

}
run().catch((error)=>console.log(error))

app.get('/users', (req,res)=>{
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(usr =>usr.name.toLowerCase().indexOf(search))
        res.send(filtered)
    }
    else{
        res.send(users)
    }
    
})
// app.post('/users',(req,res)=>{
//     console.log('post api called')
//     console.log(req.body)
//     const user = req.body;
//     user.id= users.length + 1;
//     users.push(user)
//     console.log(user)
//     res.send(user)
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})