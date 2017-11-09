(function(){
    'use strict';
    var moment = require('moment');

    var debug = {

        section: function(title){
            if (typeof title == 'undefined') title = 'SECTION';
            title = formatDash(title, 40, '=', true);
            console.log(title.cyan);
        },

        title: function(title){
            title = formatDash(title, 40, '-');
            console.log(title.cyan);
        },

        sub_title: function(text){
            console.log(text.cyan + " ---");
        },

        end: function (){
            var text = formatDash("", 40, '-');
            console.log(text.cyan);
        },

        log: function(text, addTimestamp){
            text = formatText(text, addTimestamp);
            console.log(text.grey);
        },

        info: function(text, addTimestamp){
            text = formatText(text, addTimestamp);
            console.log(text.grey);
        },

        error: function(text, addTimestamp){
            text = formatText(text, addTimestamp);
            console.log(text.red);
        },

        warn: function(text, addTimestamp){
            text = formatText(text, addTimestamp);
            console.log(text.yellow);
        },

    };

    function formatText (text, addTimestamp) {
        if (typeof addTimestamp == 'undefined' || addTimestamp == null) addTimestamp = false;
        text = '[nodeadmin] ' + text;
        if (addTimestamp) text += ' @ ' + moment().format();
        return text;
    }

    function formatDash (text, width, dash, upper) {
        if (typeof upper == 'undefined' || upper == null) upper = false;

        var l = text.length;
        var count = (width - l - 1)/2;

        var fText = "";
        for (var i = 1; i <= count; i++) fText += dash;
        if (upper) fText += text.toUpperCase();
        else fText += text;
        for (var i = 1; i <= count; i++) fText += dash;

        return fText;
    }

    module.exports = debug;

}).call(this);
