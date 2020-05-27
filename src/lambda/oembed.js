export function handler(event, context, callback) {
  const {
    url,
    format = 'json',
    maxwidth = '100%',
    maxheight = '400px',
  } = event.queryStringParameters;

  if (format !== 'json') {
    return callback(Error('unsupported format'));
  }

  const hash = (url || '').split('#')[1];

  if (!hash) {
    return callback(Error('incorrect url provided'));
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
      {
        version: '1.0',
        type: 'rich',

        provider_name: 'Testing-Playground',
        provider_url: 'https://testing-playground.com',

        author_name: 'Stephan Meijer',
        author_url: 'https://www.fwdeveryone.com/u/alex3917',

        html: `<iframe src="https://testing-playground.com/embed?#${hash}" width="${maxwidth}" height="${maxheight}" scrolling="no" frameborder="0" allowfullscreen></iframe>`,
        width: maxwidth,
        height: maxheight,

        thumbnail_url: 'https://testing-playground.com/public/icon.png',
        thumbnail_width: 512,
        thumbnail_height: 512,

        referrer: '',
        cache_age: 3600,
      },
      '',
      '  ',
    ),
  });
}
