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

if (process.argv.length < 3) {
  console.log('Syntax: npx esm-tape-runner <glob-of-tests-to-run> [any environment vars or flags to pass to Node]')
  process.exit(1)
}

const glob = process.argv[2]

const others = process.argv.slice(3)

const environmentVariables = []
const nodeFlags = []

for (const other of others) {
  if (other.startsWith('--') || other.startsWith('.')) {
    nodeFlags.push(other)
  } else if (other.includes('=')) {
    environmentVariables.push(other)
  } 
}

const tests = fg.sync(glob)

for (let i = 0; i < tests.length; i++) {
  const test = tests[i]
  try {
    const command = `${environmentVariables.join(' ')} node ${nodeFlags.join(' ')} ${test}`
    await exec(command, { cwd: process.cwd()} )
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
