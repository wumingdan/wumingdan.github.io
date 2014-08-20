---
layout: page
title: Hello, My World
tagline: your playground
---
{% include JB/setup %}

测试测试测试

## Quick start

<video width="854" height="480" src="/custom/Landy.mp4" controls="controls" onclick="_hmt.push(['_trackEvent', 'video', 'play', 'Landy预告片']);">
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


