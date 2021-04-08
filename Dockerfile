FROM node:10-alpine
WORKDIR /prom

ADD dist /prom
RUN ls -al /prom
ADD package.json /prom
RUN npm i --production

EXPOSE 9527
CMD ["/bin/sh", "-c", "node /prom/main.js"]