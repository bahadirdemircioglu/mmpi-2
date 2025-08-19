const http = require('http');
const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../data/questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/questions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(questions));
    return;
  }

  if (req.method === 'POST' && req.url === '/answers') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const answers = JSON.parse(body || '{}');
        const scores = {};
        for (const q of questions) {
          const ans = answers[q.id];
          if (typeof ans === 'boolean') {
            if (ans) {
              scores[q.category] = (scores[q.category] || 0) + 1;
            }
          }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ scores }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const indexPath = path.join(__dirname, '../public/index.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

const server = http.createServer(handleRequest);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
