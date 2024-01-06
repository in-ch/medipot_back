# Base image
FROM node:20-alpine

# 앱 디렉토리 생성
RUN mkdir -p /app
WORKDIR /app
ADD . /app/

# 앱 종속성 설치
RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm install --legacy-peer-deps

# 앱 빌드
RUN npm run build

# 포트 노출
EXPOSE 4000

# 앱 실행
CMD ["sh", "-c", "npm run start:prod"]