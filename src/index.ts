import { app } from './app.js'

const PORT = process.env.PORT ?? 3001

app.listen(PORT, (): void => {
  console.log(`Server working on port ${PORT}`)
})
