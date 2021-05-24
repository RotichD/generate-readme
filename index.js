var inquirer = require('inquirer');
const fs = require('fs');
var questions = [
    {
        type: "input",
        name: "firstName",
        message: "What is your first name?",
    },
    {
        type: "number",
        name: "birthYear",
        message: "What year were you born?",
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
    var readmeString = `# First Name: ${data.firstName}\n` +
    `# Birth Year: ${data.birthYear}`;
    
    createReadMe(readmeString);
}

const createReadMe = data =>{
    fs.writeFile('README.md', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}
