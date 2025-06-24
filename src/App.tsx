import { useState } from 'react'
import './App.css'
import fag from './assets/fag.png'

function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [placa, setPlaca] = useState('');
  const [cadastrado, setCadastrado] = useState(false);

  const handleCadastrar = async () => {
    if (!nome || !cpf || !placa) {
      alert('Preencha todos os campos!');
      return;
    }

    if (cpf.length !== 11) {
      alert('CPF deve conter exatamente 11 dígitos!');
      return;
    }

    if (placa.length !== 7) {
      alert('Placa deve conter exatamente 7 caracteres!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cpf, placa }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Cadastro realizado com sucesso!');
        setCadastrado(true);
      } else {
        alert(data.error || 'Erro ao cadastrar.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
      console.error(error);
    }
  };

  const handleEditar = () => {
    setCadastrado(false);
  };

  const handleDeletar = () => {
    setNome('');
    setCpf('');
    setPlaca('');
    setCadastrado(false);
  };

  return (
    <div className="containerP">
      <img src={fag} alt="Fag" style={{ width: '60px', marginBottom: '20px' }} />
      {!cadastrado ? (
        <>
          <h2 className='cadastrese'>Cadastre-se abaixo:</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite seu nome"
              className="input-cadastro"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite seu CPF"
              className="input-cadastro"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite sua placa"
              className="input-cadastro"
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            />
          </div>
          <div className="card">
            <button className="buttonCad" onClick={handleCadastrar}>
              <p>Cadastrar</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className='cadastrorea'>Cadastro realizado com sucesso!</h2>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>CPF:</strong> {cpf}</p>
          <p><strong>Placa:</strong> {placa}</p>
          <div className="card">
            <button className="buttonCad" onClick={handleEditar}>
              <p>Editar</p>
            </button>
          </div>
          <div className="card">
            <button className="buttonCad" onClick={handleDeletar}>
              <p>Deletar</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
