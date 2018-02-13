/**
 * @preserve Created by NEX22DX on 10-04-2016.
 */

const liveReloadPort = 35730;
module.exports = function (grunt) {
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.task.run(['build','serve']); //open
        grunt.log.write('Please Wait while we are Building And Serving Application ...');
    });

    grunt.registerTask('ReminderTask', 'Log some stuff.', function() {
        grunt.log.write('Yoh have modified Js/HTML/CSS Files. Please run "grunt build" before you push your code to repository'['red'].bold);
    });

    grunt.registerTask('serve',"Do my custom Task",function () {
        grunt.task.run(['jade','express','open',"watch"]);
    });

     grunt.registerTask('build',"Building Project!!",function () {
        grunt.task.run(['copy:indexCopyTemp','jade','useminPrepare','concat:generated','babel','uglify:generated','cssmin:generated','usemin','copy:main','copy:indexCopyApp','copy:copyFonts']); //open
    });

    //grunt.registerTask('build',"Building Project!!",function () {
    //    grunt.task.run(['concurrent:targetBuild']); //open
    //});
    grunt.registerTask('useminTasks',"Minifying Files !!",function () {
        grunt.task.run(['copy:indexCopyTemp','useminPrepare','concat:generated','uglify:generated','cssmin:generated','usemin','copy:indexCopyApp']); //open
    });
    grunt.registerTask('copyTasks',"Copying Files to Dist !!",function () {
        grunt.task.run(['copy:main','copy:copyFonts']); //open
    });
    grunt.registerTask('jadeTask',"Creating HTML Files from Jade Files !!",function () {
        grunt.task.run(['jade']); //open
    });
    grunt.registerTask('doBabel',"Creating babel Files from es6 Files !!",function () {
        grunt.task.run(['babel']); //open
    });
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-babel');


  grunt.initConfig({
      pkg:grunt.file.readJSON('package.json'),
      express:{
          options:{
              port: grunt.option('port')|| 5050,
              hostname:'0.0.0.0',
              bases:['.']
          },
          all:{
              options:{
                  script: 'server/server.js'
              }

          }

      },
      jade:{
          compile:{
              options:{
                  pretty:true
              },
              files:[{
                  cwd:"app/jade",
                  src:"*.jade",
                  dest:"app/views",
                  ext:".html",
                  expand:true
              }]
          }
      },
      useminPrepare: {
         html: 'app/index.html',
         options: {
           dest: 'dist/',
           flow: {
           html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: 'app/index.html',
      options: {
        assetsDirs: ['app', 'app/assets','app/fonts'],
            blockReplacements: {
                css: function (block) {
                    return '<link rel="stylesheet" href="' + block.dest + "?v=" + new Date().getTime() + '"/>';
                },
                js: function (block) {
                    return '<script src="' + block.dest +"?v=" + new Date().getTime() + '"></script>';
                }
            }
      }
    },
      open: {
        server: {
          url: 'http://localhost:<%= express.options.port %>'
      }
    },
      copy: {
          //separator: ': '
         // punctuation: ' !!!'
       main : {
           files: [{
               expand: true,
               cwd : 'app',
               src: ['**','!**/bower_components/**','!**/jade/**','!**/css/app.css','!**/controllers/**','!**/services/**','!**/app.js**'],
               dest: 'dist/'
           }]
       },
       indexCopyTemp : {
           files: [{
               expand: true,
               cwd : 'app',
               src: ['index.html'],
               dest: 'temp/'
           }]
       },
       indexCopyApp : {
           files: [{
               expand: true,
               cwd : 'temp',
               src: ['index.html'],
               dest: 'app/'
           }]
       },
       copyFonts : {
           files: [{
               expand: true,
               cwd : 'app',
               src: ['**/fonts/**'],
               dest: 'dist/fonts/',
               filter :"isFile",
               flatten:true
           }]
       }
      },
      concurrent: {
        //target: ['build'],
        targetBuild: ['useminTasks','jadeTask','copyTasks']
      },
       gruntfile: {
        files: ['Gruntfile.js']
      },
      watch:{
          options:{
             // livereload:true
          },
          grunt:{
              files:["Gruntfile.js"],
              tasks:['serve'],
              options:{
                  spawn:false
              }
          },
          scripts:{
              files:["app/**/*.js"],
              tasks:['ReminderTask'],
              options:{
                  livereload : liveReloadPort
              }

          },
          html:{
              files:["app/**/*.html"],
              tasks:['copy:main','ReminderTask'],
              options:{
                  livereload : liveReloadPort
              }
          },
          styles:{
              files:["app/css/**/*.css"],
              tasks:['ReminderTask'],
              options:{
                  livereload : liveReloadPort,
                  spawn:true
              }

          },
          jade:{
              files:["app/jade/*.jade"],
              tasks:['jade']
          },
          express:{
             files:["server/**/*.js"],
               tasks:["express:all"],
                options:{
                  spawn:false
              }
          }

      },
      uglify:{
          options : {
              preserveComments : false,
              banner: '/*\n For <%= pkg.name %> By <%= pkg.author %> @ <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> \n*/\n',
              compress :{
                  drop_console:true
              }
          },
          target:{
              files:{
                 // "dest/output.min.js":"app/controllers/*.js"
              }
          }
      },
      babel: {
          options: {
              sourceMap: true,
              presets: ['babel-preset-es2015']
          },
          dist: {
              files: {
                  ".tmp/concat/scripts.min.js": ".tmp/concat/scripts.min.js"
              }
              // files: {
              //     expand: false,
              //     cwd: '.tmp/concat',
              //     //ext: '',
              //     src: ['scripts.min.js'],
              //     dest: '.tmp/concat'
              // }
          }
      }
    });
};