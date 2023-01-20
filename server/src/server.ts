import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  port: 3333,
  host: '192.168.18.11'
}).then(() => {
  console.log('Server is running!')
})

app.listen({
  port: 3333,
  host: 'localhost'
}).then(() => {
  console.log('Server is running!')
})