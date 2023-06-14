import React, { useState } from 'react';

const LuthierPage = ({ luthier }) => {
  const [formData, setFormData] = useState({
    nome: luthier.nome,
    especialidade: luthier.especialidade,
    telefone: luthier.telefone,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Dados atualizados com sucesso!');
  };

  return (
    <div>
      <h2>Editar Luthier</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </label>
        <br />
        <label>
          Especialidade:
          <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} />
        </label>
        <br />
        <label>
          Telefone:
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default LuthierPage;
