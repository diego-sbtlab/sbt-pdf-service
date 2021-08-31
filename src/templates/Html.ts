/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta http-equiv="Content-Language" content="pt-br">
     <meta  http-equiv='Content-Type' content='text/html; charset=UTF-8' />
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
      <title>${title}</title>
      ${styles}
    </head>
      <style>
     
         @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

         html {
            font-family: 'Open Sans', sans-serif;
         }
         body {
             font-family: 'Open Sans', sans-serif;
         }
      </style>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default Html;