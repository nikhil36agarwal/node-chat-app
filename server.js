const firebase = require('firebase/app')
const firebaseConfig = {
    apiKey: "AIzaSyACz1aopUFkd1T1rgPItGzV3JmQxCiTZ9o",
    authDomain: "magnetic-rite-295010.firebaseapp.com",
    databaseURL: "https://magnetic-rite-295010-default-rtdb.firebaseio.com",
    projectId: "magnetic-rite-295010",
    storageBucket: "magnetic-rite-295010.appspot.com",
    messagingSenderId: "110347819295",
    appId: "1:110347819295:web:9b53f81c3bb8e3b6b7382a",
    measurementId: "G-GWB3LTW6ZX"
  };
firebase.initializeApp(firebaseConfig)
const {getDatabase ,ref, child , get, push, update,set} =require('firebase/database')
const db = getDatabase();
const refs = ref(db);




//Express
const express = require('express')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
http.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})
app.use(express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({ extended : true }));



var engine = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view-engine', 'html');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



let username;

app.post('/login', (req, res) => {
    
    const uname = req.body.uname;
    const pswd = req.body.pass;
    get(child(refs, 'users/'+ uname)).then((snapshot) => {
        if (snapshot.exists()) {
            if (pswd == snapshot.val().pass) {
                username = snapshot.val().name
                res.redirect('/home')
            } else {
                res.render('home.html', { status: 403 })
            }
        } else {

            res.render('home.html', { status: 403 })
        }
    }).catch((error) => {
        console.error(error);
        res.render('home.html', { status: 404 })
      
    });
})





app.post('/signup', (req, res) => {
    
    const uname = req.body.uname;
    const pswd = req.body.pass;
    const name = req.body.name;


    get(child(refs, 'users/' + uname)).then((snapshot) => {
        if (snapshot.exists()) {
            res.render('home.html', { status: 303 })
            
        } else {
            set(ref(db, 'users/'+uname), {'name': name,'pass': pswd})

            get(child(refs, 'users/'+ uname)).then((snapshot) => {
                if (snapshot.exists()) {
                    if (pswd == snapshot.val().pass) {
                        username = snapshot.val().name
                        res.redirect('/home')
                    } else {
                        res.render('home.html', { status: 403 })
                    }
                  } else {
                        res.render('home.html', { status: 403 })
                  }
            }).catch((error) => {
                console.error(error);
                res.render('home.html', { status: 404 })
            });
        }
    }).catch((error) => {
        res.render('home.html', { status: 404 })
    })

   
})


app.get('/home', (req, res) => {
    res.render('home.html', { name: username, status: 200 })
    username = null
})

//socket

const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message',msg)
    })
    // socket.on('fireapp', (fireapp) => {
    //     socket.broadcast.emit('fireapp', fireapp)
    // })
})

