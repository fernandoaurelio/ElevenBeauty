// index.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Substitua os dados abaixo pelos seus
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elevenbeauty',
  connectionLimit: 10
});

app.get('/contas-pagar', (req, res) => {
    const { filtro } = req.query;

    let query = "SELECT id, descricao, valor, data, fornecedor, status, tipo, CASE WHEN descricao LIKE '%(Parcela %/%' THEN SUBSTRING_INDEX(SUBSTRING_INDEX(descricao, ' (Parcela ', -1), '/', 1) ELSE '1' END AS parcela_atual, CASE WHEN descricao LIKE '%(Parcela %/%' THEN SUBSTRING_INDEX(SUBSTRING_INDEX(descricao, '/', -1), ')', 1) ELSE '1' END AS total_parcelas FROM fluxo_caixa WHERE status = 'Aberto' AND tipo = 'Saida'";

    let params = [];
    const hoje = new Date();

    if (filtro === 'dia') {
        query += ' AND DATE(data) = CURDATE()';
    } else if (filtro === 'mes') {
        query += ' AND MONTH(data) = ? AND YEAR(data) = ?';
        params.push(hoje.getMonth() + 1, hoje.getFullYear());
    } else if (filtro === 'ano') {
        query += ' AND YEAR(data) = ?';
        params.push(hoje.getFullYear());
    }

    query += ' ORDER BY data ASC';

    pool.query(query, params, (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados com parcelas:', err);
            return res.status(500).json({ erro: 'Erro ao buscar no banco', detalhes: err });
        }
        return res.json(result);
    });
});

app.get('/fluxo', (req, res) => {
  const { inicio, fim, descricao, valor, forma_pagamento, tipo } = req.query;

  let sql = 'SELECT * FROM fluxo_caixa WHERE status="Pago" ORDER BY id DESC';
  const params = [];

  if (inicio && fim) {
    sql += ' AND data BETWEEN ? AND ?';
    params.push(inicio, fim);
  }
  if (descricao) {
    sql += ' AND descricao LIKE ?';
    params.push(`%${descricao}%`);
  }
  if (valor) {
    sql += ' AND valor = ?';
    params.push(valor);
  }
  if (forma_pagamento) {
    sql += ' AND forma_pagamento LIKE ?';
    params.push(`%${forma_pagamento}%`);
  }
  if (tipo) {
    sql += ' AND tipo = ?';
    params.push(tipo);
  }

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro ao buscar fluxo:', err);
      return res.status(500).send('Erro ao buscar fluxo');
    }
    res.json(results);
  }); // ← esse fecha o pool.query
}); // ← esse fecha o app.get

app.post('/AddFluxo', (req, res) => {
  const { data, descricao, valor, forma_pagamento, tipo,status } = req.body;

  if (!data || !descricao || !valor || !forma_pagamento || !tipo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = "INSERT INTO `fluxo_caixa`(`data`, `descricao`, `valor`, `forma_pagamento`, `tipo`, `status`) VALUES (?,?,?,?,?,?)";
  const params = [data, descricao, valor, forma_pagamento, tipo,status]; // ✅ Agora o params existe

  pool.query(sql, params, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      return res.status(500).json({ erro: 'Erro no servidor ao inserir no banco', detalhes: err });
    }

    console.log('Dados inseridos com sucesso:', result);
    return res.status(201).json({ success: true, insertedId: result.insertId });
  });
});


app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});
