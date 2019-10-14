const mm = require('music-metadata');

exports.getAudioData = async (filePath) => {
  try {
    const parsedAudioFile = await mm.parseFile(filePath, { native: true });
    const encoding = `${parsedAudioFile.format.container}_${parsedAudioFile.format.codec}`.toUpperCase();
    return { encoding, bitrate: parsedAudioFile.format.sampleRate };
  } catch (err) {
    return false;
  }
};
