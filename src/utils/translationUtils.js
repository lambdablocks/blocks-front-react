const translations = {
  en: {
    addUnitTest: 'Add unit test',
    constants: 'Constants',
    delete: 'Delete',
    deleteUnitTest: 'Delete unit test',
    empty: 'None',
    functions: 'Functions',
    tutorial: 'Tutorial',
    library: 'Library',
    loading: 'Loading...',
    next: 'Next',
    noValue: '<NONE>',
    primitives: 'Primitives',
    type: 'Type: ',
    value: 'Value: ',
    workspace: 'Workspace',
    'joyrideSteps.window': 'The window has 3 sections.',
    'joyrideSteps.library':
      '<b>1. Library</b>\
      <p>The library has 2 components: <ul><li>Constants</li><li>Functions</li><p>',
    'joyrideSteps.constants':
      '<p>Clicking on "Number" will add a ballon to the workspace.</p>\
      <p>This ballon can hold a number.</p>',
    'joyrideSteps.functions': 'Clicking on a math operation will add a brick to the workspace.',
    'joyrideSteps.workspace':
      '<b>2. Workspace</b>\
      <p>The workspace is the playground where you can connect ballons and bricks.</p>\
      <p>Clicking on an element will show a dialog where you can change its properties.</p>\
      <p>Move the elements by drag & drop.</p>\
      <p>The elements are connected through pipes. To create a pipe click on an\
      input and an output slot.',
    'joyrideSteps.tutorial':
      '<b>3. Tutorial</b>\
      <p>The instructions for following the tutorial</p>',
    'tutorialSteps.1':
"<p>This is a small tutorial for learning the basics of programming.</p>\
<p>All programs are composed of two primary components.\
 It doesn't matter if it's a smartphone app, a web site, a game, or anything else.\
 The two components are: constants and functions.</p>\
<p>You have already used this components in your math lessons of elementary school.</p>\
<ul><li>The numbers are constants.</li>\
<li>And the math operators are functions.</li></ul>\
<p>In general functions process one or more inputs to give a result.\
 For example in the sum <b>3 + 4</b>, the function + has two inputs: the numbers\
 3 and 4. And it gives the result of 7.</p>\
<p>In the workspace you can do this kind of operations by connecting the constants\
 as inputs to the functions.</p>\
<p>Try doing a couple of operations now\
 (<a href='https://youtu.be/z4KVHi_zK60' target='_blank'>Here is a video showing\
 how to do it if you have any doubts</a>).</p>\
<p>When you finish doing some operations click the button <b>Next</b> to continue.</p>",
    'tutorialSteps.2':
"<p>We can manipulate not only numbers, we can also manipulate letters.\
 Letters are usually referred as <span class='code'>String</span> in programming.\
 And as well as the math operations, there are functions to transform them.</p>\
<p>Try to guess what the functions in the right do. Then do some operations\
 on the workspace to see if the results of the functions are what you expected.</p>\
<p>Some things you can try:</p>\
<ul><li><span class='code'>concat</span> a <span class='code'>String</span>\
 with your first name and a <span class='code'>String</span> with your last name.</li>\
<li><span class='code'>reverse</span> your name.</li>\
<li>Get the <span class='code'>length</span> of your name.</li>\
</ul>\
<p>When you finish click the button <b>Next</b> to continue.</p>",
    'tutorialSteps.3':
"<p>We have seen two types of constants so far: Numbers & Letters (Strings).\
 Most programs are composed by more than one type of data. And we can mix them\
 according to what we want to achieve. We can even convert from one to the\
 other in case we need it.</p>\
<p>Have you noticed that constants have different colors depending on their type?\
 Numbers are yellow and strings are orange.</p>\
<p>The functions have definitions that tell us which type of data they need as input.\
 Hover on the functions of the library and you will see this information.</p>\
<p>As usual try doing a couple of operations now. See what happens when you connect\
 an input of the wrong type to a function.</p>\
<p>Try using the functions <span class='code'>toNumber</span> and\
 <span class='code'>toString</span> to convert a constant\
 from one type to another.</p>\
<p>When you finish click the button <b>Next</b> to continue.</p>",
    'tutorialSteps.4':
"<p>What we have done so far don't seem really useful. But one thing we haven't\
 done, is using the output of a function as input for another function.</p>\
<p>All programs are composed by series of transformations with a specific order.\
 For example, to calculate the average of 2 numbers, first we need to sum the\
 numbers and then divide the result by 2.</p>\
<p>Try using the output of functions as input to other ones. Some ideas of\
 things you can try:</p>\
<ul><li>Calculate the average of 2 numbers.</li>\
<li>Concat 3 strings.</li>\
<li>Can you figure out which functions you need to connect to calculate the\
 number of digits in a number?</li></ul>\
<p>We are near the end of the tutorial there is just one more step.</p>\
<p>When you finish doing some of the exercises click the button <b>Next</b>.</p>",
    'tutorialSteps.5':
'<p>Imagine we have a program that needs to calculate a lot of averages.\
 It will be really boring to do all the connections every time.\
 Luckily there is a way to avoid this. We can create our own functions!</p>\
<p>The functions that we create are exactly the same as the functions we have used\
 in the previous steps. Our functions will have inputs and outputs.\
 We can receive data in the inputs, and we return a result as output.</p>\
<p>There are two separate steps in creating a function:</p>\
<ol><li>First we need to add other functions & constants inside the function\
 we are creating, and connect them with pipes. This is known in programming as\
 <b>defining the function</b>.</li>\
<li>After we have defined the function, someone else (or ourselves) can use it\
 by giving values to every input. This is known in programming as <b>calling\
 the function</b>.</li></ol>\
<p>Try to create your own function now. You can create a function that calculates\
 the average of 2 numbers that we saw in the previous step, or any other function\
 you want. You can call your function by giving values to the constants that are\
 outside of it.</p>\
<p>This is the end of this really short tutorial on the basics of programming.\
 Hope you find it useful as a first step in your path to learn to program.</p>'
  }
}

export const getMessage = (locale, key) => {
  return translations[locale][key]
}
