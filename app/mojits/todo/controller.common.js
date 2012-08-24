/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add("todo", function(Y, NAME) {

    Y.mojito.controllers[NAME] = {

        index: function(ac) {

        	ac.assets.addCss("./base.css");

            ac.done({});
        }

    };

}, "0.0.1", {requires: ["mojito"]});
