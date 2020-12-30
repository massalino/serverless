var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://jm33wy7k1j.execute-api.us-east-1.amazonaws.com/dev";


describe("Teste API carta-papainoel listar ",function(){
  
  it("Deve listar as cartas",function(done){
    request.get(
      {
        url : urlBase + "/listar"
      },
      function(error, response, body){
  
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        // agora, verificamos se retornou a propriedade carta
        if( _body.should.have.property('carta') ){
          //se retornou, verificar se tem ao menos 10 cartas 
          expect(_body.carta).to.have.lengthOf.at.above(10);
        }
        done(); 
      }
    );
  });
  
});
