import express, { Request, Response } from 'express';
import cors from 'cors';
import { createPool } from 'mysql2/promise';


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cadastro_placa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/cadastro', async (req: Request, res: Response): Promise<void> => {
  const { nome, cpf, placa } = req.body;

  if (!nome || !cpf || !placa) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }

  const cpfLimpo   = String(cpf).replace(/\D/g, '');
  const placaUpper = String(placa).toUpperCase().trim();

  if (cpfLimpo.length !== 11 || placaUpper.length !== 7) {
    res.status(400).json({ error: 'CPF ou placa inválidos.' });
    return;
  }

  try {
    const sql = `
      INSERT INTO cadastro (nome, cpf, placa)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nome       = VALUES(nome),
        placa      = VALUES(placa),
        update_em = CURRENT_TIMESTAMP
    `;
    await db.execute(sql, [nome.trim(), cpfLimpo, placaUpper]);
    res.status(200).json({ message: 'Cadastro salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
