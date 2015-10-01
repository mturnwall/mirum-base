# Mirum Sass Style Guide (DRAFT)

## Table of Contents

* [Compiler]()
* [SCSS or Sass]()
* [Syntax and Formatting]()
    * [Rulesets]()
    * [Nesting]()
    * [Colors]()
    * [Sorting]()
    * [!important]()
* [Naming]()
    * [BEM]()
    * [Namespace]()
* [Structure]()
* [Variables]()
* [Mixins]()
* [Commenting]()

The purpose of this document is to establish a set of guidelines for writing Sass on Mirum projects. The main goal is to establish consistency across all Mirum projects. This is not a CSS style guide and only deals with Sass specific ideas and content.

The document is not intended to be a training manual for using Sass. You won't find instructions on how to write Sass. What you will find are rules on how your Sass should be formatted and best practices.

## Compiler

The Sass compiler comes in many flavors with the most popular two being Ruby and C++. Sass started as a Ruby gem and many Mirum projects use this version. The C++ port is called Libsass and is the version that current and all future projects use. Libsass has become the compiler of choice due to its speed.

Libsass currently does not have all the same features as RubySass. You can see what is missing using the [Sass Compatibility](http://sass-compatibility.github.io/) site. Even though Libsass is missing some features it has the majority of the major features of RubySass. That combined with its increased compiling speed is why it has become the compiler of choice for Mirum. RubySass has also announced that they will hold off implementing new features until Libsass has reached feature parity with RubySass.


## SCSS or Sass

Sass can be written in two different formats:

* Sass - uses an indented syntax
* SCSS - uses a more CSS like syntax

Here are examples of the two different syntaxes.

```sass
// Sass
.my-element
    color= !primary-color
    width= 100%
    overflow= hidden

.my-other-element
    +border-radius(5px)

// SCSS
.my-element {
    color: $primary-color;
    width: 100%;
    overflow: hidden;
}

.my-other-element {
    @include border-radius(5px);
}
```

Mirum uses SCSS because it more closely resembles how CSS is written. This makes it easier for new developers to pick it up. When you see Sass mentioned with are talking about the Sass pre-processor itself, not the indented syntax.

## Syntax and Formatting

Like mentioned earlier this document is to help to enforce consistency across Mirum projects. The following rules and best practices will help ensure that all developers code to the same standard. This will lead to code that is easier to read and maintain.

* Lines are indented using soft tabs using 4 spaces
* Multi-line CSS
* Use Unix-style line endings (LF)

### Rulesets

A ruleset in Sass is the same as CSS. It's consists of the selector and the declaration block which is made of the individual declarations (property: value);

* The opening brace `{` should be on the same line as the selector and preceded by a single space
* Any @extends should be listed first
* @include should come after @extends
* All CSS delcarations should follow any @include rules
* Each CSS declaration should be on a newline
* CSS properties should have a space after the colon.
* Each CSS declaration pair should end with a semicolon
* The closing bracke '}' should be on it's own line

```sass
// bad
.my-class {
    color: red; font-weight: bold;
    text-align:center;
    @extend %my-placeholder
}

// good
.my-class {
    @extend %my-placeholder;
    color: red;
    font-weight: bold;
    text-align: center;
}
```

Any local variables should be at the beginning of the ruleset before an extends, includes, or declrations. The local variable should also be followed by a blank line.

```sass
.my-class {
    $local-variable: 'hello';

    color: red;
}
```

When using extends and mixins this is the order they should go in.

1. @extends
2. @includes
3. CSS declarations

```sass
.my-class {
    @extends %my-extend;
    @include my-mixin('foo');
    color: red;
}
```

### Nesting

Sass allows you to nest your selectors. This is very useful when using a namespace to group all related rules for a specific module.

Nesting selectors is where a lot of developers get into trouble. Nesting can lead to some very complicated CSS and selectors with high specificity which makes it harder to override styles in the future. The principles of not doing long selectors in CSS also apply to Sass nesting. You shouldn't be recreating the DOM in your Sass. Using BEM for naming your selectors will greatly help with keeping your CSS selectors flat leading to low specificity. See the section on [BEM]() for more information.

* Each level of nesting should be another level of indenting that matches the level of nesting.
* The start of each nesting level should have a newline preceding it.
* Use the Sass parent selector, `&`, to reference the nested selectors parent.

```sass
// bad
.my-class {
    color: red;
    .my-class:hover {

    }
    .my-nested-class{

    }
}

// good
.my-class {
    color: red;
    
    &:hover {

    }
    .my-nested-class{
        
    }
}
```

### Colors

Sass like CSS supports declaring colors in HSLa, RGBa, and Hex formats. Colors should be declared in hex format as lowercase. Make sure you use shorthand where possible. If you need to use an alpha value you can use the Sass function `rgba()`, `rgba(#102030, 0.5) => rgba(16, 32, 48, 0.5)`.

Do not use [CSS color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords) unless you are doing some testing or prototyping. Your production code should not contain CSS color keywords.

### Color Variables

If you find yourself using a color more than once it should be put into a variable. The color variable should be prefixed with `$color-`.

Naming colors is difficult. To help avoid having color variables like $color-gray, $color-light-gray, $color-lighter-gray you can use a site like [Name That Color](http://chir.ag/projects/name-that-color/#6195ED). This site will take a hex value and give you the closest color name for that value.

It's recommended that you try not to use the actual color variable in your Sass. In your `_config.scss` file have a variable that describes what that the color is used for and assign the color variable to this usage variable. This helps to abstract out the color usage and keeps all your config variables grouped together.

```sass
// Color example
$color-cornflower-blue: #6195ed;
$header-bg-color: $color-cornflow-blue;
```

In the example above if the header background color changes your don't have to update the variable in your Sass file. You can just update the `$header-bg-color` variable value in your config file.

### Sorting

How to sort CSS declarations has always lead to big debates. Some people like to sort their declarations alphabetically. Some people like to sort by type and there are some that don't care. Because their is no right answer for this the decision on how to sort declarations will be left up to the lead developer. The only rule is whichever sort method is chosen is the method that must be used throughout the project. Any new developers that come onto a project must follow the same sorting method.

### !important

This is real simple, nothing is ever that `!important`. If you find yourself needing to use `!important` it's a good sign you're Sass isn't structured correctly. More than likely you are being to specific with your selectors.

There are those rare edge cases where you'll need `!important`, and it'll probably be because of a 3rd party CSS file. Before you use `!important`, however, talk to one of your developer co-workers to see if there is another solution.

## Naming

This section does not detail how to name your selectors. We are going to focus on the actual format of the name. In Sass you have more than just selectors that you can name.

* variables
* functions
* placeholders
* mixins

When naming things try to strike a balance between being terse and verbose. You don't want your name to convey meaning, but you don't want it to be so long that a developer will hate typing it every time. Whatever name you choose, use lowercase hyphen-delimited words.

```sass
// bad
.this-class-is-too-long
.button-for-submitting-user-form

// good
.this-is-good
.btn-user-submit
```

Constants go against this format though. They need to stand out so that you can tell just by looking at a variable that it is meant to be immutable.

* All uppercase
* Use an underscore for delimiting words

```sass
$Z_INDEXES: (1, 10, 100);
$DISPLAY_OPTIONS: ('block', 'inline', 'table');
```









