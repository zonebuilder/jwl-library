var oConfig = {
	copy: 'src/site/**',
	dest: 'build',
	concat: ['src/jwl/JWL.js', 'src/jwl/JWL.components.frameplayer.js', 
		'src/jwl/JWL.components.jsonoptions.js', 'src/jwl/JWL.components.playerbar.js', 'src/jwl/JWL.resources.js'],
	concatHeader: 'src/assets/header.js',
	concatName: 'jwl.js',
	concatDest: 'build/lib/jwl',
	minDest: 'build/js',
	jsdoc: 'node "../../node_modules/jsdoc2/app/run.js" -d="../../build/docs/api" -D="noGlobal:true" -D="title:JWL 0.8.3 API Reference" -D="index:files" -D="copyright:true" -t="../jsdoc-templates/codeview" -p .',
	jsdocFrom: 'src/jwl',
	copyNode: ['build/**', '!build/Readme', '!build/index.html','!build/test.html',  '!build/js/**', '!build/docs/index.html*', '!build/tests/**',
		 '!build/media/**', '!build/tests', '!build/js', '!build/License', '!build/media',
		 'README.md', 'LICENSE', 'src/node/**'],
	destNode: 'build_node'
};
var fRun = require('child_process').exec;
var oGulp = require('gulp');
var oPlugins = require('gulp-load-plugins')();
require('pump');

oGulp.task('site', function() {
	return oGulp.src(oConfig.copy)
	.pipe(oGulp.dest(oConfig.dest));
});

oGulp.task('scripts', function() {
	return oGulp.src(oConfig.concat)
	.pipe(oPlugins.jshint())
	.pipe(oPlugins.stripComments())
	.pipe(oPlugins.addSrc.prepend(oConfig.concatHeader))
	.pipe(oPlugins.concat(oConfig.concatName, {newLine: ''}))
	.pipe(oGulp.dest(oConfig.concatDest));
});

oGulp.task('jsdoc', function(fDone) {
	fRun(oConfig.jsdoc, {cwd: oConfig.jsdocFrom}, function() { fDone(); });
});

oGulp.task('clean', function() {
	return oGulp.src(oConfig.dest + '/*', {read: false})
	.pipe(oPlugins.clean());
});

oGulp.task('build', ['site', 'scripts', 'jsdoc']);

oGulp.task('clean_node', function() {
	return oGulp.src(oConfig.destNode + '/*', {read: false})
	.pipe(oPlugins.clean());
});

oGulp.task('build_node', ['build'], function() {
	return oGulp.src(oConfig.copyNode)
	.pipe(oGulp.dest(oConfig.destNode));
});

oGulp.task('default', ['clean', 'clean_node'], function() {
	oGulp.start('build_node');
});
