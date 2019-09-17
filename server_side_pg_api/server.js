const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const pg = require('pg')
const PORT = 3000
const cors = require('cors')

// Connecting to Postgres
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'naseej',
    password: 'Khalil97',
    port: 5432,
    max: 10
  })

const app = express()
app.use(cors())

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

// allows us to request from reactJS client side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// DELETE DATA
app.delete('/api/delete/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    pool.connect(function(err, db, done){
        if(err) {
            return res.status(400).send(err)
        }
        else {
            db.query('DELETE FROM opportunity WHERE id=$1', [Number(id)], (err, table) => {
                done()
                if(err) {
                    return res.status(400).send(err)
                }
                else {
                    return res.status(200).send({msg: 'Opportunity Deleted !'})
                }
            })
        }
    })
})

// GET DATA
app.get('/api/opportunities', function(req, res) {
    pool.connect(function(err, db, done){
        if(err) {
            return res.status(400).send(err)
        }
        else {
            db.query('SELECT * FROM opportunity', (err, table) => {
                done()
                if(err) {
                    return res.status(400).send(err)
                }
                else {
                    return res.status(200).send(table.rows)
                }
            })
        }
    })
})

// POST DATA
app.post('/api/new-opportunity', function(res, req) {
    var id = req.body.id
    var name = req.body.name
    var source = req.body.source
    var info = req.body.info
    var how_to_apply = req.body.how_to_apply
    
    pool.connect((err, db, done) => {
        if(err) {
            return res.status(400).send(err)
        }
        else {
            db.query('INSERT INTO opportunity (id, name, source, info, how_to_apply) VALUES($1, $2, $3, $4, $5)',[id, name, source, info, how_to_apply], (err, table) => {
                done()
                if(err) {
                    return res.status(400).send(err)
                }
                else {
                    console.log('DATA INSERTED')
                    db.end()
                    res.status(201).send({msg: 'Opportunity Created !'})
                }
            })
        }
})

})

// Server
app.listen(PORT, () => console.log(`Listening on this port ${PORT}...`))