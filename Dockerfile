#Specify a base image
FROM node:16

#Specify a working directory
WORKDIR /usr/app

#Copy remaining files
COPY . .

RUN yarn install

#Default command
CMD ["yarn","docker"]