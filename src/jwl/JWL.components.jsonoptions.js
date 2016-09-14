/*
	JWL - The JavaScript Widget Library version 0.7
	Copyright (c) 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jwl-library/
	Licenses: GNU GPL2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jwl-library/wiki/License/)
 */
/**
	@fileOverview	JWL.components.jsonoptions configuration
*/
/* jshint browser: true, curly: true, eqeqeq: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, JWL */

(function() {
'use strict';

/* generated by JCS version 1.2 */

/**
	Options object stored as JSON
	@namespace	JWL.components.jsonoptions namespace
	@name	JWL.components.jsonoptions
*/
JUL.ns('JWL.components.jsonoptions');

JUL.apply(JWL.components.jsonoptions, /** @lends JWL.components.jsonoptions */ {
	keepBindings: true,
	listenersProperty: 'listeners',
	noLogic: false,
	ns: 'JWL.components.jsonoptions',
	suggestedFramework: 'html',
	title: 'JWL Components - Options object stored as JSON',
	version: '1.1470029657345',
	init: function () {
		JWL.parser._keepInstance = true;
		JWL.parser.create(this.ui, this.logic, document.body);
	},
	parserConfig: {
		customFactory: 'JUL.UI.createDom', defaultClass: 'html', topDown: true, useTags: true
	},
	/**
		Component UI
		@type	Object
	*/
	ui: {
		tag: 'div', cid: '.jsonoptions', css: 'jsonoptions', children: [
			{tag: 'a', cid: '.jsonoptions-show', css: 'fa fa-gear', href: '#', title: 'Options'},
			{tag: 'div', css: 'jsonoptions-opts-wrap', children: [
				{tag: 'div', css: 'jsonoptions-opts', children: [
					{tag: 'textarea', cid: '.jsonoptions-edit', cols: '30', rows: '10', wrap: 'off'},
					{tag: 'div', css: 'jsonoptions-buttons', children: [
						{tag: 'button', cid: '.jsonoptions-ok', html: 'OK'},
						{tag: 'button', cid: '.jsonoptions-cancel', html: 'Cancel'}
					]}
				]}
			]}
		]
	},
	/**
		Component logic
		@type	Object
	*/
	logic: {
		'.jsonoptions': {
			'data-options': ''
		},
		'.jsonoptions-cancel': {
			listeners: {
				click: function () {
					var oOpts = this.parentNode.parentNode;
					var sClass = oOpts.getAttribute('class');
					oOpts.setAttribute('class', sClass.replace('shown', ''));
				}
			}
		},
		'.jsonoptions-ok': {
			listeners: {
				click: function () {
					var oOpts = this.parentNode.parentNode;
					var sJson = JUL.trim(oOpts.firstChild.value);
					if (sJson) {
						try { sJson = JSON.stringify(JSON.parse(sJson)); }
						catch (e) { window.alert('Text must be valid JSON.\n' + (e.description || e.message)); return; }
					}
				oOpts.parentNode.parentNode.setAttribute('data-options', sJson);
					var sClass = oOpts.getAttribute('class');
					oOpts.setAttribute('class', sClass.replace('shown', ''));
					JWL.trigger(oOpts.parentNode.parentNode, 'optionschanged');
				}
			}
		},
		'.jsonoptions-show': {
			listeners: {
				click: function (oEvent) {
					oEvent = oEvent || event;	
					try { oEvent.preventDefault(); } catch(e) {}
					var oOpts = this.nextSibling.firstChild;
				
					var sClass = oOpts.getAttribute('class');
					if (sClass.indexOf('shown') > -1) {
						oOpts.setAttribute('class', sClass.replace('shown', ''));
				}
					else {
						var sJson = this.parentNode.getAttribute('data-options') || '';
						try { sJson = JUL.UI.obj2str(JSON.parse(sJson), true); } catch (e) {}
						oOpts.firstChild.value = sJson;
						oOpts.setAttribute('class', sClass + ' shown');
					}
					return false;
				}
			}
		}
	}
});

})();

/* end JUL.components.jsonoptions.js */
