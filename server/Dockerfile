FROM node:12.19-alpine
RUN mkdir /srv/be-template
WORKDIR /srv/be-template
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN chmod +x run.prod.sh
RUN chmod +x run.entrypoint.sh
CMD ["sh", "run.entrypoint.sh"]
