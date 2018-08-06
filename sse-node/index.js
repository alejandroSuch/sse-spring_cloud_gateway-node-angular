const createServer = require('http').createServer;

const port = parseInt(process.env.PORT || '3000');

const server = createServer();

server.on('request', (req, res) => {
  console.info('Incomming request recieved', req.method, req.url);

  if (req.method === 'GET') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });

    const interval = setInterval(() => {
      const data = {
        random: Math.random(),
        headers: req.headers
      };

      res.write('retry: 10000\n');
      res.write('data: ' + JSON.stringify({ data }) + '\n\n');
    }, 1000);

    req.on('close', () => {
      console.log('request close');
      clearInterval(interval);
    });

    req.on('abort', () => {
      console.log('request close');
      clearInterval(interval);
    });
  }
});

console.log(`Starting server on port ${port}`);
server.listen(port);
