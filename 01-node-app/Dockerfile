# base image
FROM node:alpine

# set a working directory 
WORKDIR /app

# copy the package.json
COPY package.json ./

# if external dependencies are used
# RUN npm install

# copy the application files
COPY . ./

# container will listen on port 3000
EXPOSE 3000

CMD [ "npm", "start" ]