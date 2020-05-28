import fs from 'fs';
const indexHtml = fs.readFileSync('./index.html');

export function handler(event, context, callback) {
  const oembedHref = 'https://testing-playground.com';
  const oembedLink = `<link type="application/json+oembed href="${oembedHref}" title="Testing Playground" />`;

  const body = indexHtml.replace(
    /<link.*type="application\/json\+oembed".*>/g,
    oembedLink,
  );
  console.log(JSON.stringify(event, '', '  '));
  return callback(null, {
    body: body,
    headers: {
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=300',
      'Content-Type': 'text/html',
    },
  });
}
