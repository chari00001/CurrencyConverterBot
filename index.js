const request = require('postman-request')
const { Telegraf } = require('telegraf')
const BOT_TOKEN = '5445644910:AAExPi_OE5toacTsGM_3pervXB9GFJGtXj4'
const apiKey = 'q1h9N0XoMQJoHL282H6tyz3t7vUfxyYI'
const baseURL = `https://api.apilayer.com/fixer/convert?apikey=${apiKey}`
const symbolsURL = `https://api.apilayer.com/fixer/symbols?apikey=${apiKey}`

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

bot.command('convert', ctx => {
    const commandParams = ctx.message.text.split(' ')[1].split('-')
    console.log(commandParams);

    if (commandParams.length === 3 && !isNaN(commandParams[0])) {
        request.get(baseURL + '&amount=' + commandParams[0] + '&from=' + commandParams[1] + '&to=' + commandParams[2], (error, response) => {
            // console.log(response.body);
            const parsedData = JSON.parse(response.body)
            ctx.reply(`${commandParams[0]} ${commandParams[1]} = ${parsedData.result} ${commandParams[2]}`)
        })
    } else {
        ctx.reply('Please provide the parameters as [amount]-[from]-[to]')
    }
})

bot.command('symbols', ctx => {
    request.get(symbolsURL, (error, response) => {
        // console.log(response.body.symbols);
        const currencies = JSON.parse(response.body).symbols
        const symbols = Object.keys(currencies)
        const currencyNames = Object.values(currencies)
        let reply = ''

        // Bad coding :(

        for (let i = 0; i < symbols.length / 3; i++){
            // console.log(`${symbols[i]} ---> ${currencyNames[i]}`);
            reply += `${symbols[i]}  --->  ${currencyNames[i]}\n`
        }
        ctx.reply(reply)
        reply = ''
        for (let i = symbols.length / 3; i < 2 * (symbols.length / 3); i ++){
            reply += `${symbols[i]}  --->  ${currencyNames[i]}\n`
        }
        ctx.reply(reply)
        reply = ''
        for (let i = 2 * (symbols.length / 3); i < symbols.length; i ++){
            reply += `${symbols[i]}  --->  ${currencyNames[i]}\n`
        }
        ctx.reply(reply)
    })
})

// bot.launch({ webhook: { domain: 'git.heroku.com/curr-converter-bot-chari.git', port: process.env.port } })
bot.launch()

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));