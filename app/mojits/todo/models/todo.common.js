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
                cache.add("todos", {});
            }

            //cache.add("todos", {});
        },

        all: function (cb) {
            cb(Y.Object.values(cache.retrieve("todos").response));
        },

        get: function (guid, cb) {

            var todos = cache.retrieve("todos").response;

            cb(todos[guid]);
        },

        add: function (todo, cb) {

            var todos = cache.retrieve("todos").response;

            if (!todo.guid) {
                cb(false);
            } else {
                todos[todo.guid] = todo;
                cache.add("todos", todos);
                cb(true);
            }
        },

        update: function (todo, cb) {

            var todos = cache.retrieve("todos").response,
                found;

            if (!todos[todo.guid]) {
                cb(false);
            } else {
                found = todos[todo.guid];

                found.text = todo.text || found.text;
                found.completed = todo.completed !== undefined ? todo.completed : found.completed;

                cache.add("todos", todos);
                cb(true);
            }
        },

        remove: function (guid, cb) {

            var todos = cache.retrieve("todos").response;

            if (!todos[guid]) {
                cb(false);
            } else {
                delete todos[guid];
                cache.add("todos", todos);
                cb(true);
            }
        }
    };
}, "", {
    requires: ["cache"]
});