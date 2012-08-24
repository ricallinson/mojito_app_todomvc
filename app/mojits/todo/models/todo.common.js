/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

"use strict";

YUI.add("todo-model", function (Y, NAME) {

    var todos = new Y.CacheOffline();

    Y.mojito.models.todo = {

        init: function (cfg) {
            this.cfg = cfg;
        },

        get: function (id) {
            return {};
        },

        list: function (cb) {
            var todos = [{
                    id: "uuid",
                    text: "Some test data that is for you",
                    completed: false
                },
                {
                    id: "uuid",
                    text: "Some test data that is for them",
                    completed: false
                }
            ];

            cb(todos);
        },

        add: function (todo) {
            return id;
        },

        remove: function (id) {
            return false;
        }
    };
}, "", {
    requires: ["cache"]
});