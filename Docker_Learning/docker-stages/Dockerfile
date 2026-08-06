#BASE image 
FROM node:20-alpine3.19

#working directory in the container 
WORKDIR /home/node-app

#copy package.json and package.lock.json as same name in container
COPY package*.json .

#copy tsconfig.json as same name in the container 
COPY tsconfig.json .

#now run npm install to install all the dependencies 
RUN npm install 

#take src directory into src directory in the container 

COPY src/ src/

#run npm build to build 

RUN npm run build 

EXPOSE 8000

#run command npm start

CMD [ "npm","start" ]