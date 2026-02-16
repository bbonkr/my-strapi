# 1단계: 빌드 단계
FROM node:lts-alpine AS build
# sharp 라이브러리 등을 위한 필수 패키지 설치
RUN apk update && apk add --no-cache build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app
COPY package.json package-lock.json ./
# 플러그인 의존성 설치
RUN npm install --production

COPY . .
# Strapi 관리자 패널 빌드
RUN npm run build

# 2단계: 실행 단계 (이미지 크기 최소화)
FROM node:lts-alpine
RUN apk add --no-cache vips-dev
ENV NODE_ENV=production

WORKDIR /opt/app
# 빌드 단계에서 생성된 결과물만 복사
COPY --from=build /opt/app ./

EXPOSE 3000
CMD ["npm", "run", "start"]