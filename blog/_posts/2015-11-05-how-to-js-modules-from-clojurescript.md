---
layout: post
title:  "How to use JS modules (CommonJS, AMD and ES6) from ClojureScript"
date:   2015-11-05
categories: clojurescript
---

> This document is a work in progress. You can report issues [here](https://github.com/dgellow/dgellow.github.io/issues).

JS packages are written in a variety of different and incompatible standards. To only cite the most popular of them you have [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) (used by npm), [AMD](http://requirejs.org/docs/whyamd.html) and [ES6's modules](http://exploringjs.com/es6/ch_modules.html).


ClojureScript makes usage of [Google Closure for dependency management](https://github.com/clojure/clojurescript/wiki/Google-Closure#dependency-management), therefore for a js library to be usable from clojurescript it needs to follow [Closure Library's conventions](https://developers.google.com/closure/library/docs/introduction?csw=1#deps).

The ClojureScript compiler offers three ways to use a JS module:

- [`:libs`](https://github.com/clojure/clojurescript/wiki/Compiler-Options#libs) for libraries following Closure's conventions.
- [`:foreign-libs` in combination with `:externs`](https://github.com/clojure/clojurescript/wiki/Compiler-Options#externs), can be used for any javascript library. You will need to manually create a js file declaring objects and functions you want to export. It's what do the [cljsjs project](https://github.com/cljsjs/packages/wiki/Creating-Externs).
- [`:foreign-libs` with `:module-type`](https://github.com/clojure/clojurescript/wiki/Compiler-Options#foreign-libs), will leverage Closure's support for common used module standards. It's the most interesting way to use a js library as you can import them from [`npm`](https://www.npmjs.com/). It's also the least known method as [it has only be implemented recently](https://github.com/clojure/clojurescript/wiki/Google-Summer-of-Code-2015) thanks to [Maria Geller](https://github.com/mneise).

## JS modules following Google Closure's conventions

> TODO

## JS modules not following any standard

> TODO

## JS modules following CommonJS, AMD or ES6

You will need a recent version of ClojureScript (not sure what was the first version to support the `:module-type`, but anything after `"1.7.145"` works from my experience).

I'm using boot but it shouldn't be too much different with leiningen.

For this example I will use a CommonJS module called [bailer](https://github.com/dgellow/bailer), available via `npm`.

{% highlight bash %}
$ npm install bailer
{% endhighlight %}

The project is structured like this:

{% highlight bash %}
.
|-- README.md
|-- build
|   `-- main.cljs.edn
|-- build.boot
|-- html
|   `-- index.html
|-- node_modules
|   `-- bailer
|       |-- README.md
|       |-- index.js
|       |-- package.json
|       `-- test.js
`-- src
    `-- com
        `-- foo
            `-- bar
                `-- core.cljs
{% endhighlight %}

In the `boot.build` we will specify compilers options (it can also be done from `*.cljs.edn` files, see [boot documentation](https://github.com/adzerk-oss/boot-cljs#options)).

{% highlight clojure %}
(set-env!
 :source-paths #{"src"}
 :resource-paths #{"html"}
 :dependencies '[[adzerk/boot-cljs "1.7.48-6" :scope "test"]
                 [org.clojure/clojurescript "1.7.145"]])

(require
 '[adzerk.boot-cljs :refer [cljs]])

(task-options! cljs {:compiler-options
                     {:foreign-libs [{:file "node_modules/bailer/index.js"
                                      :provides ["dgellow.bailer"]
                                      :module-type :commonjs}]}})
{% endhighlight %}

In `src/com/foo/bar/core.cljs`, we have the following:

{% highlight clojure %}
(ns com.foo.bar.core
  (:require [dgellow.bailer :refer [validate validations]]))

(defn main []
  (let [person #js {:age 20
                    :email "john.doe@example.org"}]
  (js-debugger)
  (.dir js/console
        (validate person
                  (clj->js {:name [(.-required validations)]}))))
{% endhighlight %}

We can now build everything and it should works (check the browser dev tool)

{% highlight bash %}
$ boot cljs
{% endhighlight %}
