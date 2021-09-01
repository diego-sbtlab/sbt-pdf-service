import PlanDetail from "../../templates/adsPlanDetail/PlanDetail";

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

const wkhtmltopdf = require('wkhtmltopdf');

const renderReport = (accountability) => {
  return (<PlanDetail accountability={accountability} />)
}

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

const cachetReport: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event;
  const accountability = body;

  // Estas duas configurações abaixo faz o lambda enxergar a path dos binários
  // Sempre inserir na funcao e de forma global
  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
  process.env['FONTCONFIG_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/fonts';

  var memStream = new MemoryStream();

  const sheet = new ServerStyleSheet();

  const bodyRes = renderToString(sheet.collectStyles(renderReport(accountability)));

  const styles = sheet.getStyleTags();
  const title = 'ADS - Plano detalhado';

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

export const main = middyfy(cachetReport);
