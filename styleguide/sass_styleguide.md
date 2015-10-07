# Mirum Sass Style Guide (DRAFT) v0.1

## Table of Contents

* [Compiler](#user-content-compiler)
* [SCSS or Sass](#user-content-scss-or-sass)
* [Syntax and Formatting](#user-content-syntax-and-formatting)
    * [Rulesets](#user-content-rulesets)
    * [Nesting](#user-content-nesting)
    * [Colors](#user-content-colors)
    * [Sorting](#user-content-sorting)
    * [!important](#user-content-important)
* [Naming](#user-content-naming)
    * [BEM](#user-content-bem)
    * [Namespace](#user-content-namespace)
* [Structure](#user-content-structure)
* [Variables](#user-content-variables)
    - [!default](#user-content-default)
    - [!global](#user-content-global)
* [Mixins](#user-content-mixins)
    - [No Arguments](#user-content-no-arguments)
    - [With Arguments](#user-content-with-arguments)
    - [Mixins in Mixins](#user-content-mixins-in-mixins)
    - [@content directive](#user-content-content-directive)
* [Commenting](#user-content-commenting)
    - [CSS](#user-content-css)
    - [Sass](#user-content-sass)

## Description

The purpose of this document is to establish a set of guidelines and best practices for writing Sass on Mirum projects. The main goal is to establish consistency across all Mirum projects. This is not a CSS style guide and only deals with Sass specific ideas and content.

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
// Sass style
.my-element
    color= !primary-color
    width= 100%
    overflow= hidden

.my-other-element
    +border-radius(5px)

// SCSS style
.my-element {
    color: $primary-color;
    width: 100%;
    overflow: hidden;
}

.my-other-element {
    @include border-radius(5px);
}
```

Mirum uses SCSS because it more closely resembles how CSS is written. This makes it easier for new developers to pick it up. When you see Sass mentioned in this document we are talking about the Sass pre-processor itself, not the indented syntax.

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
* The closing bracket '}' should be on it's own line

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

Any local variables should be at the beginning of the ruleset before any extends, includes, or declrations. The local variable should also be followed by a blank line.

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

### BEM

When naming selectors you should follow the [Block, Element, Modifer (BEM) pattern](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/). This will help you have low specificity in your compiled CSS.

BEM follows these simple rules.

* Blocks are your modules and therefore follow the same naming rules as all other selectors
* Elements are prefixed with two underscores
* Modifers are prefixed with two hypens

Elements and Modifers should be nested inside the Block. You should use the parent selector `&` to build the selectors for the Elements and Modifers.

There are times when you need modify the styling of an Element differently when you are using a Modifier on a Block. If you just use the `&` selector in this instance you'll end up with a selector that isn't what you need. An example is if you have a Block `.my-bem` and the Modifier is `--modifier` you'll have a parent selector of `.my-bem--modifier`. So when you place `&__element` underneath your Modifier the `&` selector will append `.my-bem--modifier` to your element and you'll have `.my-bem--modifier__element` which is not the selector you want. To get around this you want to assign your block to a local variable, `$block`, and use [SASS interpolation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_) to construct your selector.

The following example demonstrates how you can use BEM with Sass.

```sass
// Example
.my-bem {
    $block: 'my-bem';

    color: red;

    &--modifer {
        color: purple;

        .#{$block}__element {
            width: 25%;
        }
    }
    &__element {
        width: 50%;
    }
}

// output
.my-bem {
    color: red;
}
.my-bem--modifer {
    color: purple;
}
.my-bem--modifer .my-bem__element {
    width: 25%;
}
.my-bem__element {
    width: 50%;
}
```

### Namespacing

TBD

## Structure

Talk about folder and file structure such as using a manifest file and a config file.

## Variables

If you find yourself typing the same value over and over again it might be a good idea to abstract that value into a variable. At the same time though you don't need a variable for everything. You'll end up with a naming and maintenance nightmare.

### !default

If you are creating Sass that will be used across different projects or different sites for the same projects any configuration variables should have the `!default` flag added. Here is the definition of `!default` from the Sass documentation

> You can assign to variables if they aren't already assigned by adding the !default flag to the end of the value. This means that if the variable has already been assigned to, it won't be re-assigned, but if it doesn't have a value yet, it will be given one.

```sass
$color-bg: #333;
$color-bg: #000 !default;
$color-text: #fff !default;

#main {
  background-color: $color-bg;
  color: $color-text;
}

// Compiled, notice the value of $content #333 even though it set as the value first
#main {
    background-color: #333;
    color: #fff;
}
``` 

### !global

The `!global` flag should only be used when overriding a global variable from local scope.

## Mixins

Mixins act like an abstraction for your CSS. Here is the definition of mixins from the Sass documentation.

> Mixins allow you to define styles that can be re-used throughout the stylesheet without needing to resort to non-semantic classes like .float-left. Mixins can also contain full CSS rules, and anything else allowed elsewhere in a Sass document. They can even take arguments which allows you to produce a wide variety of styles with very few mixins.

This is the key to keeping your Sass [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and reusable. With that being said you need to be careful with creating mixins. The idea of not over-engeering your javascript functions is also applied to your mixins. Remember the idea is to keep your mixins simple. They should do one thing well.

If you find yourself writing the same CSS properties over and over again for a specific reason they should be abstracted into a mixin.

There are two types of mixins, with or without arguments.

### No Arguments

Mixins do not always have to have mixins. This usually happens when you have CSS properties that don't change or have not overwritable default values. When including these mixins in your code you should omit the `()`. The keyword `@include` already indicates that the line is a mixin call.

```sass
@mixin position-it {
    position: absolute;
    top: 0;
}
// Bad
.my-classA {
    @include position-it();
}
// Good
.my-classA {
    @include position-it;
}
```

### With Arguments

Mixins use arguments as a way for you to provide CSS property values that can be changed. It's best to provide default values for your arguments.

```sass
@mixin my-mixin($font: 'foo', $color: #fff) {
    font-family: $foo;
    color: $color;
}
// use defaults
.my-classA {
    @include my-mixin();
}
// override defaults
.my-classB {
    @include my-mixin($font: 'bar', $color: #000);
}
```

### Mixin in Mixins

Sass allows you to include mixins inside other mixins. Be very careful with this though because you are creating dependencies. If you do this be sure to list the dependencies in your documenting comments. This will help future developers when they have to modify a mixin that is included in other mixins.

### @content directive

TBD

## Commenting

Just as in any programming language comments help you to convey information to other developers. You want to strike a balance between terse and verbose. Although your code should be self-documenting, sometimes you need comments to help fill in the blanks.

### CSS

Regular CSS rulesets should be commented using regular CSS type comments `/* Comment */`. There is no need to comment every CSS ruleset though. Use comments to convey information when the purpose of the ruleset isn't obvious from reading the code. Some scenarios would be:

* To state the purpose of a file.
* The goal behind a ruleset.
* Explain Using unorthodox CSS to compensate for a browser quirk.
* The reason why you did something in particular.

```css
/**
 * This forces IE to clear each row in the gallery
 */
.gallery__row {
    clear: left;
}
```

### Sass

When commenting your Sass follow the [Sassdoc](http://sassdoc.com/) syntax. Sassdoc comments are JSDoc-like comments for Sass. It helps force a common comment style for your Sass code. It also can be used to generate a HTML version of your Sass API for other developers to follow.

Any variable, placeholder, mixin, or function should be documented using the Sassdocs style. At the bare minimum you should have a description for Sass code. Mixins and functions must have their arguments documented.

```sass
/// Base font size for the page. Assign to the <html> element
/// @group fonts
$font-size-base: 14;

/// Writes code for the font-family and the color of the text
/// @param {String} $font -  font-family stack to use
/// @param {Hex Number} $color - the color the text will be
@mixin my-mixin($font: 'foo', $color: #fff) {
    font-family: $foo;
    color: $color;
}
```

Here is an [article](http://www.sitepoint.com/sassdoc-2-shiny-streamy-octopus/) from the creator, Hugo Giraudel, on using Sassdoc.









