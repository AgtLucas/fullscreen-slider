'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

    //  Project configuration
    grunt.initConfig({

        //  Read the package.json
        pkg: grunt.file.readJSON('package.json'),

        //  Metadata

        meta: {
            srcPathSass: 'sass/',
            srcPathJS: 'js/',
            deployPathCSS: 'css/'
        },

        //  Task configuration
        sass: {
            dist: {
                files: {
                    '<%= meta.deployPathCSS %>style.css' : '<%= meta.srcPathSass %>style.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },

        livereload: {
            port: 35729
        },

        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },

        regarde: {
            watch: {
                files: ['<%= meta.srcPathSass %>*.scss', '<%= meta.srcPathJS %>*.js', '*.html'],
                tasks: ['sass', 'livereload'],
                events: true
            },
        }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};