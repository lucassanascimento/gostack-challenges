const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4')


// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    const { title } =  request.query;

    const results = title 
      ? repositories.filter(repository => repository.title.includes(title))
      : repositories;

      return response.json(results);
});

app.post("/repositories", (request, response) => {

    const { title, techs, likes} = request.body;

    const repository = { 
      id: uuid(),
      title,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/blob/master/desafio-conceitos-nodejs/README.md',
      techs,
      likes: 0,
    }

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
    const { id } = request.params;
    const { title, url,  techs,  likes } = request.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id == id);

    if( repositoryIndex < 0 ) {
        return response.status(400).json({ error: 'Repository not found.'});
    }

    const repository = {
      id,
      title, 
      url,
      techs, 
      likes
    }

    repositories[repositoryIndex] = repository;

    return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
   const { id } = request.params;

   const repositoryIndex = repositories.findIndex(repository => repository.id == id);

   if(repositoryIndex < 0) {
     return response.status(400).json({ error: 'Repository not Found.'})
   }

    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if( repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found.'});
  }

  const like = repositories[repositoryIndex].likes;

  repositories[repositoryIndex].likes = like + 1;

  return  response.status(200).json(repositories[repositoryIndex])

});

module.exports = app;
