import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const publicDir = path.resolve(process.cwd(), 'public');

// Explicit aliases requested by user & legacy page support
app.get(['/features', '/features.html', '/about', '/about.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'features.html'));
});

app.get(['/use-cases', '/use-cases.html', '/service', '/services', '/service.html', '/services.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'use-cases.html'));
});

app.get(['/pricing', '/pricing.html', '/price', '/price.html', '/blog', '/blog.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'pricing.html'));
});

app.get(['/how-it-works', '/how-it-works.html', '/how-to-work', '/faq', '/faq.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'how-it-works.html'));
});

app.get(['/tutorials', '/tutorials.html', '/tutorial', '/tutorial.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'tutorials.html'));
});

app.get(['/contact', '/contact.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'contact.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(publicDir));

// Route for the home page
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Route for other pages
app.get('/:page', (req, res) => {
  const page = path.basename(req.params.page).replace(/\.html$/, '');
  const filePath = path.join(publicDir, `${page}.html`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(publicDir, 'index.html'), (fallbackErr) => {
        if (fallbackErr) {
          res.status(404).send('Page not found');
        }
      });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});

