const express= require('express');
const path= require('path');
const exphbs= require('express-handlebars');
const logger=require('./middleware/logger');
const moment=require('moment');
const members= require('./Members');
//const content = require('./api');
const {MongoClient, MongoParseError}= require('mongodb');
const res = require('express/lib/response');
const { createRequire } = require('module');
var uniqid = require('uniqid');
const { allowedNodeEnvironmentFlags } = require('process');

const app= express();


//API section

//slider making

const slider =[
  {
    '$limit': 9
  }, {
    '$sort': {
      'time': -1
    }
  }
]
  const bgCard = [
    {
      '$sort': {
        'time': -1
      }
    }, {
      '$limit': 13
    }
  ];


const entertainment =[
  {
    '$match': {
      'catagory': 'Entertainment'
    }
  }
] ;
const sports =[
  {
    '$match': {
      'catagory': 'FootBall'
    }
  }
] ;

const health =[
  {
    '$match': {
      'catagory': 'Health'
    }
  }
] ;

const cricket =[
  {
    '$match': {
      'catagory': 'Cricket'
    }
  }
] ;
const technology =[
  {
    '$match': {
      'catagory': 'Technology'
    }
  }
] ;

const world =[
  {
    '$match': {
      'catagory': 'World'
    }
  }
] ;

const education =[
  {
    '$match': {
      'catagory': 'Educational'
    }
  }
] ;



app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'views')));



app.use(logger);

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));





app.get('/', async (req, res) => {
   const url = "mongodb+srv://Limon:Limonkhan,174027@cluster0.qeu8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
   const client  = await new MongoClient(url);
   await client.connect();
    
    const cursor_slider  = await client.db("test").collection("test1").aggregate(slider);
     const result_slider = await cursor_slider.toArray();
     const cursor_bgCard  = await client.db("test").collection("test1").aggregate(bgCard);
     const result_bgCard = await cursor_bgCard.toArray();
    
   
    res.render('index', {
        title: 'member app',
        result_slider:result_slider,
        result_bgCard:result_bgCard,
    })
})
//get search 





//set a new article routes
app.post('/new', async (req, res)=> {
    const url = "mongodb+srv://Limon:Limonkhan,174027@cluster0.qeu8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client  = await new MongoClient(url);
    await client.connect();
    const newList  = await client.db("test").collection("test1").insertOne({
         id: uniqid(''),
         name: req.body.title,
         image: req.body.image,
         catagory: req.body.catagory,
         headline: req.body.floatingTextarea,
         detail_1: req.body.floatingTextarea1,
         detail_2: req.body.floatingTextarea2,
         time: moment().format('LLL')
         
     });
     
     res.redirect('/new');
     
    
     
 })

app.get('/new', async (req, res)=> {
    const url = "mongodb+srv://Limon:Limonkhan,174027@cluster0.qeu8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client  = await new MongoClient(url);
    await client.connect();
     const cursor_slider  = await client.db("test").collection("test1").aggregate(slider);
     const result_slider = await cursor_slider.toArray();
     
    
     res.render('new', {
         title: 'member app',
         result_slider
     })
 })

 //create routes for every article

 app.get('/:id', async (req,res)=>{
  const url = "mongodb+srv://Limon:Limonkhan,174027@cluster0.qeu8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client  = await new MongoClient(url);
  await client.connect();
  const all =await client.db("test").collection("test1").find({});
  const all_n  = await all.toArray();

  //api for catagory
  const cursor_slider  = await client.db("test").collection("test1").aggregate(slider);
     const result_slider = await cursor_slider.toArray();


     const cursor_bgCard  = await client.db("test").collection("test1").aggregate(bgCard);
     const result_bgCard = await cursor_bgCard.toArray();


  const entertainment_cursor= await client.db("test").collection("test1").aggregate(entertainment);
  const entertainment_result= await entertainment_cursor.toArray();


  const sports_cursor= await client.db("test").collection("test1").aggregate(sports);
  const sports_result= await sports_cursor.toArray();


  const health_cursor= await client.db("test").collection("test1").aggregate(health);
  const health_result= await health_cursor.toArray();

  const cricket_cursor= await client.db("test").collection("test1").aggregate(cricket);
  const cricket_result= await cricket_cursor.toArray();


  const technology_cursor= await client.db("test").collection("test1").aggregate(technology);
  const technology_result= await technology_cursor.toArray();

  const world_cursor= await client.db("test").collection("test1").aggregate(world);
  const world_result= await world_cursor.toArray();

  const educational_cursor= await client.db("test").collection("test1").aggregate(education);
  const educational_result= await educational_cursor.toArray();
  //condition for all api 
  const found  = await all_n.some((member) => member.id  == req.params.id);
  const find = await all_n.filter((member) => member.id  == req.params.id);
  const sportsfound  = await sports_result.some((member)=> member.catagory==req.params.id);
  const entertainment_found = await entertainment_result.some((member)=> member.catagory==req.params.id);
  const health_found = await health_result.some((member)=> member.catagory==req.params.id);
  const cricket_found = await cricket_result.some((member)=> member.catagory==req.params.id);
  const technology_found = await technology_result.some((member)=> member.catagory==req.params.id);
  const world_found = await world_result.some((member)=> member.catagory==req.params.id);
  const educational_found = await educational_result.some((member)=> member.catagory==req.params.id);


  if(found){
    res.render('article',{
      find,
      result_slider,
      result_bgCard,
    });
  }
  else if(sportsfound){
    res.render('catagory',{
      sports_result,
      result_slider,
    });
  }else if(entertainment_found){
    res.render('entertainment',{
      entertainment_result,
      result_slider
    })
  }else if(health_found){
    res.render('health',{
      health_result,
      result_slider
    })
  }else if(cricket_found){
    res.render('cricket',{
      cricket_result,
      result_slider
    })
  }else if(technology_found){
    res.json(technology_result);
  }else if(world_found){
    res.json(world_result);
  }else if(educational_found){
    res.json(educational_result);
  }else{
    res.status(400).json({msg: 'bad request'})
  }
 
 })
 //searching engine 

 

 


app.use('/api/members', require('./routes/api/member'));

const PORT= process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));