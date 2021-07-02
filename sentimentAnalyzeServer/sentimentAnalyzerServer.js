const express = require('express');
const app = new express();
const dotenv = require("dotenv");
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2021-03-25',
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});
return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let textIn = req.query.url;
    let analyzeParams = {
        'url': textIn,
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': false,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'sentiment': false,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults.result.entities[0].emotion);
        })
    
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    let textIn = req.query.url;
    let analyzeParams = {
        'url': textIn,
        'features': {
            'entities': {
                'emotion': false,
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': false,
                'sentiment': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults.result.entities[0].sentiment);
        })
    
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/text/emotion", (req,res) => {
    let textIn = req.query.text;
    let analyzeParams = {
        'text': textIn,
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': false,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'sentiment': false,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults.result.entities[0].emotion);
        })
    
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    let textIn = req.query.text;
    let analyzeParams = {
        'text': textIn,
        'features': {
            'entities': {
                'emotion': false,
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': false,
                'sentiment': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults.result.entities[0].sentiment);
        })
    
    .catch(err => {
        console.log('error:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

