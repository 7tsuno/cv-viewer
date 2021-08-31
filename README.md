# CV Viewer

職務経歴書を共有するアプリ

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/7tsuno/cv-viewer">
<img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify">
</a>  


## システム構成

### バックエンド

Netlify Functions

### フロントエンド

Netlify Hosting

### Headless CMS

Contentful

## Usage

1. Contentful で report という名前の以下属性を持つ contentType を作成する

```
{
  title: string // 案件のタイトル
  startDate: string // 案件の開始年月日
  endDate: string // 案件の終了年月日
  text: string // 案件の内容(マークダウン形式)
  os?: string[] // 案件で利用したOS
  language?: string[] // 案件で利用した言語
  skill?: string[] // 案件で利用したスキル
  db?: string[] // 案件で利用したデータベース
  memberAndRole: string // 案件でのメンバー数とロール
}

```

2. contentType report の content を作成する(経歴の作成)
3. Deploy To Netlify ボタンで資材をデプロイする

4. 資材デプロイ時に環境変数を設定する。

設定値

```
  CONTENTFUL_SPACE_ID : ContentfulのSpaceのIDを設定する
  CONTENTFUL_TOKEN : ContentfulのContent Delivery APIのaccess tokenの値を設定する
  CONTENTFUL_ENVIRONMENT : 環境名を設定する デフォルトで作成している場合はmasterになる
  AUTH_SECRET : 認証するjwtの共通鍵の値 任意の値に設定する
  AUTH_USER_LIST : 認証するユーザ名の一覧をカンマ区切りで設定する
  AUTH_ISSUER : 発行者のIDを設定する デプロイしたURL https://cv-viewer.netlify.app など
  AUTH_AUDIENCE : 利用者のIDを設定する FunctionのURL https://cv-viewer.netlify.app/.netlify/functions など
  GENERATE_SOURCEMAP : Reactのソースマップを作るかを設定する falseを推奨
```

例

```
  CONTENTFUL_SPACE_ID : spaceid
  CONTENTFUL_TOKEN : token
  CONTENTFUL_ENVIRONMENT : master
  AUTH_SECRET : secretkey
  AUTH_USER_LIST : taro,jiro,takashi
  AUTH_ISSUER : https://cv-viewer.netlify.app
  AUTH_AUDIENCE : https://cv-viewer.netlify.app/.netlify/functions
  GENERATE_SOURCEMAP : false
```

5. 認証トークンを作成する。 環境変数に設定した `AUTH_SECRET` を利用し、 jwt.io などで payload 部に以下の値を持つトークンを HS256 で作成する。

設定値

```
  iss : 環境変数に設定したAUTH_ISSUERの値
  aud : 環境変数に設定したAUTH_AUDIENCEの値
  name : 環境変数に設定したAUTH_USER_LISTの中に含まれるユーザ名
  exp : jwtが使えなくなる時刻(UNIXTIME)
```

例

```
{
  "iss": "https://cv-viewer.netlify.app",
  "aud": "https://cv-viewer.netlify.app/.netlify/functions",
  "name": "taro",
  "exp": 1631199600
}
```

6. 作成したトークンをクエリパラメータ `token` に乗せてアクセスする。 例 : `https://cv-viewer.netlify.app?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3h4eHgubmV0bGlmeS5hcHAiLCJhdWQiOiJodHRwczovL3h4eHgubmV0bGlmeS5hcHAvLm5ldGxpZnkvZnVuY3Rpb25zIiwibmFtZSI6InNhbXBsZSIsImV4cCI6MTYzMTE5OTYwMH0.yDdDZuO6LlfMKz_pHWrjfX6GhaXXvWVVPn8121csY5k`
