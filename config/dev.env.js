'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PUBLIC_PATH: '"/"',
  VERSION: '"0.001.001"',

  // dev
  // BASE_API: '"http://api-farm.echoss.com"',
  BASE_API: '"http://localhost:18100"',
  // BASE_API: '"http://175.45.200.216:17100"',
  AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  // CLIENT_ID: '"lab-smartfarm"',
  // CLIENT_SECRET: "'qLYBU46kR903RML2NxKtHz71EiZzP6rydg1xkylvj54'",
  // CLIENT_ID: '"lab-smartfarm-dev"',
  // CLIENT_SECRET: "'IXLGH5K6t2l0Prg1tX6Ej0FJo22h0RuUdf3SnQneKxZ'",
  // EXPIRE_MIN: 30,

  // staging
  // BASE_API: '"http://api-smartfarm.echoss.com"',
  // BASE_API: '"http://api-farm.echoss.com"',
  // BASE_API: '"http://223.130.163.143:17100"',
  // AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  // CLIENT_ID: '"lab-t01"',
  // CLIENT_SECRET: "'OlxMRryGi96JK31Fc3A2B4R23wAJ4Chw7JYM294Ty53'",
  EXPIRE_MIN: 30,

  // prod
  // BASE_API: '"http://data-hub-lb-9124673-c31a9b21fbe3.kr.lb.naverncp.com"',
  // AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  // CLIENT_ID: '"lab-t01"',
  // CLIENT_SECRET: "'OlxMRryGi96JK31Fc3A2B4R23wAJ4Chw7JYM294Ty53'",
  // EXPIRE_MIN: 30,

  ROUTER_MODE: '"history"'
})
