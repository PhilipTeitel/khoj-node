'use strict'

const { spawn } = require('node:child_process')
const process = require('node:process')

const abortController = new AbortController()
const abortSignal = abortController.signal

function khojProcess(khojPath, env) {
	const khojProcess = spawn(khojPath, [
		'--host=0.0.0.0',
		'--port=43210',
		'--anonymous-mode',
		'--non-interactive'
	], {
		signal: abortSignal,
		env: {
			POSTGRES_HOST: "127.0.0.1",
			POSTGRES_PORT: "5433",
			POSTGRES_USER: 'postgres',
			POSTGRES_PASSWORD: 'postgres',
			POSTGRES_DB: 'khoj',
			JINA_API_KEY: process.env.JINA_API_KEY,
			KHOJ_TELEMETRY_DISABLE: 'True'
		},
		stdio: 'inherit',
	})

	khojProcess.on('error', err => {
		console.error(`khoj exited with error ${err}`)
	})

	khojProcess.on('exit',  (code, signal) => {
		code !== null ? console.log(`khoj exited with code ${code}`)
			: console.error(`khoj exited unexpectedly with signal ${signal}`)
	})
	process.on('SIGINT', code =>{
		console.log(`Stopping process with code ${code}.`)
		khojProcess.emit('SIGINT')
		console.log(`Process exited with code ${code}`)
	})

	console.log('khoj running. Press ^C to exit')
}

module.exports = khojProcess
