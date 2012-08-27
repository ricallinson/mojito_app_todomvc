/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
YUI.add("todo", function(Y, NAME) {

    Y.mojito.controllers[NAME] = {

        index: function(ac) {

        	var cfg = {
        			children: {
        				todos: {
        					type: "todo",
        					action: "listTodos"
        				}
        			}
        		};

        	ac.assets.addCss("./base.css");
            ac.assets.addCss("./extra.css");

        	ac.composite.execute(cfg, function (data, meta) {

                data.total = meta.total;
                data.completed = meta.completed;
                data.showClear = data.completed ? true : false;
                data.showFooter = data.total ? true : false;

        		ac.done(data);
        	});
        },

        listTodos: function (ac) {

        	ac.models.todo.all(function (todos) {

                var meta = {
                        total: todos.length,
                        completed: 0
                    };

                Y.Array.each(todos, function (todo) {
                    if (todo.completed) {
                        meta.completed = meta.completed + 1;
                    }
                });

        		ac.done({todos: todos}, meta);
        	});
        	
        },

        addTodo: function (ac) {

            var text = ac.params.merged("text"),
                todo = {};

            // If there is no text just return
            if (!text) {
                ac.done("");
                return;
            }

            todo = {
                guid: Y.guid(),
                text: text,
                completed: false
            };

            ac.models.todo.add(todo, function (stored) {

                if (!stored) {
                    ac.done("");
                    return;
                }

                ac.done({todos: [todo]}, "listTodos");
            });
        },

        completeTodo: function (ac) {

            var guid = ac.params.merged("guid"),
                completed = ac.params.merged("completed") ? true : false,
                todo;

            todo = {
                guid: guid,
                completed: completed
            };

            ac.models.todo.update(todo, function (stored) {
                ac.done({guid: guid, success: stored}, "json");
            });
        },

        removeTodo: function (ac) {

            var guid = ac.params.merged("guid");

            ac.models.todo.remove(guid, function (stored) {
                ac.done({guid: guid, success: stored}, "json");
            });
        }
    };

}, "0.0.1", {requires: ["mojito", "mojito-composite-addon", "todo-model"]});
