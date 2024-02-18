FROM node:12.19-alpine
RUN mkdir /srv/be-e-voting
WORKDIR /srv/be-e-voting
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN chmod +x run.prod.sh
RUN chmod +x run.entrypoint.sh
CMD ["sh", "run.entrypoint.sh"]
