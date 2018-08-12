# 👋 Hello world!
Here I will leave some context about some of the horrible decisions I had to take and why:
1. Mutating DOM elements outside React 😱
```
const {selection} = this.state;
const selectedText = selection && selection.toString();

if (selectedText) {
  const tagElement = document.createElement(tag);
  const selectionElement = document.createTextNode(selectedText);

  tagElement.appendChild(selectionElement);
  selection.deleteContents();
  selection.insertNode(tagElement);
}

this.syncText();
```
A rich text editor is maybe one of the most common and complex examples using React, the easiest option is using a content editable div, because inputs ot textareas doesn't support custom styling.

We want a controlled input with styles, so the problem here is that we use two different data sources, one, the real html source that we store in our state, and the other one is what we show to the user.

The problem with this is that we have a caret position mismatch between both data sources as the html version of it has way more characters, so, if we want to update the value in a "React way" it would be really complex, also, as we are updating the div value on blur, we lose the caret position because React doesn't find a relation between the previous value and the new value.

2. Ugly styles
I didn't have much time and it was not a priority.

## Summing up
I'm not happy with the result because of the stated above, but i also know it's a complex case, i found that the most used abstractions for a rich text editor are not so good and not simple at all: draft.js and slate.js

## Sorry about this
I wasn't able to finish all the points in the challenge, like, you can add modifiers but you can't remove them (didn't have time for it and i didn't want to extend so much)

## Being sincere
It took me like 3 and a half hours to do this because i lost a lot of time until figuring out that i should sync the div content on blur instead of on change (my bad)

## Always get better
I would really like to know if there is a better option to do this that i didn't think of, so please share it with me!

## Demo
[Netlify hosted demo](https://agileengine-challenge.netlify.com)

## I don't like hosted demos
Well, this app was bootstrapped with cra so you can just clone it and `yarn && yarn start` it
