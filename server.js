const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();


app.use(cors());


app.use(express.json());

let kontens = [
  { id: 1, judul: 'Mengukir Keunikan dalam Kreativitas Tangan: Keajaiban Handmade dalam Era Digital', tanggal: '2023-12-12', isi: 'Seni handmade adalah keterampilan dan kreativitas yang dilakukan dengan tangan manusia.' },
  { id: 2, judul: 'Kerajinan Tangan Ramah Lingkungan: Ide Kreatif Mengurangi Limbah', tanggal: '2023-03-02', isi: 'Kerajinan tangan tidak hanya menjadi kegiatan yang menyenangkan, tetapi juga dapat berperan dalam pelestarian lingkungan.' },
  { id: 3, judul: 'Membuat Hadiah Khusus: Inspirasi Kerajinan Tangan untuk Acara Khusus', tanggal: '2022-08-12', isi: 'Memberikan hadiah khusus pada acara spesial adalah cara yang indah untuk mengekspresikan kasih sayang dan menghargai orang yang kita cintai.' }
];

// GET: Mendapatkan semua data konten
app.get('/konten', (req, res) => {
  res.json(kontens);
});

// GET: Mendapatkan data konten berdasarkan IDs
app.get('/konten/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const konten = kontens.find(g => g.id === id);
  if (konten) {
    res.json(konten);
  } else {
    res.status(404).json({ message: 'konten tidak ditemukan' });
  }
});

// POST: Menambahkan data konten baru
app.post('/konten', (req, res) => {
  const konten = req.body;
  konten.id = kontens.length + 1;
  kontens.push(konten);
  res.status(201).json(konten);
});

// PUT: Mengupdate data konten berdasarkan ID
app.put('/konten/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const kontenIndex = kontens.findIndex(g => g.id === id);
  if (kontenIndex !== -1) {
    kontens[kontenIndex] = { ...kontens[kontenIndex], ...req.body };
    res.json(kontens[kontenIndex]);
  } else {
    res.status(404).json({ message: 'konten tidak ditemukan' });
  }
});

// DELETE: Menghapus data konten berdasarkan ID
app.delete('/konten/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const kontenIndex = kontens.findIndex(g => g.id === id);
  if (kontenIndex !== -1) {
    const konten = kontens[kontenIndex];
    kontens.splice(kontenIndex, 1);
    res.json(konten);
  } else {
    res.status(404).json({ message: 'konten tidak ditemukan' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});