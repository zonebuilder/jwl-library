var oConfig = {
	copy: 'src/site/**',
	dest: 'build',
	concat: ['src/jwl/JWL.js', 'src/jwl/JWL.components.frameplayer.js', 
		'src/jwl/JWL.components.jsonoptions.js', 'src/jwl/JWL.components.playerbar.js', 'src/jwl/JWL.resources.js'],
	concatHeader: 'src/assets/header.js',
	concatName: 'jwl.js',
	concatDest: 'build/lib/jwl',
	minDest: 'build/js',
	jsdoc: 'node "../../node_modules/jsdoc2/app/run.js" -d="../../build/docs/api" -D="noGlobal:true" -D="title:JWL 0.7 API Reference" -D="index:files" -D="copyright:true" -t="../jsdoc-templates/codeview" -p .',
	jsdocFrom: 'src/jwl'
};
var fRun = require('child_process').exec;
var oGulp = require('gulp');
var oPlugins = require('gulp-load-plugins')();

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

oGulp.task('build', function() {
	oGulp.start(['site', 'scripts', 'jsdoc']);
});

oGulp.task('default', ['clean'], function() {
	oGulp.start(['site', 'scripts', 'jsdoc']);
});
