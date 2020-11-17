/*
  JWL - The JavaScript Widget Library version 0.8.7
  Copyright (c) 2016 - 2020 The Zonebuilder <zone.builder@gmx.com>
  http://sourceforge.net/projects/jwl-library/
  Licenses: GNU GPL2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jwl-library/wiki/License/)
 */
/**
  @fileOverview  JWL.components.playerbar configuration
*/
/* jshint browser: true, curly: true, eqeqeq: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
  onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL */

(function(global, module) {
'use strict';
if (module && module.exports && typeof require === 'function') { require('jul'); }
var jul = new JUL.Instance({nsRoot: module && module.exports ? {JWL: module.exports} : global || null});
var JWL = jul.ns('JWL');

/* generated by JCS version 1.5.8 */

/**
  General purpose player bar
  @namespace  JWL.components.playerbar namespace
  @name  JWL.components.playerbar
*/
jul.ns('JWL.components.playerbar');

jul.apply(jul.get('JWL.components.playerbar'), /** @lends JWL.components.playerbar */ {
  /**
    Component UI
    @type  Object
  */
  ui: {
    tag: 'div', cid: '.playerbar', css: 'playerbar', children: [
      {tag: 'a', cid: '.playerbar-gotostart', css: 'fa fa-fast-backward', href: '#', title: 'Go to start'},
      {tag: 'a', cid: '.playerbar-stepbackward', css: 'fa fa-step-backward', href: '#', title: 'Step backward'},
      {tag: 'a', cid: '.playerbar-play', css: 'playerbar-play fa fa-play', href: '#', title: 'Play'},
      {tag: 'a', cid: '.playerbar-stepforward', css: 'fa fa-step-forward', href: '#', title: 'Step forward'},
      {tag: 'a', cid: '.playerbar-gotoend', css: 'fa fa-fast-forward', href: '#', title: 'Go to end'},
      {tag: 'a', cid: '.playerbar-stop', css: 'fa fa-stop', href: '#', title: 'Stop'}
    ]
  },
  /**
    Component logic
    @type  Object
  */
  logic: {
    '.playerbar': {
      listeners: {
        pause: function () {
          this.showPlay();
        },
        play: function () {
          this.showPlay(true);
        },
        stop: function () {
          this.showPlay();
        }
      }
    },
    '.playerbar-gotoend': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          JWL.trigger(this, 'gotoend');
          return false;
        }
      }
    },
    '.playerbar-gotostart': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          JWL.trigger(this, 'gotostart');
          return false;
        }
      }
    },
    '.playerbar-play': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          var sClass = this.getAttribute('class');
          if (sClass.indexOf('fa-play') > -1) {
            JWL.trigger(this, 'play');
          }
          else {
            JWL.trigger(this, 'pause');
        }
          return false;
        }
      }
    },
    '.playerbar-stepbackward': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          JWL.trigger(this, 'stepbackward');
          return false;
        }
      }
    },
    '.playerbar-stepforward': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          JWL.trigger(this, 'stepforward');
          return false;
        }
      }
    },
    '.playerbar-stop': {
      listeners: {
        click: function (oEvent) {
          oEvent = oEvent || event;  
          try { oEvent.preventDefault(); } catch(e) {}
          JWL.trigger(this, 'stop');
          return false;
        }
      }
    }
  },
  /**
    Component prototype members
    @type  Object
  */
  prototype: {
    /**
      Updates the display of the player bar controls
      @param  {Boolean}  [bPause]  Set it to true to show a paused playing
    */
    showPlay: function(bPause) {
      var oPlay = JWL.get(this).querySelector( '.playerbar-play');
      var sClass = oPlay.getAttribute('class');
      oPlay.setAttribute('class', sClass.replace(bPause ? 'fa-play' : 'fa-pause', bPause ? 'fa-pause' : 'fa-play'));
      oPlay.setAttribute('title', bPause ? 'Pause' : 'Play');
    }
  },
  /**
    Array of internal/external CSS for registering the custom element
    @type  Array|String
  */
  css: ['lib/faws/css/font-awesome.min.css?v=0.8.5',
   'lib/jwl/css/playerbar.css?v=0.8.5']
});

})(typeof global !== 'undefined' ? global : window, typeof module !== 'undefined' ? module : null);

/* end JWL.components.playerbar.js */
