FROM node:4-onbuild
RUN ./node_modules/.bin/gulp build
