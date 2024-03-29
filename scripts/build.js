const path = require('path')
const execa = require('execa')
const chalk = require('chalk')

const args = require('minimist')(process.argv.slice(2))
const env = args.e || args.env || 'production'
const run = (bin, args, opts) => execa(bin, args, { stdio: 'inherit', ...opts })
const step = (msg) => console.log(chalk.bold.yellow(msg))

main().catch((e) => console.error(e))

async function main() {
  const target = path.basename(process.cwd())
  const removedDir = 'dist'

  step(`\nremoving ${removedDir} directory...`)
  await run('rimraf', [removedDir])

  step(`\nRolling up for ${target}...`)
  await run('rollup', ['-c', '--environment', [`NODE_ENV:${env}`].join(',')])
}
