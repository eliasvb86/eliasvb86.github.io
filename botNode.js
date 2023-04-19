//https://www.npmjs.com/package/node-telegram-bot-api
//https://blog.escudero.io/creacion-de-bot-de-telegram-con-nodejs
//https://tecnonucleous.com/creacion-de-bots-de-telegram-en-nodejs/#variados
//https://github.com/hosein2398/node-telegram-bot-api-tutorial

/*
  '<b>bold</b>, <strong>bold</strong>\n' +
  '<i>italic</i>, <em>italic</em>\n' +
  '<u>underline</u>, <ins>underline</ins>\n' +
  '<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>\n' +
  '<b>bold <i>italic bold <s>italic bold strikethrough</s> <u>underline italic bold</u></i> bold</b>\n' +
  '<a href="https://www.youtube.com/c/FahroniGanteng">inline URL</a>\n' +
  '<a href="tg://user?id=\n' + TelegramData.message.from.id + '">inline mention of a user</a>\n' +
  '<code>inline fixed-width code</code>\n' +
  '<pre>pre-formatted fixed-width code block</pre>\n' 
*/

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('5734425604:AAFuDSV-2GD-gvisx8zbT68igkh9EARiq4g', { polling: true });

const { Keyboard } = require('telegram-keyboard');

//Log
bot.on('message', message => {
    console.log(`El usuario "${message.chat.username}" dice: "${message.text}"`);
});

//Id
bot.onText(/^\/myid/, (msg) => {
     const chatId = msg.chat.id;
     const myId = msg.from.id;
     bot.sendMessage(chatId, "Tu id es: " + myId);  
 });

//Ver comandos
bot.onText(/^\/commands/, (msg) => {
  var chatId = msg.chat.id;
  bot.getMyCommands().then(function (info) {
    console.log(info);
  });
});

//Enviar comandos
bot.onText(/^\/setcommand/, (msg) => {
    const opts = [
      { command: 'start', description: 'Inicio' },
      { command: 'myid', description: 'Ver mi ID' },
      { command: 'commands', description: 'Ver comandos' },
      { command: 'setcommand', description: 'Enviar comandos' },
      { command: 'borrar', description: 'Borrar' }
    ];

    bot.setMyCommands(opts).then(function (info) {
        console.log(info)
    });
});

bot.onText(/\/borrar/,(msg)=>{for (let i = 0; i < 101; i++) {
    bot.deleteMessage(msg.chat.id, msg.message_id-i).catch(er=>{return})
//if there isn't any messages to delete bot simply return
}});

/*
bot.onText(/^\/start$/, function (msg) {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            //keyboard: [ ['Level 1'] ],
          keyboard: [
            ["uno :+1:"],
            ["uno \ud83d\udc4d", "due"],
            ["uno", "due","tre"],
            ["uno", "due","tre","quattro"],
          ]
        }
    };
    bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
});
*/

//Start
//bot.onText(/^\/start$/, function (msg) {
bot.onText(/\/start/, function (msg) {
  var chatId = msg.chat.id;
  var botonesINICIO = {
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      //keyboard: [ ['Level 1'] ],
      inline_keyboard: [
      //keyboard: [
        [{
          text: 'TIEMPO',
          callback_data: 'tiempo',
        },],
        
      ]
    }
  };
  var botonesTIEMPO = {
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      //keyboard: [ ['Level 1'] ],
      inline_keyboard: [
      //keyboard: [
        [
          {
          text: 'ALERTAS AEMET',
          callback_data: 'alertas',
          url: 'http://infotweet.aemet.es/tu77.html?1517123702',
          //web_app: {url: "http://infotweet.aemet.es/tu77.html?1517123702"}
          },
          {
          text: 'METEO ALARM',
          callback_data: 'meteo',
          url: 'https://meteoalarm.org/en/region/ES',
          },
        ],
        [
          {
          text: 'DGT',
          callback_data: 'dgt',
          url: 'https://infocar.dgt.es/etraffic/Incidencias?ca=10&provIci=3&caracter=acontecimiento&accion_consultar=Consultar&IncidenciasRETENCION=IncidenciasRETENCION&IncidenciasPUERTOS=IncidenciasPUERTOS&IncidenciasMETEOROLOGICA=IncidenciasMETEOROLOGICA&IncidenciasEVENTOS=IncidenciasEVENTOS&IncidenciasOTROS=IncidenciasOTROS&IncidenciasRESTRICCIONES=IncidenciasRESTRICCIONES&ordenacion=fechahora_ini-DESC',
          },
        ],
        [
          {
          text: 'WINDY',
          callback_data: 'windy',
          //url: 'https://www.windy.com/38.610/-0.420?radar,38.535,-0.420,11',
          },
          {
          text: 'AEMET',
          callback_data: 'aemet',
          url: 'http://www.aemet.es/es/eltiempo/prediccion/municipios/torremanzanas-torre-de-les-macanes-la-id03132',
          },
        ],
        [
          {
          text: 'AVAMET',
          callback_data: 'avamet',
          url: 'https://www.avamet.org/mxo-i.php?id=c32m132e01',
          },
          {
          text: 'WEATHER',
          callback_data: 'weather',
          url: 'https://weather.com/es-ES/weather/today/l/d616dce64d8a4b0f200ab3dc9d07f8aac2d82c5908120e911be351d258338fbf',
          },
        ],
        [{
          text: '<-- VOLVER',
          callback_data: 'inicio',
          
        },],
      ]
    }
  };
  
  //bot.deleteMessage(chatId, msg.message_id);
  //bot.deleteMessage(chatId, msg.reply_to_message.message_id);
  
  bot.sendMessage(chatId, '<b>RSS</b>', botonesINICIO);

  bot.on('callback_query', function onCallbackQuery(accionboton){
    const data = accionboton.data
    const msg = accionboton.message

    bot.deleteMessage(chatId, msg.message_id);
    //bot.deleteMessage(chatId, msg.reply_to_message.message_id);

    if(data == 'inicio'){
      bot.sendMessage(chatId, "<b>RSS</b>", botonesINICIO);
    }
    if(data == 'tiempo'){
      bot.sendMessage(chatId, "<b>TIEMPO</b>", botonesTIEMPO);
    }
    if(data == 'windy'){
      let text1 =
        '<strong><a href="https://www.windy.com/38.610/-0.420?radar,38.535,-0.420,11">WINDY</a></strong>' +
        '\n' +
        '\n' +
        '<strong>Email= </strong><code>eliasvb86@gmail.com</code>' +
        '\n' +
        '<strong>User= </strong><code></code>' +
        '\n' +
        '<strong>Key= </strong><code>1605eliasvb86</code>'
        ;
      bot.sendMessage(msg.chat.id, text1,{parse_mode : "HTML", disable_web_page_preview: true,});
      
      /*bot.answerCallbackQuery({
        callback_query_id: accionboton.id,
        text: 'Texto con <b>negrita</b>, <i>cursiva</i> y <s>tachado</s>',
        show_alert: true,
      })*/
    }
  })
  
});

bot.on('message', (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
  }

  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
});
      
