
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
process.env['FONTCONFIG_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/fonts'

import 'source-map-support/register';
import React from "react";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { renderToString } from "react-dom/server";
const { ServerStyleSheet } = require('styled-components');
const MemoryStream = require('memorystream');
import schema from './schema';
import Html from "../../templates/Html";
import ImageAuthorization from "../../templates/prizeReceipt/ImageAuthorization";

const wkhtmltopdf = require('wkhtmltopdf');

const render = async (html, memStream) => {
    return new Promise(resolve => {
        let pdf = "";
        wkhtmltopdf(html, { pageSize: "A4" },
            function(code, signal) {
                const read = memStream.read();
                console.log({ read, code, signal });
                if (read){
                    pdf = read.toString('base64');
                }
                resolve(pdf)
            }).pipe(memStream);
    });
};

const prizeReceipt: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event;
  const prizeDetails = body;

  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
  process.env['FONTCONFIG_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/fonts';

  var memStream = new MemoryStream();
  const sheet = new ServerStyleSheet();
  const bodyRes = renderToString(sheet.collectStyles(<ImageAuthorization prizeDetails={prizeDetails} />))
  const styles = sheet.getStyleTags();
  const title = 'Server side Rendering with Styled Components';

  const html = Html({
      body: bodyRes,
      styles,
      title
  })

  const pdf = await render(html, memStream);
  return formatJSONResponse({
      pdf
  })
}

export const main = middyfy(prizeReceipt);
