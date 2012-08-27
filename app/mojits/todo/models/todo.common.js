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
            var todos = [];

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