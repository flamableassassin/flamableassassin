const fetch = require('node-fetch');
const core = require('@actions/core');
const fs = require('fs');

const startComment = "<!--START_SECTION:randomWord-->",
  endComment = "<!--END_SECTION:randomWord-->",
  commentRegex = /<!--START_SECTION:randomWord-->[\s\S]*<!--END_SECTION:randomWord-->/g;

const oldReadMe = fs.readFileSync("./README.md").toString();

(async () => {
  let res = await fetch(`https://s.highlyflammable.tech/randomword/?secret=${core.getInput('WEBSITE_TOKEN')}`)
  res = await res.text();
  let newReadMe = oldReadMe.replace(commentRegex, `${startComment}\n- Random word: [${res}](https://www.wordnik.com/words/${res})\n${endComment}`);
  fs.writeFileSync('./README.md', newReadMe);
})();