#!/usr/bin/env node

import fg from 'fast-glob'
import childProcess from 'child_process'
import { promisify } from 'util'
const _exec = promisify(childProcess.exec)

async function exec(command) {
  const commandPromise = _exec(command)
  const commandProcess = commandPromise.child
  commandProcess.stdout.pipe(process.stdout)
  await commandPromise
}

if (process.argv.length !== 3) {
  console.log('Syntax: npx esm-tape-runner <glob-of-tests-to-run>')
  process.exit(1)
}

const glob = process.argv[2]
const tests = fg.sync(glob)

for (let i = 0; i < tests.length; i++) {
  const test = tests[i]
  try {
    await exec(`node ${test}`, { cwd: process.cwd()} )
  } catch (error) {
    if (error.stderr !== '') {
      process.stdout.write(`Bail out! ${error}\n`)
      process.nextTick(() => {
        console.error(error.stderr)
        process.exit(1)
      })
    }
  }
}
