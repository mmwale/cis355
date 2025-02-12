const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3551;

// Set up Handlebars as the template engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Load posts from JSON file (or use an empty array if the file doesn't exist)
let posts = [];
const POSTS_FILE = path.join(__dirname, 'posts.json');

if (fs.existsSync(POSTS_FILE)) {
    try {
      const data = fs.readFileSync(POSTS_FILE, 'utf-8');
      posts = JSON.parse(data);
    } catch (err) {
      console.error('Error parsing posts.json:', err.message);
      posts = []; // Fallback to an empty array if the file is invalid
    }
  } else {
    console.log('posts.json not found. Starting with an empty posts array.');
  }

// Helper function to save posts to the JSON file
function savePosts() {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// Routes
app.get('/', (req, res) => {
  res.render('home', { posts });
});

app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('post', { post });
});

app.post('/add', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now().toString(), // Use timestamp as a unique ID
    title,
    content,
    timestamp: new Date().toLocaleString(), // Add timestamp
  };
  posts.push(newPost);
  savePosts();
  res.redirect('/');
});

// GET /add route that renders a new form to add a post from the 'Add New Post' button
app.get('/add', (req, res) => {
    res.render('add'); // Render the "add.hbs" template
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});