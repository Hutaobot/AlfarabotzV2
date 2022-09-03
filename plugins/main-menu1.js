const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
const defaultMenu = {
  before: `
𝙷𝚊𝚕𝚘 ${name} 𝚂𝚊𝚢𝚊 Alfarabotz Multi Device,𝚂𝚊𝚢𝚊 𝙳𝚒 𝙱𝚞𝚊𝚝 𝙾𝚕𝚎𝚑 Irfaan Official,𝙿𝚎𝚖𝚋𝚞𝚊𝚝𝚊𝚗 𝙿𝚛𝚘𝚓𝚎𝚌𝚝 𝙱𝚘𝚝 𝙸𝚗𝚒 𝙼𝚞𝚕𝚊𝚒 𝙳𝚊𝚛𝚒 𝚃𝚊𝚗𝚐𝚐𝚊𝚕 22 𝙰𝚐𝚞𝚜𝚝𝚞𝚜 2022,𝚃𝚎𝚛𝚒𝚖𝚊 𝙺𝚊𝚜𝚒𝚑 𝚈𝚊𝚗𝚐 𝚃𝚎𝚕𝚊𝚑 𝙼𝚎𝚖𝚋𝚊𝚗𝚝𝚞 𝚂𝚊𝚢𝚊 𝚂𝚎𝚙𝚎𝚗𝚞𝚑 𝙷𝚊𝚝𝚒 𝙳𝚊𝚕𝚊𝚖 𝙼𝚎𝚖𝚋𝚞𝚊𝚝 𝙿𝚛𝚘𝚓𝚎𝚌𝚝 𝚂𝚌𝚛𝚒𝚙𝚝 𝙸𝚗𝚒\n
⫰⫯⫰ 𝐃𝐚𝐭𝐞 𝐈𝐬𝐥𝐚𝐦 : ${dateIslamic}
⫰⫯⫰ 𝐃𝐚𝐭𝐞 : ${date}
⫰⫯⫰ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}
⫰⫯⫰ 𝐓𝐢𝐦𝐞 : ${time}`
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let gambar = global.media
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    const wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let bcbg = `${pickRandom(['https://telegra.ph/file/bca700eefeeed8f2cb054.jpg', 'https://telegra.ph/file/ec9831cc3b7001690d6dd.jpg','https://telegra.ph/file/177f7054ebddc6d1f8375.jpg','https://telegra.ph/file/90d4254ae53b4d268b2b9.jpg','https://telegra.ph/file/a6e4013afa98e283ee6a7.jpg','https://telegra.ph/file/2cf9cf86466d9fad58e52.jpg','https://telegra.ph/file/f62c45fb2e087187f065e.jpg','https://telegra.ph/file/fec157267ed3cf69021e1.jpg','https://telegra.ph/file/419672df2fb86a057cb26.jpg'])}`

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      ucapan: ucapan(),
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, money, name, gambar, weton, week, date, wib, wit, wita, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let audio = `https://raw.githubusercontent.com/hyuura/Rest-Sound/main/HyuuraKane/mangkane22.mp3`
    await conn.sendFile(m.chat, audio, 'error.mp3', null, m, true)
     
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: text.trim(),
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: '✏️ Yt Chanel',
               url: 'https://youtube.com/channel/UCaFh82MyrVgcgIvJxvTA39w'
             }

           },
             {
             callButton: {
               displayText: 'Hp Owner',
               PhoneNumber: '0856-2482-3115'
             }

           },
               {
             quickReplyButton: {
               displayText: '👤Owner',
               id: '.owner',
             }

           },
               {
             quickReplyButton: {
               displayText: '🤝 Donasi',
               id: '.donasi',
             }

           },
           {
             quickReplyButton: {
               displayText: '📳SewaBot',
               id: '.sc',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu)$/i
handler.register = true
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }
function ucapan() {
        const hour_now = moment.tz('Asia/Jakarta').format('HH')
        var ucapanWaktu = 'Pagi kak'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = 'Pagi kak'
        } else if (hour_now >= '10' && hour_now <= '15') {
          ucapanWaktu = 'Siang kak'
        } else if (hour_now >= '15' && hour_now <= '17') {
          ucapanWaktu = 'Sore kak'
        } else if (hour_now >= '17' && hour_now <= '18') {
          ucapanWaktu = 'Selamat Petang kak'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = 'Malam kak'
        } else {
          ucapanWaktu = 'Selamat Malam!'
        }	
        return ucapanWaktu
}
