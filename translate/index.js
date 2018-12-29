
const querystring = require('querystring');
const got = require('got');

const Hack = require('./hack');

const LANG_FROM = 'en';
const LANG_TO = 'vi';

const QUERY_API = 'https://translate.google.com/translate_a/single';

const processResponse = body => {
  let resultObject = {
      text: '',
      metrics: {
        text: {
          value: '',
          autoCorrected: false,
          didYouMean: false
        }
      }
  };

  let texts = [];
  body[0].forEach((obj) => {
    if(obj[0]) {
      texts.push(obj[0]);
    }
  });

  // auto correctness
  if(body[7] && body[7][0]) {
    let str = body[7][0];
    str = str.replace(/<b><i>/g, '[');
    str = str.replace(/<\/i><\/b>/g, ']');
    resultObject.metrics.text.value = str;

    if(body[7][5] === true) {
      resultObject.metrics.text.autoCorrected = true;
    }
    else {
      resultObject.metrics.text.didYouMean = true;
    }
  }

  if(texts.length > 0) {
    resultObject.text = texts.join('');
  }

  return resultObject;
}

async function tran(txt) {
    try {
      let text = String(txt);
      let h = await Hack.generate(text);

      let params = {
        client: 'gtx',
        sl: LANG_FROM,
        tl: LANG_TO,
        hl: LANG_TO,
        dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
        ie: 'UTF-8',
        oe: 'UTF-8',
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
        q: text,
        [h.name]: h.value
      };

      let url = `${QUERY_API}?${querystring.stringify(params)}`;
      //console.log(url);

      let requestOptions;

      // if > 2048 characters -> POST method.
      if (url.length > 2048) {
        delete params.q;
        // follow translate API
        requestOptions = [
          `${url}?${querystring.stringify(params)}`,
          JSON.stringify({
            method: 'POST',
            body: {
              q: text
            }
          })
        ];
      }
      else {
        requestOptions = [url];
      }

      const response = await got(...requestOptions);
      const body = JSON.parse(response.body);
      //console.log(body);

      return processResponse(body);
    }
    catch(e) {
        if(e.name === 'HTTPError') {
          const error = new Error();
          error.name = e.name;
          error.statusCode = e.statusCode;
          error.statusMessage = e.statusMessage;
          throw error;
        }
        throw e;
    }
}

module.exports = tran;
