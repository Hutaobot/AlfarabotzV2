let handler = async m => m.reply(`
╭─「 Donasi • Pulsa 」
│ •  [0816-4682-9895]
│   「 Donasi • Dana」
│ •  [0895-3170-4997]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
