/* eslint-disable */
const webhook = require('../controllers/webHook');
const getAudioData = require('../utils/getAudioData');
const {expect} = require('chai');
const sinon = require('sinon');

describe('#getFilmDbId()', () => {
  let sandbox = null;
  before(() => {
    const makeRequest = sinon.stub(helpers, "makeRequest");
    makeRequest.resolves({
      films: [
        {id: 'test123'}
      ]
    });
    sandbox = sinon.createSandbox();
  });
  it('should return TMDB Id', async function() {
    expect(await movieDbService.getFilmDbId('test1111')).to.equal('test123');
  });
  after(() => {
    helpers.makeRequest.restore();
    sandbox.restore();
  });
});

describe('#getTrailerLink()', () => {
  let sandbox = null;
  before(() => {
    const makeRequest = sinon.stub(helpers, "makeRequest");
    makeRequest.resolves({
      results: []
    });
    sandbox = sinon.createSandbox();
  });
  it('should return false if no trailers found', async function() {
    expect(await movieDbService.getTrailerLink('test1111')).to.be.false;
  });
  after(() => {
    helpers.makeRequest.restore();
    sandbox.restore();
  });
});

describe('#getTrailerLink()', () => {
  let sandbox = null;
  before(() => {
    const makeRequest = sinon.stub(helpers, "makeRequest");
    makeRequest.resolves({
      results: [
        {
          type: 'Trailer',
          site: 'YouTube',
          key: 'testKey',
        }
      ]
    });
    sandbox = sinon.createSandbox();
  });
  it('should return false if no trailers found', async function() {
    expect(await movieDbService.getTrailerLink('test1111')).to.equal('https://www.youtube.com/watch?v=testKey')
  });
  after(() => {
    helpers.makeRequest.restore();
    sandbox.restore();
  });
});