FROM ubuntu:16.04

RUN apt-get -y update
ENV PGVER 9.5
RUN apt-get install -y postgresql-$PGVER

USER postgres
RUN /etc/init.d/postgresql start &&\
    psql --command "ALTER USER postgres WITH SUPERUSER PASSWORD '12345';" &&\
    createdb -E utf8 -T template0 -O postgres base &&\
    /etc/init.d/postgresql stop

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

USER root

RUN apt-get -y update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN apt -y install nodejs-legacy

ENV APP /root/app
ADD ./ $APP

WORKDIR $APP
RUN npm install

EXPOSE 5000

CMD service postgresql start && npm start