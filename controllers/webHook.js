const google = require('../modules/googleSpeechToText');
const utils = require('../utils/getAudioData');

exports.processMessage = async (msg, bot) => {
  try {
    if (!msg.voice) {
      bot.sendMessage(msg.chat.id, 'I can translate awful voice messages to text only. You can forvard me voice messages.');
      return true;
    }
    const saveVoiceMessage = await bot.downloadFile(msg.voice.file_id, '/tmp');
    const audioData = await utils.getAudioData(saveVoiceMessage);
    const parseVoiceMessage = await google.parseVoiceMessage(saveVoiceMessage, audioData);
    if (!parseVoiceMessage) {
      bot.sendMessage(msg.chat.id, 'Sorry, I cannot understand you.');
    }
    bot.sendMessage(msg.chat.id, parseVoiceMessage);
    return true;
  } catch (err) {
    bot.sendMessage(msg.chat.id, 'Sorry, something went wrong, please try again later.');
    return false;
  }
};
