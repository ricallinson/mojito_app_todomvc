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
        			var text = Y.Escape.html(Y.Lang.trim(e.currentTarget.get("value")));
        			self.mp.invoke("addTodo", {params: {body: {text: text}}}, function (err, html) {
		        		if (err) {
		        			Y.log(err);
		        		} else if (html) {
		        			node.one("#todo-list").append(html);
		        			self.syncUI(node);
		        		}
		        	});
	                e.currentTarget.set("value", "");
	            }
        	}, "#new-todo");

            // Listen for a edited todo
            node.delegate(["keypress", "blur"], function (e) {
                if (e.type === "blur" || e.keyCode === 13) {
                    var guid = e.currentTarget.ancestor("li").get("id"),
                        text = Y.Escape.html(Y.Lang.trim(e.currentTarget.get("value")));
                    self.mp.invoke("updateTodo", {params: {body: {guid: guid, text: text}}}, function (err, html) {
                        if (err) {
                            Y.log(err);
                        } else if (html) {
                            e.currentTarget.ancestor("li").removeClass('editing');
                            e.currentTarget.ancestor("li").one("label").setHTML(text);
                            self.syncUI(node);
                        }
                    });
                }
            }, "input.edit");

            // Listen for an edit click
            node.delegate("dblclick", function (e) {
                var li = e.currentTarget.ancestor("li");
                li.addClass('editing');
                li.one("input.edit").focus();
            }, "label");

        	// Listen for a todo (un)complete click
        	node.delegate("click", function (e) {
        		var guid = e.currentTarget.ancestor("li").get("id");
        		self.mp.invoke("updateTodo", {params: {body: {guid: guid, completed: !e.currentTarget.ancestor("li").hasClass("completed")}}}, function (err, data) {
	        		if (data && data.success) {
	        			Y.one("#" + data.guid).toggleClass("completed");
	        			self.syncUI(node);
	        		}
	        	});
        	}, ".toggle");

            // Listen for a todo remove click
            node.delegate("click", function (e) {
                var guid = e.currentTarget.ancestor("li").get("id");
                self.remove(guid, node, function () {
                    self.syncUI(node);
                });
            }, ".destroy");

        	// Listen for a clear completed click
        	node.one("#clear-completed").on("click", function () {
        		node.all("#todo-list li.completed").each(function (li) {
        			self.remove(li.get("id"), node, function () {
        				self.syncUI(node);
        			});
        		});
        	});

            // Sync to Local Storage
            self.mp.invoke("listTodos", function (err, html) {
                if (html) {
                    node.one("#todo-list").append(html);
                    self.syncUI(node);
                }
            });
        },

        remove: function (guid, node, cb) {
        	this.mp.invoke("removeTodo", {params: {body: {guid: guid}}}, function (err, data) {
        		if (data && data.success) {
        			node.one("#" + data.guid).remove();
        			cb();
        		}
        	});
        },

        syncUI: function (node) {
        	var completed = node.all("#todo-list li.completed").size(),
        		left = node.all("#todo-list li").size() - completed;

        	node.one("#todo-count strong").setHTML(left);
    		node.one("#clear-completed em").setHTML(completed);

    		if (left + completed) {
    			node.one("#footer").removeClass("hidden");
    		} else {
    			node.one("#footer").addClass("hidden");
    		}

    		if (completed) {
    			node.one("#clear-completed").removeClass("hidden");
    		} else {
    			node.one("#clear-completed").addClass("hidden");
    		}
        }
    };

}, "0.0.1", {requires: ["mojito-client", "node", "escape", "event-focus"]});
