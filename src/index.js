import express  from 'express'
import cors from 'cors'

const app = express();

app.use(cors())
console.log('start')

app.get('/', (req, res) => {
  res.status(200).end('<h1>Node App</h1>')
})

// This line is important to ensure your app listens to the PORT env var
const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
