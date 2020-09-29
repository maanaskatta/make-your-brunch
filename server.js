const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const {Pool,Client} = require('pg');


	const client = new Client({
	  user: 'fvypccomzsmbpc',
	  host:  'ec2-34-202-88-122.compute-1.amazonaws.com',
	  database: 'd8ugrhvvliqcs1',
	  password: '45e15a46cb986d9326152682d44e35f95993f32b77d953bb6b4f011fcca0fb89',
	  port: 5432,
	});


// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'makeyourbrunch',
//   password: "17VF1M3326",
//   port: 5432,
// })

client.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());


//Serve Static assets if in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}




const port = process.env.PORT || 5000;


app.listen(port , () => console.log("Listening on "+ port));






app.get('/api/comments/:dishComment',(request, response) => {
  const dishComID = request.params.dishComment;

  let stmt = `SELECT * FROM comments WHERE "dishId" = ${dishComID} ORDER BY "cid" ASC`;
  client.query(stmt, (err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else if(result)
    {
      response.json(result.rows);
    }
    
  })
  
  
});

app.post('/api/comments', (request, response) => {
   let commentBody = request.body;
   let postComment = `INSERT INTO comments VALUES('${commentBody.userName}', '${commentBody.rating}', '${commentBody.comment}', '${commentBody.time}', '${commentBody.dishId}')`;
   client.query(postComment, (err, result)=>{
     if(err)
     {
       console.log(err);
     }
     //console.log("COMMENT SENT");

   })
})




app.post('/api/dishes', function (request, response) {
  let dishBody = request.body;
  //let temp = `INSERT INTO dishes VALUES ('${name}','Bbb','Ccc','Ddd','Eee','Fff','Ggg',29, 120)`;
  
  let postDishStmt = `INSERT INTO dishes VALUES('${dishBody.authorName}', '${dishBody.dishName}', '${dishBody.dishImage}', '${dishBody.dishDescription}', '${dishBody.ingredients}', '${dishBody.dishProcedure}', '${dishBody.difficulty}', '${dishBody.yeilds}', '${dishBody.prepTime}')`;
  client.query(postDishStmt,(err,result)=>{
    if(err)
    {
      console.log(err);
    }
    //client.end();
    //console.logconsole.log('DISH SENT');
  })
  
});

app.get('/api/dishes',(request, response) =>{
  let stmt = `SELECT * FROM dishes ORDER BY "dishId" DESC`;
  client.query(stmt, (err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else if(result)
    {
      response.json(result.rows);
    }
    
  })
});


app.get('/api/dishes/:dishOfId',(request, response) =>{

  const dId = request.params.dishOfId;
  //console.log(dId);
  
  let stmt = `SELECT * FROM dishes WHERE "dishId" = ${dId}`;
  client.query(stmt, (err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else if(result)
    {
      response.json(result.rows);
    }
      
  })
  
});

