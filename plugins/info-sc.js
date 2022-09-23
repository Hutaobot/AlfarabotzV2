let handler = m => m.reply('Hai kak lagi nyari sc yaa? \n\n\n_*https://wa.me/6283854551575?text=Assalamualaikum%20Bang%20bagi%20sc%20nya%20dong?*_')

handler.customPrefix = /Sc|sc|script/i
handler.command = new RegExp
handler.premium = true
handler.register = true

module.exports = handler
