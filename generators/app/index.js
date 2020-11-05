'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red('bitops operations repository')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your environment (e.g. serviceA or production)?',
        default: 'my-app'
      },
      {
        type: 'confirm',
        name: 'terraform',
        message: 'Does your application need terraform?',
        default: true
      },
      {
        type: 'confirm',
        name: 'cloudformation',
        message: 'Does your application need cloudformation?',
        default: true
      },
      {
        type: 'confirm',
        name: 'ansible',
        message: 'Does your application need ansible?',
        default: true
      },
      {
        type: 'confirm',
        name: 'helm',
        message: 'Does your application need helm?',
        default: true
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var env = this.props.appName;

    if(this.props.terraform){
      this.fs.copyTpl(
        this.templatePath('terraform/**/*'),
        this.destinationPath(`${this.destinationRoot()}/${env}/terraform`)
      )
    }

    if(this.props.cloudformation){
      this.fs.copyTpl(
        this.templatePath('cloudformation/**/*'),
        this.destinationPath(`${this.destinationRoot()}/${env}/cloudformation`)
      )
    }

    if(this.props.ansible){
      this.fs.copyTpl(
        this.templatePath('ansible/**/*'),
        this.destinationPath(`${this.destinationRoot()}/${env}/ansible`)
      )
    }

    if(this.props.helm){
      this.fs.copyTpl(
        this.templatePath('helm/**/*'),
        this.destinationPath(`${this.destinationRoot()}/${env}/helm`)
      )
    }
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${this.destinationRoot()}/README.md`), {
        env: env
      }
    )
  }

};
