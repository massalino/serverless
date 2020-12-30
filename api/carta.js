'use strict';


const uuid = require('uuid');
const AWS = require('aws-sdk'); 
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//export async function enviar(event) {
module.exports.enviar = (event, context, callback) => {

  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const address = requestBody.address; 
  const content = requestBody.content;

  if (typeof fullname !== 'string' || typeof address !== 'string' || typeof content !== 'string' ) {
    console.error('Erro de validação');
    callback(new Error('Couldn\'t A carta não pode ser enviada devido ao não preenchimento correto!'));
    return;
  }  

  enviarCartaP(cartaInfo(fullname, address, content))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Carta enviada com sucesso pel(a)o ${fullname}`,
          cartaId: res.id
        })
      });
    })

    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `A carta não pode ser enviada! ${fullname}`
        })
      })
    });  
}

module.exports.listar = (event, context, callback) => {
  var params = {
      TableName: process.env.CARTA_TABLE,
      ProjectionExpression: "id, fullname, address, content"
  };

  console.log("Scanning Carta table.");
  const onScan = (err, data) => {
      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  carta: data.Items
              })
          });
      }
  };
  dynamoDb.scan(params, onScan);
};


module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.CARTA_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })

    .catch(error => {
      console.error(error);
      callback(new Error('Carta nao encontrada.'));
      return;
    });

};


const enviarCartaP = carta => {
  console.log('Enviando carta');
  const cartaInfo = {
    TableName: process.env.CARTA_TABLE,
    Item: carta,
  };

  return dynamoDb.put(cartaInfo).promise()
    .then(res => carta);
};


const cartaInfo = (fullname, address, content) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    fullname: fullname,
    address: address,
    content: content,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };

};
