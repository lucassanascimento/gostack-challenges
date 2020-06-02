import React from "react";
import { useState, useEffect } from 'react';


import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setResositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setResositories(response.data);
      console.log(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "KNG",
      techs: ["Node.js", "React", "javaScript"]
    });

    const repository = response.data;
    setResositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    try {
      await api.delete(`repositories/${id}`)

      setResositories(repositories.filter(repository => repository.id !== id));

    } catch (error) {
      alert("Erro ao excluir");
    }

  }

  return (
    <div>
      <ul>

        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
