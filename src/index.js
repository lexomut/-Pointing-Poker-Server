import express from 'express'
import mongoose from 'mongoose'
import {gameRouter} from "./game/gameRouter.js";
import {playerRouter} from "./player/playerRouter.js";
import fileUpload from "express-fileupload"
const PORT =  process.env.PORT || 5000;
const DB_URL="mongodb+srv://reactjs:reactjs@cluster0.gncmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app=express()
 app.use(fileUpload({}))
app.use(express.json())
app.use('/game',gameRouter)
app.use('/player',playerRouter)
app.use('/',(req,res)=>{
  res.end('<h1>pointing-poker-server</pointing-poker-server></h1>')
})

async function startApp(){
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT,()=>console.log(`Server start on port: `,PORT));
  }
  catch (e) {

    console.log(e)
  }
}
startApp();