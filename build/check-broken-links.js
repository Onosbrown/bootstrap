#!/usr/bin/env node

'use strict'

/*!
 * Script to start a local http server and run broken-link-checker
 *  on the Bootstrap documentation site.
 * Copyright 2017 The Bootstrap Authors
 * Copyright 2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')
const Blc = require('broken-link-checker/lib/cli')

function main(args) {

  if (args.length < 2) {
    console.error('USAGE: check-broken-links <site dir> <port> <options>')
    console.error('Got arguments:', args)
    process.exit(1)
  }

  const directory = args[0]
  const port = args[1]

  const serve = serveStatic(directory)
  const server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res))
  })

  server.listen(port, () => {
    new Blc().input([`http://localhost:${port}`].concat(args.slice(2)))
  })
}

main(process.argv.slice(2))
