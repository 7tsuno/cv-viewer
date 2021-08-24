# CV Viewer

職務経歴書を共有するアプリ

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
3. 資材をデプロイする

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/7tsuno/cv-viewer">
<img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify">
</a>
