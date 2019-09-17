FROM ubuntu
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN npm install -g @angular/cli
RUN mkdir test
ADD . /test
WORKDIR /test
RUN npm i
CMD nohup ng serve >> test.log &
