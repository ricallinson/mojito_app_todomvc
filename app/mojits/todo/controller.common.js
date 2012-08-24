/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add("todo", function(Y, NAME) {

    Y.mojito.controllers[NAME] = {

        index: function(ac) {

        	var cfg = {
        			children: {
        				items: {
        					type: "todo",
        					action: "todos"
        				}
        			}
        		};

        	ac.assets.addCss("./base.css");

        	ac.composite.execute(cfg, function (data, meta) {
        		ac.done(data);
        	});
        },

        todos: function (ac) {

        	ac.models.todo.list(function (todos) {
        		ac.done({todos: todos});
        	});
        	
        }
    };

}, "0.0.1", {requires: ["mojito", "mojito-composite-addon", "todo-model"]});
