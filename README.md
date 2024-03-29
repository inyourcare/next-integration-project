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

## Prisma

```
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
```

### Prisma database control
[https://next-auth.js.org/adapters/prisma]
```
DATABASE_URL="file:./dev.db" 
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
설정을 활용하면 sqlite 로도 사용 가능
아래는 스키마 파일 생성 후 적용 
```
npx prisma db push
npx prisma studio
```

### seeding 
[seeding](https://www.prisma.io/docs/guides/database/seed-database)
```
npx prisma db seed
```

### 프리즈마 클라이언트 이용
```
npx prisma generate
->
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

마이그레이션 코드 -> 스키마만 로드함, 변경사항도 체크함
```
npx prisma migrate dev
```


### 프리즈마 데이터 타입
[설명](https://www.prisma.io/docs/concepts/components/prisma-migrate/supported-types-and-db-features)

### 프리즈마 기타
```
모든 필드 찾기
console.log("Account fields:", Prisma.dmmf.datamodel.models.find(model => model.name === "Account").fields)
```

### Cannot use import statement outside a module
```
# package.json

...
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
...

```


## git history 제거
```
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ./.env" --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
```

## Carousel
flex: 0 0 auto; 
flex-grow -> 0 보다 클경우 남은 여백을 채운다
flex-shrink -> 1 이상일 때 부모 컨테이너 크기가 아이템보다 작을경우 부모 컨테이너에 맞춰서 크기를 줄인다
flex-basis -> 아이템의 기본 사이즈 컨텐츠의 크기에 따라 사이즈 결정(auto)

이미지/캐러슬/아래 이미지 수 만큼 돌리도록 만들었다.


## Hydrate
Hydrate는 Server Side 단에서 렌더링 된 정적 페이지와 번들링된 JS파일을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML 코드와 React인 JS코드를 서로 매칭 시키는 과정을 말한다.

React Query는 서버에서 데이터를 prefetch해와 queryClient에 넘겨주는 것에 있어 두 가지 방식을 지원한다.

- 직접 데이터를 prefetch해와서 initialData로 넘겨주는 것
- 서버에서 query를 prefetch하고, 그 cache를 dehydrate해서 클라이언트에 그것을 rehydrate하는 것

```
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Hydrate>
  </QueryClientProvider>
```
위와 같이 hydrate 하는 것이 두번째 방법이고, initialData fetching 을 따로 할 필요가 없어 이득이다.

## .env
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

## .env.development.local
```
HOST=http://localhost/api/og

NEXT_PUBLIC_NEXTAUTH=enable
NEXTAUTH_URL=http://localhost:3000/api/auth
NEXTAPI_BASE_URL=http://localhost:3000/api
NEXTAUTH_SECRET=any-secret-word

KAKAO_CLIENT_ID=$ID
KAKAO_CLIENT_SECRET=$ID
NAVER_CLIENT_ID=$ID
NAVER_CLIENT_SECRET=$ID
GOOGLE_CLIENT_ID=$ID
GOOGLE_CLIENT_SECRET=$ID
```


## Graphql 을 적용해보자
[참고](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/)
https://studio.apollographql.com/sandbox/explorer 에서 로그인 후 Graph 생성하여 확인

- Root path 에 apollo.ts (Client 생성) 만들어주면 자동으로 등록 되는 듯

### Graphql 이 내 nextjs 의 api 를 사용 가능하게 하려면 어떻게 해야할까
[참고](https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/)


### 아래는 대창경 프로젝트 Readme 파일 내용
```
시작하며
npx create-next-app@latest --typescript
실행 명령어 npm run dev
ul 이 li height 없으면
overflow hidden

ul 두줄 할 때
ul -> block li -> float: left , width: 50%

width 와 height 비율 맞춰서 background 하는 법
width + padding-top

도커 순서
Docker file example(official document) (output: 'standalone',)
docker build -t [image name] .    (Image name)
docker run -p 3000:3000 [image name] (외부포트:도커내부포트)

-> 맥북 m1 칩에서 할경우 amd 서버에서 에러발생함...
docker buildx build --platform=linux/amd64 -t [image name]:[version] . 
(default: docker buildx build --platform=linux/arm64 -t [image name]:[version] .)

-> 이미지 저장
docker save -o [save file name].tar [image name]
```