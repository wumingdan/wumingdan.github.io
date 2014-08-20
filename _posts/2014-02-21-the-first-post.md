---
layout: post
title: "The first post"
description: ""
category: 
tags: []
---
{% include JB/setup %}


### 新建文章

首先到根目录，在命令行下执行如下命令

	rake post title = "文章标题"

之后会在 `_posts` 目录下生成对应的 `md` 文件，比如你在 title 里的内容是 `Hello World`，那么会生成如 2014-02-21-Hello—World.md 这样一个标题的文件

或者也可以直接手动在 `_posts` 目录下按照规则直接创建文件，日期 + 标题


### 文章内容

[wordpress](https://wordpress.org/) 可能使用起来更方便点，但是作为一个 `技术人员` 咱们稍微有点难度吧~。

### 编译发布

本地的话需要首先跑一个命令让 [markdown](http://markdown.tw/) 语法的文件转换为 `html`，要不然你本地浏览器里内容不会更新的。

	jekyll build

最后就是发布了，只需要把代码同步到 `github` 即可。




