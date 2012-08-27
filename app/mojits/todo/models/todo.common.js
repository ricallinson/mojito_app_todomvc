/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

"use strict";

YUI.add("todo-model", function (Y, NAME) {

    var cache = new Y.CacheOffline();

    Y.mojito.models.todo = {

        init: function (cfg) {
            this.cfg = cfg;

            if (!cache.retrieve("todos")) {
                cache.add("todos", []);
            }

            // Remove after developemt
            // cache.add("todos", []);
        },

        all: function (cb) {
            cb(cache.retrieve("todos").response);
        },

        get: function (guid, cb) {

            var todos = cache.retrieve("todos").response;

            Y.Array.each(todos, function (todo) {
                if (todo.guid === guid) {
                    cb(todo);
                }
            });
        },

        add: function (todo, cb) {

            var todos = cache.retrieve("todos").response,
                found;

            Y.Array.each(todos, function (current) {
                if (current.guid === todo.guid) {
                    found = current;
                }
            });

            if (found) {
                cb(false);
            } else {
                todos.push(todo);
                cb(true);
            }

            cache.add("todos", todos);
        },

        update: function (todo, cb) {

            var todos = cache.retrieve("todos").response,
                found;

            Y.Array.each(todos, function (current) {
                if (current.guid === todo.guid) {
                    found = current;
                }
            });

            if (found) {
                found.text = todo.text || found.text;
                found.completed = todo.completed !== undefined ? todo.completed : found.completed;
                cache.add("todos", todos);
                cb(true);
            } else {
                cb(false);
            }
        },

        remove: function (guid, cb) {
            
            var todos = cache.retrieve("todos").response,
                found = null;

            Y.Array.each(todos, function (current, index) {
                if (current.guid === guid) {
                    found = index;
                }
            });

            if (found !== null) {
                if (found === 0) {
                    todos = todos.slice(1);
                } else {
                    todos = todos.slice(0, found).concat(todos.slice(found + 1));
                }
                cache.add("todos", todos);
                cb(true);
            } else {
                cb(false);
            }
        }
    };
}, "", {
    requires: ["cache"]
});