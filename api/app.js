const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

const { List, Task } = require('./db/models');
 
//corse header middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//Load middleware
app.use(bodyParser.json());

/**
 * GET list/
 * purpose: Get all list
 */

app.get('/lists', (req, res) => {
    List.find().then((lists) => {
        res.send(lists);
        console.log("all lists" + lists)
    }).catch((e) => {
        res.send(e);
    })
    //we want to return an array of all the lists in the database
});

app.post('/lists', (req, res) => {
    //we want to create new list and return the new list document back to the user (which include id)
    let title = req.body.title;
    let newlist = new List({
        title: title
    });
    newlist.save().then((listDoc) => {
        //the full list document is returned
        res.send(listDoc);
        console.log("document save" + listDoc);
    }).catch((e) => {
        console.log("Erro while creating list " + e);
    })


});

app.patch('/lists/:id', (req, res) => {
    //we want to update a list with specified id
    List.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    }).catch((e) => {
        res.send(e);
    });
})

app.delete('/lists/:id', (req, res) => {
    //we want to delete specified list

    List.findOneAndRemove({
        _id: req.params.id
    }).then((removeDocList) => {
        res.send(removeDocList);
    })
})

/**
 * FOR Task 
 * GET
 * POST
 * DELETE
 * 
 */


app.get('/lists/:listId/task', (req, res) => {
    //we want to return all task that belongs to specific list id
    Task.find({ _listId: req.params.listId }).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        console.log(e);
    });
});



app.post('/lists/:listId/task', (req, res) => {
    //we want to add task in the specific list id
    let title = req.body.title;
    let listId = req.params.listId;

    const task = new Task({
        title: title,
        _listId: listId
    })

    task.save().then((task) => {
        res.send(task);
    }).catch((e) => {
        console.log(e);
    })
});




app.delete('/lists/:listId/task/:taskId', (req, res) => {
    //delete specific task from specific list
    Task.findOneAndRemove({
        _listId: req.params.listId,
        _id: req.params.taskId
    }).then((task) => {
        res.send(task);
    }).catch((e) => {
        res.send(e);
    })
})

app.patch('/lists/:listId/task/:taskId', (req, res) => {
    //update title of specific task in specific list
    Task.findOneAndUpdate({
        _listId: req.params.listId,
        _id: req.params.taskId
    }, { $set: req.body }).then(()=>{
        res.sendStatus(200);
    }).catch((e)=>{
        res.send(e);
    })

});


app.listen(3000, () => {
    console.log("Server is lestining on port 3000");
});