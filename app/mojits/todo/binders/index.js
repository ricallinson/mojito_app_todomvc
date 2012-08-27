/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add("todo_binder_index", function(Y, NAME) {

    Y.namespace("mojito.binders")[NAME] = {
        
    	init: function (mp) {
    		this.mp = mp;
    	},

        bind: function (node) {
        	var self = this;

        	// Listen for a new todo
        	node.delegate("keypress", function (e) {
        		if (e.keyCode === 13) {
	                self.addTodo(Y.Escape.html(Y.Lang.trim(e.currentTarget.get("value"))), node.one("#todo-list"));
	                e.currentTarget.set("value", "");
	            }
        	}, "#new-todo");
        },

        addTodo: function (text, list) {
        	this.mp.invoke("addTodo", {params: {body: {text: text}}}, function (err, html) {
        		if (err) {
        			Y.log(err);
        		} else if (html) {
        			list.append(html);
        		}
        	});
        }
    };

}, "0.0.1", {requires: ["mojito-client"]});
