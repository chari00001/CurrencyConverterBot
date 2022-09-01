const request = require('postman-request')
const { Telegraf } = require('telegraf')
const BOT_TOKEN = '5445644910:AAExPi_OE5toacTsGM_3pervXB9GFJGtXj4'
const apiKey = 'q1h9N0XoMQJoHL282H6tyz3t7vUfxyYI'
const baseURL = 'https://api.apilayer.com/fixer/convert'

/**
 * PARAMETERS: 
 * 
 * amount: the amount to be converted
 * from: the three-letter currency code of the currency you would like to convert from
 * to: the three-letter currency code of the currency you would like to convert to
 * date (optional): specify a date (format YYYY-MM-DD) to use historical rates for this conversion
 */

const bot = new Telegraf(BOT_TOKEN)

bot.start(ctx => {
    ctx.reply('Welcome!')
})

bot.command('test', ctx => {
    request.get('')
})


bot.launch()