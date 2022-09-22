let handler = async (m, { conn }) => {
let babi = 'https://api.lolhuman.xyz/api/asupan?apikey=cd71d6b3f5c1352f55a46883'
    conn.sendButtonImg(m.chat, babi, 'Nih', wm2, 'NEXT', '.malaysia', m)
}
handler.help = ['asupan']
handler.tags = ['asupan']
handler.command = /^(malaysia)$/i

module.exports = handler
