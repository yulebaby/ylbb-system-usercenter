'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
//  domain: '"http://192.168.1.238:8080"',      //本地
//  domain: '"http://tusercenter.beibeiyue.cn/c"'     //83
    domain: '"http://usercenter.beibeiyue.com/c"'		//线上
})