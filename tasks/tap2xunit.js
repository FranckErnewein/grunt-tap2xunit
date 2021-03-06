/*
 * grunt-tap2xunit
 * https://github.com/FranckErnewein/grunt-tap2xunit
 *
 * Copyright (c) 2014 Franck Ernewein
 * Licensed under the MIT license.
 */

'use strict';

function TapLine( str ){
  this.string = str;
}

TapLine.prototype = {
  getLabel: function( line ){
    var label =  this.string.split( ' - ' )[1];
    var escaped = label.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
    return escaped;
  },
  getInteger: function(){
    return this.string.replace( /^\D+/g, '');
  },
  isComment: function(){
    return this.string.charAt(0) === '#';
  },
  hasContent: function( indexStart, indexEnd, content ){
    return this.string.slice( indexStart, indexEnd ) === content;
  }
};

/*
  function tap2xml(){
      var tapString = grunt.file.read( TESTEM_RESULT_FILE, { encoding: 'utf8' });
      var lines = tapString.split('\n');


      var xml = '',
          now = new Date().toISOString(),
          tests = [],
          nbTest,
          nbTestPassed,
          nbTestFailed;
      

      for( var i=0; i<lines.length; i++ ){ 
          var line = new TapLine( lines[i] );
          if( line.isComment() ){
              if( line.hasContent( 2, 7, 'tests' ) ){
                nbTest = line.getInteger();
              }else if( line.hasContent( 2, 6, 'fail' ) ){
                nbTestFailed = line.getInteger();
              }
          }else if( line.hasContent( 0, 2, 'ok' ) ){
            tests.push('<testcase name="'+line.getLabel()+'"></testcase>');
          }else if( line.hasContent( 0, 6, 'not ok' ) ){
            tests.push('<testcase name="'+line.getLabel()+'"><failure>Test fail</failure></testcase>');
          }
      }

      xml += '<testsuites>';
      xml += '<testsuite name="Javascript unit test with Testem" tests="'+nbTest+'" failures="'+nbTestFailed+'" errors="0" timestamp="'+ now +'">';
      xml += tests.join('');
      xml += '</testsuite>';
      xml += '</testsuites>';

      grunt.file.write('build/logs/' + TESTEM_RESULT_FILE.replace('.tap','.xml'), xml );
      //delete temp file
      grunt.file.delete( TESTEM_RESULT_FILE );
       
  }
  */

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tap2xunit', 'Convert tap file into xml file', function() {

    // Iterate over all specified file groups.
    this.files.forEach( function( src, dest ) {
      grunt.log.writeln('File "' + dest + '" created.');
    });
  });

};
