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
        					action: "todos"
        				}
        			}
        		};

        	ac.assets.addCss("./base.css");

        	ac.composite.execute(cfg, function (data, meta) {

                data.total = 0;
                data.completed = 0;
                data.showFooter = data.total ? true : false;

        		ac.done(data);
        	});
        },

        todos: function (ac) {

        	ac.models.todo.list(function (todos) {
        		ac.done({todos: todos});
        	});
        	
        },

        addTodo: function (ac) {

            var text = ac.params.merged("text"),
                data = {};

            // If there is no text just return
            if (!text) {
                ac.done("");
                return;
            }

            data.todos = [
                {
                    id: "uuid",
                    text: text,
                    completed: false
                }
            ];

            ac.done(data, "todos");
        }
    };

}, "0.0.1", {requires: ["mojito", "mojito-composite-addon", "todo-model"]});
