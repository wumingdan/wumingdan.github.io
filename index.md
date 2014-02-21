---
layout: page
title: Hello My World
tagline: your playground
---
{% include JB/setup %}

一个应该不怎么用，但又必须要存在的地方。

## Quick start

<video width="854" height="480" src="/custom/Landy-1.mp4" controls="controls">
浏览器不支持 video 标签。
</video>

## Post list

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## Title 3

Some text.


