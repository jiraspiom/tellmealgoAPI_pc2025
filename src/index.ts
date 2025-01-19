import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import SegredoController from './controllers/SegredoController.js'
import SegredosRepository from './repository/SegredosRepository.js'
import CataasService from './services/CataasService.js'

const app = new Hono().basePath('/api')

app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: false,
  })
)

const cataasService = new CataasService('https://cataas.com/cat?json=true')
const segredosRepository = new SegredosRepository()
const segredoController = new SegredoController(
  cataasService,
  segredosRepository
)

app.get('/', c => {
  return c.text('Hello Hono!')
})

app.get('/segredos', ctx => segredoController.getSegredos(ctx))

app.get('/segredos/:id', async ctx => segredoController.getSegredoById(ctx))

app.post('/segredos', ctx => segredoController.createSegredo(ctx))

const port = 3333
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
