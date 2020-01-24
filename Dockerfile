FROM node:12
WORKDIR /code
COPY dist /code/dist
RUN npm install express
EXPOSE 4000
ENTRYPOINT ["node", "dist/server.js"]

