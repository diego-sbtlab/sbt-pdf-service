import type { AWS } from '@serverless/typescript';

import cachetReport from '@functions/cachetReport';
import prizeReceipt from "@functions/prizeReceipt";
import adsPlanDetail from "@functions/adsPlanDetail";

const serverlessConfiguration: AWS = {
  service: 'sbt-caravanas-service-file',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    cachetReport,
    prizeReceipt,
    adsPlanDetail
  },
};

module.exports = serverlessConfiguration;
