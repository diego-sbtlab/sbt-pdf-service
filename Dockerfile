FROM public.ecr.aws/lambda/nodejs:12

WORKDIR /app

ARG GIT_USER
ARG GIT_PASS
RUN npm install yarn -g

RUN yarn -v

COPY . /app
COPY package.json /app
RUN yarn global add nodemon ts-node typescript serverless
RUN npm install


CMD ["app.handler"]