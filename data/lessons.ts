export const lessons = {
  javascript: [
    {
      title: "Variables and Data Types",
      concept:
        "Variables are like containers that store data values. JavaScript has different types of data like numbers, text, and true/false values.",
      explanation:
        "Think of variables like labeled boxes in your room. You can put different things in them and change what's inside anytime. Just like how you might have a box labeled 'books' or 'clothes', variables have names and store different types of information.",
      funnyPhrase:
        "Variables are like your mom's kitchen containers - you never know what's inside until you open them!",
      codeExample: `// Creating variables (like labeling containers)
let name = "John";        // Text (string)
let age = 25;            // Number
let isStudent = true;    // True/False (boolean)

// Using variables
console.log("Hello, " + name);
console.log("You are " + age + " years old");`,
      keyPoints: [
        "Variables store data that can be used later",
        "Use 'let' to create variables that can change",
        "Use 'const' for values that never change",
        "JavaScript has different data types: strings, numbers, booleans",
      ],
      quiz: [
        {
          question:
            "What keyword is used to create a variable that can change?",
          options: ["var", "let", "const", "variable"],
          correctAnswer: 1,
        },
        {
          question: "Which data type represents true or false?",
          options: ["string", "number", "boolean", "text"],
          correctAnswer: 2,
        },
        {
          question: "What's the correct way to create a text variable?",
          options: [
            "let name = John",
            'let name = "John"',
            "let name = 123",
            'let "name" = John',
          ],
          correctAnswer: 1,
        },
        {
          question: "Variables are like:",
          options: [
            "Permanent markers",
            "Labeled containers",
            "Fixed numbers",
            "Unchangeable rules",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which is a number data type?",
          options: ['"25"', "true", "25", "'twenty-five'"],
          correctAnswer: 2,
        },
      ],
    },
    {
      title: "Functions - Your Code Helpers",
      concept:
        "Functions are reusable blocks of code that perform specific tasks. They're like mini-programs within your program.",
      explanation:
        "Functions are like recipes in a cookbook. Once you write a recipe (function), you can use it over and over again. You give it ingredients (parameters) and it gives you a dish (return value).",
      funnyPhrase:
        "Functions are like your best friend - always there when you need them, and they do exactly what you ask!",
      codeExample: `// Creating a function (writing a recipe)
function greetUser(name) {
    return "Hello, " + name + "! Welcome!";
}

// Using the function (following the recipe)
let message = greetUser("Sarah");
console.log(message); // "Hello, Sarah! Welcome!"

// Another example
function addNumbers(a, b) {
    return a + b;
}

let result = addNumbers(5, 3); // result is 8`,
      keyPoints: [
        "Functions help you avoid repeating code",
        "Use 'function' keyword to create functions",
        "Parameters are inputs to functions",
        "Return statement gives back a result",
        "Call functions by using their name with ()",
      ],
      quiz: [
        {
          question: "What keyword is used to create a function?",
          options: ["func", "function", "def", "create"],
          correctAnswer: 1,
        },
        {
          question: "What are function inputs called?",
          options: ["arguments", "parameters", "inputs", "both a and b"],
          correctAnswer: 3,
        },
        {
          question: "How do you call a function named 'sayHello'?",
          options: ["sayHello", "sayHello()", "call sayHello", "run sayHello"],
          correctAnswer: 1,
        },
        {
          question: "Functions are like:",
          options: ["Recipes", "Random events", "Broken code", "Errors"],
          correctAnswer: 0,
        },
        {
          question: "What does 'return' do in a function?",
          options: [
            "Stops the function",
            "Gives back a result",
            "Starts over",
            "Both a and b",
          ],
          correctAnswer: 3,
        },
      ],
    },
    {
      title: "Control Structures - Decision Making & Loops",
      concept:
        "Control structures let your program make decisions and repeat tasks, giving your code the power to behave differently based on conditions.",
      explanation:
        "Imagine you're the boss deciding what to do next: if it rains, take an umbrella; if sunny, wear sunglasses. Loops are like your robot helpers repeating chores without complaining.",
      funnyPhrase:
        "Control structures are like traffic lights for your code—stop, go, or keep looping until the road is clear!",
      codeExample: `// Decision making
const weather = "rainy";

if (weather === "rainy") {
  console.log("Take an umbrella");
} else {
  console.log("Wear sunglasses");
}

// Looping
for (let i = 1; i <= 5; i++) {
  console.log("Counting:", i);
}`,
      keyPoints: [
        "if-else helps you decide which code to run",
        "Use for and while loops to repeat actions",
        "Loops help avoid writing repetitive code",
        "Conditions must be true or false (boolean)",
      ],
      quiz: [
        {
          question: "Which keyword starts a loop?",
          options: ["if", "for", "else", "switch"],
          correctAnswer: 1,
        },
        {
          question: "What does if-else do?",
          options: [
            "Loops",
            "Decides which code runs",
            "Stores data",
            "Calls functions",
          ],
          correctAnswer: 1,
        },
        {
          question: "What kind of values do conditions use?",
          options: ["Numbers", "Strings", "Booleans", "Arrays"],
          correctAnswer: 2,
        },
        {
          question:
            "How many times does this loop run? \nfor(let i=0; i<3; i++) {}",
          options: ["2", "3", "4", "Infinite"],
          correctAnswer: 1,
        },
        {
          question: "Loops are useful for:",
          options: [
            "Repeating tasks",
            "Making decisions",
            "Storing variables",
            "Defining functions",
          ],
          correctAnswer: 0,
        },
      ],
    },
    {
      title: "Objects and Arrays - Organizing Data",
      concept:
        "Objects group related data into named properties; arrays store ordered collections of items. They help organize and access complex data easily.",
      explanation:
        "Think of an object as a labeled filing cabinet with drawers for different info. Arrays are like train cars holding items in order — perfect for lists!",
      funnyPhrase:
        "Objects and arrays are like your Swiss Army knives: handy for everything and always ready to organize your messy data drawer!",
      codeExample: `// Object example
const person = {
  name: "Alice",
  age: 28,
  isStudent: false,
};

// Array example
const colors = ["red", "green", "blue"];

console.log(person.name); // Alice
console.log(colors[0]); // red`,
      keyPoints: [
        "Objects store data as key-value pairs",
        "Arrays store ordered lists of items",
        "Access object properties with dot or bracket notation",
        "Access array elements by index starting at 0",
      ],
      quiz: [
        {
          question: "How do you access the first item in an array?",
          options: ["array[0]", "array[1]", "array.first", "array.get(0)"],
          correctAnswer: 0,
        },
        {
          question: "Objects store data as:",
          options: ["Values only", "Key-value pairs", "Lists", "Functions"],
          correctAnswer: 1,
        },
        {
          question: "What is the index of the first item in an array?",
          options: ["1", "0", "-1", "Depends on the array"],
          correctAnswer: 1,
        },
        {
          question: "How do you access a property 'name' in an object?",
          options: [
            "object.name",
            "object[name]",
            "object->name",
            "object:name",
          ],
          correctAnswer: 0,
        },
        {
          question: "Arrays store:",
          options: [
            "Ordered items",
            "Random items",
            "Key-value pairs",
            "Only numbers",
          ],
          correctAnswer: 0,
        },
      ],
    },
    {
      title: "ES6 Features - Modern JavaScript",
      concept:
        "ES6 introduced cleaner syntax and new features like arrow functions, let/const, template literals, and destructuring to make coding easier and more fun.",
      explanation:
        "ES6 is like upgrading your bicycle to a motorbike — everything runs faster and smoother, with cool new tricks to show off!",
      funnyPhrase:
        "ES6 is like JavaScript’s glow-up — cooler, faster, and way easier to hang out with!",
      codeExample: `// Arrow function
const add = (a, b) => a + b;

// let and const
let count = 0;
const maxCount = 10;

// Template literals
const name = "Bob";
console.log(\`Hello, \${name}!\`);

// Destructuring
const person = { age: 30, city: "Kathmandu" };
const { age, city } = person;`,
      keyPoints: [
        "Use let and const instead of var",
        "Arrow functions provide shorter syntax",
        "Template literals allow embedding variables easily",
        "Destructuring extracts data from objects or arrays",
      ],
      quiz: [
        {
          question: "How do you write an arrow function?",
          options: ["function () => {}", "() => {}", "func => {}", "() => []"],
          correctAnswer: 1,
        },
        {
          question: "What does template literal use?",
          options: [
            "'' (single quotes)",
            '"" (double quotes)',
            "`` (backticks)",
            "{} (braces)",
          ],
          correctAnswer: 2,
        },
        {
          question: "Which keywords replace 'var' in ES6?",
          options: [
            "let and const",
            "var only",
            "function and const",
            "var and let",
          ],
          correctAnswer: 0,
        },
        {
          question: "Destructuring is used to:",
          options: [
            "Extract data from arrays or objects",
            "Create new variables",
            "Call functions",
            "Loop over arrays",
          ],
          correctAnswer: 0,
        },
        {
          question: "Arrow functions have:",
          options: [
            "A shorter syntax",
            "No return value",
            "Require the function keyword",
            "Can't have parameters",
          ],
          correctAnswer: 0,
        },
      ],
    },
  ],
  react: [
    {
      title: "Components - Building Blocks",
      concept:
        "React components are like LEGO blocks. Each component is a piece of your website that you can reuse and combine to build bigger things.",
      explanation:
        "Imagine building with LEGO blocks. Each block has a specific purpose and you can combine them to create amazing structures. React components work the same way - each component is a reusable piece of your website.",
      funnyPhrase:
        "Components are like LEGO blocks - once you start building, you can't stop!",
      codeExample: `// Creating a component (making a LEGO block)
function WelcomeMessage() {
    return <h1>Welcome to our awesome website!</h1>;
}

// Using the component (placing the LEGO block)
function App() {
    return (
        <div>
            <WelcomeMessage />
            <WelcomeMessage />
        </div>
    );
}`,
      keyPoints: [
        "Components are reusable pieces of UI",
        "Start component names with capital letters",
        "Components return JSX (HTML-like code)",
        "You can use components multiple times",
        "Components make code organized and manageable",
      ],
      quiz: [
        {
          question: "What should component names start with?",
          options: [
            "lowercase letter",
            "number",
            "capital letter",
            "underscore",
          ],
          correctAnswer: 2,
        },
        {
          question: "Components are like:",
          options: ["LEGO blocks", "Broken toys", "Random code", "Errors"],
          correctAnswer: 0,
        },
        {
          question: "What do components return?",
          options: ["Numbers", "JSX", "Errors", "Nothing"],
          correctAnswer: 1,
        },
        {
          question: "Can you use a component multiple times?",
          options: [
            "No, never",
            "Yes, always",
            "Sometimes",
            "Only on weekends",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which is a correct component?",
          options: [
            "function hello()",
            "function Hello()",
            "Hello function()",
            "hello Function()",
          ],
          correctAnswer: 1,
        },
      ],
    },
  ],
};
