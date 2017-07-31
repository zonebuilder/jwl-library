/*
	JWL - The JavaScript Widget Library version 0.8.3
	Copyright (c) 2016 - 2017 The Zonebuilder <zone.builder@gmx.com>
	http://sourceforge.net/projects/jwl-library/
	Licenses: GNU GPL2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jwl-library/wiki/License/)
 */
/**
	@fileOverview	JWL.components.frameplayer configuration
*/
/* jshint browser: true, curly: true, eqeqeq: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL */

(function(global, module) {
'use strict';
var jul = new JUL.Instance({nsRoot: module && module.exports ? {JWL: module.exports} : global || null});
var JWL = jul.ns('JWL');

/* generated by JCS version 1.3.5 */

/**
	A player that displays a sequence of pictures
	@namespace	JWL.components.frameplayer namespace
	@name	JWL.components.frameplayer
*/
jul.ns('JWL.components.frameplayer');

jul.apply(jul.get('JWL.components.frameplayer'), /** @lends JWL.components.frameplayer */ {
	/**
		Component UI
		@type	Object
	*/
	ui: {
		tag: 'div', cid: '.frameplayer', css: 'frameplayer', children: [
			{tag: 'div', children: [
				{tag: 'img', cid: '.frameplayer-image', css: 'frameplayer-image', height: '135', src: 'frame.jpg', width: '240'}
			]},
			{tag: 'div', css: 'left', title: 'JWL Frameplayer', children: [
				{xclass: 'svg', tag: 'svg', height: '32', include: 'JWL.resources.svglogo.ui', width: '32', parserConfig: {
					defaultClass: 'svg'
				}}
			]},
			{tag: 'span', css: 'center', children: [
				{tag: 'playerbar', cid: '.frameplayer-playerbar'}
			]},
			{tag: 'div', css: 'right', children: [
				{tag: 'jsonoptions', cid: '.frameplayer-jsonoptions'}
			]},
			{tag: 'div', css: 'clear'}
		]
	},
	/**
		Component logic
		@type	Object
	*/
	logic: {
		'.frameplayer': {
			listeners: {
				gotoend: function () {
					this.gotoEnd();
				},
				gotostart: function () {
					this.gotoStart();
				},
				optionschanged: function () {
					this.stop();
				},
				pause: function () {
					this.pause();
				},
				play: function () {
					this.play();
				},
				stepbackward: function () {
					this.stepBackward();
				},
				stepforward: function () {
					this.stepForward();
				},
				stop: function () {
					this.stop();
				}
			}
		}
	},
	/**
		Component pre-creation callback
		@param	{Object}	oConfig	Runtime configuration
		@param	{Object}	oParser	Current parser
	*/
	preCreate: function(oConfig, oParser) {
		var oMap = {
			'data-image-width': '.frameplayer-image.width',
			'data-image-height': '.frameplayer-image.height',
			'data-image-src': '.frameplayer-image.src',
			'data-options': '.frameplayer-jsonoptions.data-options'
		};
		var sItem;
		// gather options for custom HTML elements
		var oHost = this ? this.host || this : null;
		if (oHost && oHost._componentName) {
			for (sItem in oMap) {
				if (oMap.hasOwnProperty(sItem)) { oConfig[sItem] = oHost.getAttribute(sItem); }
			}
		}
		// pass the appropriate options to descendants
		for (sItem in oMap) {
			if (oMap.hasOwnProperty(sItem) && oConfig[sItem]) {
				oConfig[oMap[sItem]] = oConfig[sItem];
			}
		}
	},
	/**
		Component prototype members
		@type	Object
	*/
	prototype: {
		/**
			Timer instance
			@type	Object
		*/
		cron: null, /**
			Current frame
			@type	Number
		*/
		current: -1,
		 /**
			Goes to the last frame
		*/
		gotoEnd: function() {
			this.current = 1e9;
			this.play();
			this.pause();
			this.showStop();
		},
		/**
			Goes to the first frame
		*/
		gotoStart: function() {
			this.current = -1;
			this.play();
			this.pause();
			this.showStop();
		},
		/**
			Pauses the playback
		*/
		pause: function() {
			if (this.cron) { clearTimeout(this.cron); }
			this.cron = null;
		},
		/**
			Plays the sequence starting from the current frame
		*/
		play: function() {
			var oOpts = JWL.get(this).querySelector('.jwl-jsonoptions').getAttribute('data-options') || '';
			try { oOpts = JSON.parse(oOpts); } catch (e) {}
			oOpts = JUL.apply({
				template: 'frame.jpg',
				range: [0, 0],
				interval: 1000
			}, oOpts || {});
			if (this.current < oOpts.range[0]) { this.current = oOpts.range[0]; }
			if (this.current > oOpts.range[1]) { this.current = oOpts.range[1]; }
			var nVal = oOpts.zeropad ? (parseFloat('1e' + oOpts.range[1].toString().length) + this.current).toString().substr(1) : this.current;
			JWL.get(this).querySelector('.frameplayer-image' ).setAttribute('src', oOpts.template.replace('{n}', nVal));
			this.current++;
			var oThis = this;
			if (this.cron) { clearTimeout(this.cron); }
			this.cron = setTimeout(this.current > oOpts.range[1] ? 
				function() { oThis.stop(); } : function() { oThis.play(); }, oOpts.interval);
		},
		/**
			Syncs the display of the player with the stop state
		*/
		showStop: function() {
			JWL.get(this).querySelector('.jwl-playerbar').showPlay();
		},
		/**
			Displays the previous frame
		*/
		stepBackward: function() {
			this.current -= 2;
			this.play();
			this.pause();
			this.showStop();
		},
		/**
			Displays the next frame
		*/
		stepForward: function() {
			this.play();
			this.pause();
			this.showStop();
		},
		/**
			Stops the playback
		*/
		stop: function() {
			this.pause();
			this.current = -1;
			this.showStop();
			JWL.get(this).querySelector('.frameplayer-image').setAttribute('src', this.getAttribute('data-image-src'));
		}
	},
	/**
		Array of internal/external CSS for registering the custom element
		@type	Array|String
	*/
	css: 'lib/jwl/css/frameplayer.css?v=0.8.3'
});

})(typeof global !== 'undefined' ? global : window, typeof module !== 'undefined' ? module : null);

/* end JWL.components.frameplayer.js */
