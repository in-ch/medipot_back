# Base image
FROM node:16-alpine

# 앱 디렉토리 생성
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 포트 노출
EXPOSE 4000

# 앱 실행
CMD ["sh", "-c", "NODE_ENV=prod npm run start:prod"]