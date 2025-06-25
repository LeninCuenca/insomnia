
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: "Primer post", body: "Contenido inicial", userId: 1 },
  { id: 2, title: "Segundo post", body: "Contenido adicional", userId: 2 },
];

// GET
app.get('/posts', (req, res) => {
  res.json({ message: 'Lista de posts', data: posts });
});

// POST
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    ...req.body
  };
  posts.push(newPost);
  res.status(201).json({ message: 'Post creado', data: newPost });
});

// PUT
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Post no encontrado' });

  posts[index] = { id, ...req.body };
  res.json({ message: 'Post reemplazado', data: posts[index] });
});

// PATCH
app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });

  Object.assign(post, req.body);
  res.json({ message: 'Post modificado', data: post });
});

// DELETE
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });

  posts = posts.filter(p => p.id !== id);
  res.json({ message: 'Post eliminado', deleted: post });
});

// OPTIONS
app.options('/posts', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.setHeader('Allow', 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.status(200).json({
    message: 'Métodos permitidos',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
  });
});

// HEAD
app.head('/posts', (req, res) => {
  res.set('X-Info', 'Encabezados visibles');
  res.status(200).end();
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ API REST ejecutándose en http://localhost:${port}`);
});
