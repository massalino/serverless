# serverless
CRUD AWS Lambda, DynamoDB

 Para testar o código, pode usar o docker. Caso não tenha instalado pode usar o https://labs.play-with-docker.com

$git clone https://github.com/massalino/serverless.git

$cd serverless

$docker-compose up -d

$docker-compose exec node bash (Irá acessar a console do container)

#export AWS_ACCESS_KEY_ID=<ACCESS_KEY>

#export AWS_SECRET_ACCESS_KEY=<SECRET_KEY>

#sls deploy -v

#npm init (Em test, escolher mocha)


Para fazer o teste de unidade:

#npm test
