FROM public.ecr.aws/lambda/nodejs:12
RUN npm update -g
RUN npm install serverless -g
RUN serverless create --template aws-nodejs --path cartas-papainoel --name papainoel
COPY serverless.yml /var/task/cartas-papainoel/
RUN mkdir /var/task/cartas-papainoel/api
COPY api/carta.js /var/task/cartas-papainoel/api/
WORKDIR /var/task/cartas-papainoel
RUN npm install --save bluebird
RUN npm install --save uuid
