const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

const fileName = args[0];
const ops = args.slice(1);

let isPropType = false;
let isLess = false;
let isSass = false;
let isRedux = false;
let isCss = false;

/**
 * check ops
 */
if (ops.indexOf("-redux") !== -1) {
  isRedux = true;
}
if (ops.indexOf("-less") !== -1) {
  isLess = true;
}
if (ops.indexOf("-css") !== -1) {
  isCss = true;
}
if (ops.indexOf("-sass") !== -1) {
  isSass = true;
}
if (ops.indexOf("-proptypes") !== -1) {
  isPropType = true;
}

const write = async (path, buffer) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, buffer, err => {
      if (err) {
        reject("写入失败");
      }
      resolve();
    });
  });
};

/**
 * comp create component
 *
 * primary arg: react...   ,this command just for react
 * second arg: comp     ,create [primary]'s component
 * third arg: name  ,create file in this name
 * other args: augment commands,
 * likes:
 *  -redux , this is will import redux's connect and connect your component
 *  -css , this is will create [comp].css , and import  this file in your [second arg]'s file
 *  -less , this is will create [comp].less ,  and import  this file in your [second arg]'s file
 *  -sass , this is will create [comp].sass ,  and import  this file in your [second arg]'s file
 *  -less , this is will create [comp].less ,  and import  this file in your [second arg]'s file
 *
 *  -proptypes ,this will import proptypes and create component with it
 *
 *feature
 * example
 * create react comp -r -p
 */

/**
 * declear Template
 */
const BASE_TITLE = `import react, { Component } from "react";\n`;

const BASE_CONTENT = `class ${fileName} extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return <div>${fileName}</div>;
  }
}\n\n`;
const BASE_FOOTER = `export default ${fileName};\n`;
// proptypes template
const IMPORT_PROPTYPES = `import PropTypes from "prop-types";\n"`;
const IMPORT_REDUX = `import { connect } from "react-redux";\n`;
const CONNECT_REDUX = `@connect(state => ({}))\n`;
const FOOTER_PROPTYPES = `\n${fileName}.propTypes = {
    fileName.someKey = PropTypes.number;
}`;

// style template
const IMPORT_CSS = `import "./${fileName}.css";\n\n`;
const IMPORT_LESS = `import "./${fileName}.less";\n\n`;
const IMPORT_SASS = `import "./${fileName}.sass";\n\n`;

/**
 * compose template
 */
const finallyTemplate = _ => {
  let temp = "";

  // header
  temp += BASE_TITLE;
  if (isPropType) {
    temp += IMPORT_PROPTYPES;
  }
  if (isRedux) {
    temp += IMPORT_REDUX;
  }
  // style
  if (isCss) {
    temp += IMPORT_CSS;
  }
  if (isLess) {
    temp += IMPORT_LESS;
  }
  if (isSass) {
    temp += IMPORT_SASS;
  }

  // content
  if (isRedux) {
    temp += CONNECT_REDUX;
  }
  temp += BASE_CONTENT;

  // footer
  if (isPropType) {
    temp += FOOTER_PROPTYPES;
  }
  temp += BASE_FOOTER;
  return temp;
};

const fileJsName = path.join(process.cwd(), `${fileName}.js`);

write(fileJsName, finallyTemplate());
