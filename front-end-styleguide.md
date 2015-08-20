# Front-End Coding Standards

## HTML

* All tags, attributes, and attribute values must be lowercase.
* All attribute values must be inside double quotation marks.
* All tags must be closed. Tags that do not contain data such as image and line break tags do not need to have a closing tag.
* All IDs and Classes are lower camel case.
* A tag's ID should be the first attribute followed by a class if one exists.
* Use Unix-style line endings (LF).
* Always use title-case for headers and titles. Use CSS to transform the text to uppercase.

## CSS

### General

* Multiple selectors should be included on the same line.
* Use comments to block out large section such as Icons, Links, Forms, etc.
* All IDs and Classes are lower camel case.
* Each property and it's value should be separated by a space, i.e. `margin-top: 10px;`
* Use Unix-style line endings (LF).
* Don't use a tag along with an ID or class selector unless its necessary for readability or for specificity. This goes against making css rules as general as possible. Example: `div#myId` or `span.genericClass`
* Use shorthand for rules.
* Colors should be hex values using shorthand when possible unless you are declaring a transparent background. In that case use rgba()
* Nothing is ever that !important. Yes I know there can be exceptions to this rule but it's rare. Let's try first to not use !important and save it for [nuke it from orbit just to be sure](https://www.youtube.com/watch?v=aCbfMkh940Q) scenarios.

### SASS

* Rule blocks should begin with any extends followed by include mixins and then the general declarations for that rule.

```scss
.myRule {
 @extend %myDefaultClass;
 @include button(#fff);
 background-color: #000;
}
```

* Do not extend a normal class. You should only extend a [placeholder class](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholders)
* When nesting rules, which you should be doing very little of, be sure to include an extra line after the last declaration and the first nested selector.

```scss
#hello {
 color: #f00;
 width: 50%;
 
 &.world {
  border-top: 1px solid #000;
 }
}
```

## Javascript

### General Formating
* Indenting should be four spaces (1 soft tab)
* jQuery objects should begin with a $_ to identify it as a jQuery object.
* There should be no space between the name of a function and the left parenthesis of its parameter list.

```javascript
function helloWorld() {}
```

* There should be one space between the right parenthesis and the left curly brace that begins the statement body for anonymous functions.
* The right curly brace is aligned with the line containing the beginning of the declaration of the function.

```javascript
// example of formatting a function and inner functions
function outer(c, d) {
    var e = c * d;
    function inner(a, b) {
        return (e * a) + b;
    }
    return inner(0, 1);
}
```

* A keyword followed by left parenthesis should be separated by a space.
* Each semicolon in the control part of a for statement should be followed with a space.

```javascript
for (i=0; i<z; i+=1)
```

* Whitespace should follow every comma.
* Strings should be wrapped in single quotes.
* Chaining methods should be on new lines and indented with one 1 soft tab. The last method should be followed by a semicolon.

```javascript
$_element
    .removeClass("oldClass")
    .addClass("newClass")
    .bind("click",function() {
        // function code
    });
```

* Separate logical parts of code with blank lines.
* A do statement always end with a semicolon.
* 
### Formatting Compound Statements

* If statements should be formatted as follows:

```javascript
if (condition) {
    statements
} else if (condition) {
    statements
} else {
    statements
}
```

* Switch statements - each group of statements (except the default) should end with break, return, or throw and should be formatted as:

```javascript
switch (expression) {
    case expression:
        statements;
        break;
    default:
        statements;
}
```

* Try statements should be formatted as follows:

```javascript
try {
   statements
} catch (variable) {
   statements
}
```

### Naming

* Function and variable names should be lower camel case.
* Variable names should be nouns.
* Function names should be verbs.
* Do not use _ (underscore) to indicate privacy.
* Classes should start with a capital letter.
* Each simple statement and assignment must end with a semicolon.

### Comments

* Comments should follow the [jsdoc format](http://usejsdoc.org/)
