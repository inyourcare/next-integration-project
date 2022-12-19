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

## 멀티 랭귀지 설정
- next.config.js 에서 locale 등록
- public/ 아래 json 파일로 저장
```
{
    "posts": [
      {
        "locale": "en-US",
        "title": "Sample Title For the First Blog Post in English",
        "description": "This is the first blog post in English published on the blog",
        "image": "https://source.unsplash.com/GnvurwJsKaY/1600x900"
      },
      {
        "locale": "en-US",
        "title": "Sample Title For the Second Blog Post in English",
        "description": "This is the second blog post in English published on the blog",
        "image": "https://source.unsplash.com/8XddFc6NkBY/1600x900"
      },
      {
        "locale": "es-ES",
        "title": "Título de ejemplo para la primera entrada en español del blog",
        "description": "Esta es la primera entrada del blog en español publicada en el blog",
        "image": "https://source.unsplash.com/0gkw_9fy0eQ/1600x900"
      },
      {
        "locale": "es-ES",
        "title": "Título de ejemplo para la segunda entrada en español del blog",
        "description": "Esta es la segunda entrada del blog en español publicada en el blog",
        "image": "https://source.unsplash.com/q10VITrVYUM/1600x900"
      },
      {
        "locale": "it-IT",
        "title": "Titolo di esempio per il primo post in italiano del blog",
        "description": "Questo è il primo post in italiano pubblicato nel blog",
        "image": "https://source.unsplash.com/xG8IQMqMITM/1600x900"
      }
    ]
}
```
- import blogPosts from 'public/lang/posts.json'; 와 같이 불러오고 아래와 같이 쓴다
```
    {blogPosts.posts
    .filter(p => p.locale === locale)
    .map((blogPost, i) => {
        // return <BlogCard key={i} blogPost={blogPost} />;
        return (<div><span>{i}</span><span>{`${blogPost.title} ${blogPost.description}`}</span></div>)
    })}
```