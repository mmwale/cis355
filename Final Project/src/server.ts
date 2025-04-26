import app from './app';

const PORT = process.env.PORT || 3000;// Define the port

app.listen(PORT, () => {// Start the server
  console.log(`Server running on http://localhost:${PORT}`);
});