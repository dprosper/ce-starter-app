# build server application.
# FROM golang:buster as buildgo
FROM icr.io/codeengine/golang:alpine as buildgo
WORKDIR /go/src/app
ADD ./api /go/src/app
ADD ./internal /go/src/app/internal
ADD ./go.mod /go/src/app
RUN go get -d -v ./...
RUN go build -ldflags="-s -w" -o /go/bin/app

# build client application.
FROM node:lts-alpine as buildjs
WORKDIR /app
ADD ./webui/ ./
RUN npm ci --silent
RUN npm run build

# Now copy it into our build images.
# FROM gcr.io/distroless/base
FROM icr.io/codeengine/alpine
COPY --from=buildgo /go/bin/app /
COPY --from=buildjs /app/build /public
CMD ["/app"]
