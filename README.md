# 시작하며

```
npx create-next-app@latest --typescript
실행 명령어 npm run dev
```

## ul 이 li height 없으면
overflow hidden

## ul 두줄 할 때 
ul -> block
li -> float: left , width: 50%

## width 와 height 비율 맞춰서 background 하는 법
width + padding-top

## 도커 순서
```
Docker file example(official document) (output: 'standalone',)
docker build -t [image name] .    (Image name)
docker run -p 3000:3000 [image name] (외부포트:도커내부포트)

-> 맥북 m1 칩에서 할경우 amd 서버에서 에러발생함...
docker buildx build --platform=linux/amd64 -t [image name]:[version] . 
(default: docker buildx build --platform=linux/arm64 -t [image name]:[version] .)

-> 이미지 저장
docker save -o [save file name].tar [image name]
```