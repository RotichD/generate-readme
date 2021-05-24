var inquirer = require('inquirer');
const fs = require('fs');
var questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "description",
        message: "Please enter a project description",
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install your app?"
    },
    {
      type: "input",
      name: "usage",
      message: "How do you use your app?"
    },
    {
      type: "checkbox",
      name: "license",
      message: "Please choose a license",
      choices: ['MIT', 'Apache License 2.0', 'ISC', 'GNU GPLv2']
    },
    {
      type: "input",
      name: "contributing",
      message: "Please enter guidelines for contributing"
    },
    {
      type: "input",
      name: "tests",
      message: "Please enter information on testing"
    },
    {
      type: "input",
      name: "github",
      message: "Please enter your GitHub username"
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email address"
    }
]

inquirer
  .prompt(questions)
  .then(answers => {
    console.log(answers)
    
    generateMarkDown(answers);
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

const generateMarkDown = data =>{
    var license = "";
    if (data.license = 'MIT') {
      license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (data.license = 'Apache License 2.0') {
      license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (data.license = 'ISC') {
      license = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    } else if (data.license = 'GNU GPLv2') {
      license = "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
    }

    var readmeString = `# ${data.title}\n` +
    `## Description:\n` +
    `${license}\n` +
    `${data.description}\n` +
    `## Table of Contents: \n` +
    `* [Installation](##Installation)\n` +
    `* [Usage](##Usage)\n` +
    `* [License](##License)\n` +
    `* [Contributing](##Contributing)\n` +
    `* [Tests](##Tests)\n` +
    `* [Questions](##Questions)\n` +
    `## Installation:\n` +
    `${data.installation}\n` +
    `## Usage:\n` +
    `${data.usage}\n` +
    `## License:\n` +
    `This project utilizes the ${data.license} license\n` +
    `## Contributing:\n` +
    `${data.contributing}\n` +
    `## Tests:\n` +
    `${data.tests}\n` +
    `## Questions:\n` +
    `My GitHub Profile: [https://github.com/${data.github}](https://github.com/${data.github})\n` +
    `For further questions contact me at ${data.email}`;
    
    createReadMe(readmeString);
}

const createReadMe = data =>{
    fs.writeFile('./generated/README.md', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}
