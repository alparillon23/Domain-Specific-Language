import app from './app'
import { Controller } from './controller'

const port = app.get('port') || '3000'
const env = app.get('env') || 'dev'

const server = app.listen(port, () => {
  console.log('  App is running at http://localhost:%d in %s mode', port, env)
  console.log('  Press CTRL-C to stop\n')
})

// TODO: remove, just for testing
new Controller({} as any, { status: () => ({ send: () => {} }) } as any)

export default server
