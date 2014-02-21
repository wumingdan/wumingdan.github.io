---
layout: page
title: Hello World
tagline: my playground
---
{% include JB/setup %}

一个应该不怎么用，但又必须要存在的地方。

Sample [link](http://www.baidu.com).

## Title 1

In `_config.yml` remember to specify your own data:
    
    title : My Blog =)
    
    author :
      name : Name Lastname
      email : blah@email.test
      github : username
      twitter : username

The theme should reference these variables whenever needed.

## Post list

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## Title 3

Some text.


