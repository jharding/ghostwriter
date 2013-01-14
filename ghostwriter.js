// ghostwriter
// ===========
// * GitHub: https://github.com/jharding/ghostwriter
// * Copyright (c) 2013 Jake Harding
// * Licensed under the MIT license.
(function(exports, global) {
    global["ghostwriter"] = exports;
    var utils = function() {
        var nativeForEach = Array.prototype.forEach, nativeMap = Array.prototype.map, nativeBind = Function.prototype.bind, slice = Array.prototype.slice, breaker = {}, Ctor = function() {};
        return {
            isString: function(obj) {
                return typeof obj === "string";
            },
            isArray: function(obj) {
                Object.prototype.toString.call(obj) === "[object Array]";
            },
            each: function(obj, iterator, context) {
                if (!obj) {
                    return;
                }
                if (nativeForEach && obj.forEach === nativeForEach) {
                    obj.forEach(iterator, context);
                } else if (obj.length === +obj.length) {
                    for (var i = 0, l = obj.length; i < l; i++) {
                        if (iterator.call(context, obj[i], i, obj) === breaker) {
                            return;
                        }
                    }
                } else {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (iterator.call(context, obj[key], key, obj) === breaker) {
                                return;
                            }
                        }
                    }
                }
            },
            map: function(obj, iterator, context) {
                var results = [];
                if (!obj) {
                    return results;
                }
                if (nativeMap && obj.map === nativeMap) {
                    return obj.map(iterator, context);
                }
                utils.each(obj, function(value, index, list) {
                    results[results.length] = iterator.call(context, value, index, list);
                });
                return results;
            },
            bind: function(func, context) {
                var that, args, bound, result;
                if (func.bind === nativeBind && nativeBind) {
                    return nativeBind.apply(func, slice.call(arguments, 1));
                }
                if (!_.isFunction(func)) {
                    throw new TypeError();
                }
                args = slice.call(arguments, 2);
                return bound = function() {
                    if (!this instanceof bound) {
                        return func.apply(context, args.concat(slice.call(arguments)));
                    }
                    ctor.prototype = func.prototype;
                    that = new Ctor();
                    ctor.prototype = null;
                    result = func.apply(self, args.concat(slice.call(arguments)));
                    return Object(result) === result ? result : that;
                };
            },
            merge: function(array) {
                return [].concat.apply([], array);
            },
            mixin: function(target) {
                var args = [].slice.call(arguments, 1), source;
                while (source = args.shift()) {
                    for (var k in source) {
                        source.hasOwnProperty(k) && (target[k] = source[k]);
                    }
                }
                return target;
            },
            isRepeatified: function(obj) {
                return "_repeatified_" in obj;
            },
            repeatify: function(strokes) {
                var repeatifiedStrokes = {};
                utils.each(strokes, function(val, key) {
                    repeatifiedStrokes[key] = function repeat(times) {
                        var strokes = [];
                        while (times--) {
                            strokes.push(val);
                        }
                        return strokes;
                    };
                    repeatifiedStrokes[key]._repeatified_ = true;
                });
                return repeatifiedStrokes;
            },
            getKeyEvent: function(type, key) {
                var event = $.Event(type);
                event.which = event.keyCode = utils.isString(key) ? key.charCodeAt(0) : key;
                return event;
            },
            getCursorPos: function($input) {
                var selectionStart = $input[0].selectionStart;
                if (selectionStart) {
                    return selectionStart;
                } else if (document.selection) {
                    $input.focus();
                    var range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return range.text.length;
                }
            },
            setCursorPos: function($input, pos) {
                var input = $input[0], textRange;
                if (input.createTextRange) {
                    textRange = input.createTextRange();
                    textRange.collapse(true);
                    textRange.moveEnd(pos);
                    textRange.moveStart(pos);
                    textRange.select();
                } else if (input.setSelectionRange) {
                    input.setSelectionRange(pos, pos);
                }
            }
        };
    }();
    var strokes = {
        character: function(newChar, $input, cursorPos, val) {
            $input.trigger(utils.getKeyEvent("keydown", newChar)).trigger(utils.getKeyEvent("keypress", newChar)).trigger(utils.getKeyEvent("textInput", newChar)).trigger(utils.getKeyEvent("keyup", newChar)).val(val.before + newChar + val.after).trigger(utils.getKeyEvent("input", newChar));
            utils.setCursorPos($input, cursorPos + 1);
        },
        backspace: function($input, cursorPos, val) {
            var keyCode = 8, newCursorPos = cursorPos === 0 ? 0 : cursorPos - 1;
            $input.trigger(utils.getKeyEvent("keydown", keyCode)).val(val.before.substr(0, newCursorPos) + val.after).trigger(utils.getKeyEvent("keyup", keyCode));
            if ($input.val() !== val.all) {
                $input.trigger(utils.getKeyEvent("input", keyCode));
            }
            utils.setCursorPos($input, cursorPos);
        },
        right: function($input, cursorPos) {
            var keyCode = 39;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            utils.setCursorPos($input, cursorPos + 1);
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        left: function($input, cursorPos) {
            var keyCode = 37;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            utils.setCursorPos($input, cursorPos - 1);
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        up: function($input) {
            var keyCode = 38;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        down: function($input) {
            var keyCode = 40;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        enter: function($input) {
            var keyCode = 13;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        tab: function($input) {
            var keyCode = 9;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        esc: function($input) {
            var keyCode = 27;
            $input.trigger(utils.getKeyEvent("keydown", keyCode));
            $input.trigger(utils.getKeyEvent("keyup", keyCode));
        },
        selectAll: function($input) {
            $input.select();
        },
        deleteAll: function($input, cursorPos, val) {
            var keyCode = 8;
            $input.trigger(utils.getKeyEvent("keydown", keyCode)).val("").trigger(utils.getKeyEvent("keyup", keyCode));
            if ($input.val() !== val.all) {
                $input.trigger(utils.getKeyEvent("input", keyCode));
            }
        },
        noop: function() {}
    };
    var Ghost = function() {
        function Ghost(o) {
            this.loop = !!o.loop;
            this.intervalId = null;
            this.interval = o.interval || 300;
            this.$input = $(o.input);
            this.originalInputVal = this.$input.val();
            this.story = [];
            this.manuscript = parseManuscript(o.manuscript);
        }
        utils.mixin(Ghost.prototype, {
            start: function() {
                if (!this.intervalId) {
                    this.$input.focus();
                    this.story = this.story.length ? this.story : this.manuscript.slice(0);
                    this.intervalId = setInterval(utils.bind(write, this), this.interval);
                }
                return this;
            },
            pause: function() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
                return this;
            },
            stop: function() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                    this.$input.blur();
                    this.$input.val(this.originalInputVal);
                }
                return this;
            },
            restart: function() {
                this.stop();
                this.$input.val(this.originalInputVal);
                this.story = [];
                this.start();
                return this;
            }
        });
        function parseManuscript(manuscript) {
            manuscript = utils.isString(manuscript) ? [ manuscript ] : manuscript;
            manuscript = utils.map(manuscript, function(section) {
                if (utils.isString(section)) {
                    return utils.map(section.split(""), function(c) {
                        return utils.bind(strokes.character, null, c);
                    });
                } else if (utils.isRepeatified(section)) {
                    return section(1);
                }
                return section;
            });
            return utils.merge(manuscript);
        }
        function write() {
            var next = this.story.shift(), cursorPos = utils.getCursorPos(this.$input) || 0, inputVal = this.$input.val(), beforeCursor = inputVal.substr(0, cursorPos), afterCursor = inputVal.substr(cursorPos);
            switch (typeof next) {
              case "function":
                next(this.$input, cursorPos, {
                    all: inputVal,
                    before: beforeCursor,
                    after: afterCursor
                });
                break;

              case "undefined":
                this.loop ? this.restart() : this.stop();
                break;

              default:
                throw new Error("bad story");
            }
        }
        return Ghost;
    }();
    utils.mixin(exports, utils.repeatify(strokes), {
        haunt: function(o) {
            return new Ghost(o);
        }
    });
    delete exports.character;
})({}, function() {
    return this;
}());