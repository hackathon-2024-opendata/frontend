# frontend

## Version
* Node.js: v20.17.0
* npm: 10.8.2

## 環境構築手順

1. (省略可)Nodeのインストール(nvmを使用)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v20.17.0
```

2. リポジトリのインストール
```
git clone git@github.com:hackathon-2024-opendata/frontend.git
npm install
```

##### 環境構築メモ

```
$ npx create-next-app@latest
Need to install the following packages:
create-next-app@14.2.6
Ok to proceed? (y) y

✔ What is your project named? … frontend
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /home/seitoku/frontend.
```

## ディレクトリ構成

features構成を採用  
詳細なディレクトリ構成は以下の記事を参考にした
* [小さくはじめる Next.js App Router ディレクトリ構成 「featuresでコンポーネントを整理する」](https://qiita.com/miumi/items/359b8a77bbb6f9666950)

```
├── app          ... ルーティングに関するコンポーネント
├── features     ... ロジック + コンポーネントをまとめたもの
│   ├── common   ... 共通部分
│   └── routes   ... 特定のページで使うもの
├── components   ... ロジックがない共通コンポーンネント
├── hooks        ... 共通ロジックの内、React Hooksが「ある」もの
├── utils        ... 共通ロジックの内、React Hooksが「ない」もの
└── constants    ... 定数を定義したファイル
```
