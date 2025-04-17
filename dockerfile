FROM node:current

WORKDIR /home/node
COPY package.json package-lock.json ./
RUN npm install
COPY index.js ./
EXPOSE 3002

CMD ["npm", "start"]