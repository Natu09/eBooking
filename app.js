var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();

const {Pool, Client} = require('pg');    

    //Connection String
    var connect = "postgres://cpsc_471:e-booking19@e-booking-db.cfwfxw7xy4fu.us-east-2.rds.amazonaws.com/ebooking_DB";

    //Client setup
    const client = new Pool({
        connectionString: connect,
      });

    //Assign Dust Engine to .dust files
    app.engine('dust', cons.dust);

    //Set .dust default extension 
    app.set('view engine', 'dust');
    app.set('views', __dirname + '/views');

    //set public folder
    app.use(express.static(path.join(__dirname, 'public')));

    //body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    

    //Routes
    app.get('/', function(req, res) {
        client.connect();
        client.query('SELECT * FROM public.appointment WHERE doctor_id = 7', (err, result) => {
            if (err) {
              console.log(err.stack)
            } else {
              res.render('index', {data : result.rows})
            }
            
          })
    });

   
    app.post('/add', function(req, res) {
        client.connect();
        if (err) { return console.error('error fetching client from pool', err)}
        client.query('INSERT INTO availabilities(userid, start_time, end_time) VALUES($1, $2, $3)', [7, req.body.startTime, req.body.endTime]);
        res.redirect('/')    
    })

    app.delete('/delete/:id', function(req, res) {
        client.connect();
        if (err) { return console.error('error fetching client from pool', err)}
        client.query('DELETE FROM public.appointment WHERE id = $1', [req.params.id]);
        res.send(200)
    })

   

    //Server
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });