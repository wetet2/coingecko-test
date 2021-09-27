
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static(path.resolve(__dirname, '../client_dist')));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use((req, res, next) => {
   res.sendFile(path.resolve(__dirname, '../client_dist/main.html'));
})

// Error Handler
app.use((err, req, res, next) => {
   console.error(err);
   res.sendStatus(500);
})

app.listen(port, () => {
   console.log();
   console.log('Entrance:');
   console.log('┌─────────────────────────────────────────┐');
   console.log('│      Local: http://localhost:3000       │');
   console.log('└─────────────────────────────────────────┘');

});


