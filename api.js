const { MongoClient }=require('mongodb');

async function main(){
         const uri = "mongodb+srv://Limon:Limonkhan,174027@cluster0.qeu8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

         const client= new MongoClient(uri);

         try {
             await client.connect();
             //await listDatabases(client);
             await readListing(client);
             
         } catch (e) {
             console.error(e);
         }finally{
             client.close();
         }

}

main().catch(console.error);

//create databases

async function creatListing(client, newListing){
const result= await client.db("test").collection('test1').insertOne(newListing);

console.log(`new listing create with the following id : ${result.insertedId}`)
}

//read databases

const array = []; 

async function readListing(client){
    const cursor = await client.db('test').collection("test1").find();

    const result = await cursor.toArray();

    result.forEach(function(doc, err){
        array.push(doc);
        
    }, function(){
        module.exports=array;
    })
}

async function listDatabases(client){
    const dataBasesList= await client.db().admin().listDatabases();
    console.log("database:");
    dataBasesList.databases.forEach(db =>{

        console.log(` -${db.name}`);

    })
}
