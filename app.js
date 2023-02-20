const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

async function run(){
    await mongoose.connect("mongodb+srv://artendance:Qwerty123@cluster0.lvtxm2j.mongodb.net/Artendance?retryWrites=true&w=majority",(err)=>{
    // await mongoose.connect("mongodb+srv://artendance:qwerty123@cluster0.wzf1uqp.mongodb.net/Artendance?retryWrites=true&w=majority", (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected DB");
    }
});
}

run();

function splitter(s){
    var arr = s.split(":");
    console.log(arr);
    var name = arr[0].substring(3,arr[0].length-1);
    var stat = arr[1].substring(1);
    console.log(name);
    console.log(stat);

}

let sc = new mongoose.Schema({user_name:[mongoose.Schema.Types.Mixed],time:{type:String, required: true}
  }, {strict:false})

app.post('/getData', (req,res)=>{
    // console.log("Called");
    // console.log(req);
    var temp = req.body.username;
    // console.log(temp);
    let mod =  mongoose.model("students",sc);
    //user_name: NIKHIL
    // mod.find({user_name:temp},(err,data)=>{
    //     if(data===null){
    //         res.status(201);
    //         res.send("Absent!");
    //         console.log(temp + ": Attendance not registered yet!");
    //     }
    //     else{
    //         console.log(data);
    //         res.status(200);
    //         res.send(JSON.stringify(data));
    //         const a = JSON.stringify(data);
    //     }
    // })
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    if(month<9){
        month = "0"+month;
    }
    var day = d.getDate();

    var dateString = year + "-" + month + "-" + day;
// time: dateString
    mod.find({},(err,data)=>{
        if(data===null){
            res.status(201);
            res.send("Absent!");
            console.log(temp + ": Attendance not registered yet!");
        }
        else{
            // data = JSON.stringify(data);
            var flag = 0;
            // for(var j = 0;j<data[0].length;j++){
            //     if(data[0][j] == dateString){
            //         console.log("True");
            //     }
            // }
            // console.log(dateString);
            // console.log(data);
            // console.log(data[0]);
            for(var i = 0;i<data[0].user_name.length;i++){
                if(data[0].user_name[i] === temp){
                    res.status(200);
                    console.log(temp + " is present.");
                    res.send(JSON.stringify(data));
                    flag = 1;
                }
            }
            if(flag === 0){
                res.status(201);
                console.log(temp + " is absent.");
                res.send(JSON.stringify(data));
            }
            const a = JSON.stringify(data);
        }
    })

});

app.listen(5000,()=>{
    console.log("Server is up!");
});

module.exports = app;


