const fs = require('fs');
const speech = require('@google-cloud/speech').v1p1beta1;

fs.writeFileSync('/tmp/key.json', process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE);
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/tmp/key.json';

const client = new speech.SpeechClient();

exports.parseVoiceMessage = async (fileName, audioData) => {
  try {
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: audioData.encoding,
      sampleRateHertz: audioData.bitrate,
      languageCode: 'en-US',
      alternativeLanguageCodes: ['ru-RU', 'en-US'],
    };

    const request = {
      audio,
      config,
    };
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  } catch (err) {
    return false;
  }
};
