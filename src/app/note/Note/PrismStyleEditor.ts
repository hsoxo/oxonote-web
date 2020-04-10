import styled from "styled-components";
// import Typography from 'typography';
// // @ts-ignore
// import Wordpress2016 from 'typography-theme-wordpress-2016';
//
// Wordpress2016.overrideThemeStyles = () => ({
//   a: {
//     color: 'var(--textLink)',
//   },
//   hr: {
//     background: 'var(--hr)',
//   },
//   'a.gatsby-resp-image-link': {
//     boxShadow: 'none',
//   },
//   'a.anchor': {
//     boxShadow: 'none',
//   },
//   'a.anchor svg[aria-hidden="true"]': {
//     stroke: 'var(--textLink)',
//   },
//   p: {
//     marginBottom: 0, // for editor only
//     marginBlockStart: 0, // for editor only
//     marginBlockEnd: 0, // for editor only
//   },
//   'p code': {
//     fontSize: '1rem',
//   },
//   // TODO: why tho
//   'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
//     fontSize: 'inherit',
//   },
//   'li code': {
//     fontSize: '1rem',
//   },
//   blockquote: {
//     marginLeft: '-1rem',
//     paddingLeft: '0.66rem',
//     marginBottom: 0, // for editor only
//     color: 'inherit',
//     borderLeftColor: 'inherit',
//     opacity: '0.8',
//   },
//   'blockquote.translation': {
//     fontSize: '1em',
//   },
//   'span.il-mark': {
//     display: 'none',
//   },
//   'code[class*=language-]': {
//     borderRadius: '.3em',
//     background: 'var(--inlineCode-bg)',
//     color: 'var(--inlineCode-text)',
//     padding: '.15em .2em .05em',
//     whiteSpace: 'normal',
//   }
// });
//
// delete Wordpress2016.googleFonts;
// console.log(new Typography(Wordpress2016).toString())
export const PrismStyled = styled.div`
html {
	font-family: sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%
}

body {
	margin: 0
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
	display: block
}

audio,
canvas,
progress,
video {
	display: inline-block
}

audio:not([controls]) {
	display: none;
	height: 0
}

progress {
	vertical-align: baseline
}

[hidden],
template {
	display: none
}

a {
	background-color: transparent;
	-webkit-text-decoration-skip: objects
}

a:active,
a:hover {
	outline-width: 0
}

abbr[title] {
	border-bottom: none;
	text-decoration: underline;
	text-decoration: underline dotted
}

b,
strong {
	font-weight: inherit;
	font-weight: bolder
}

dfn {
	font-style: italic
}

h1 {
	font-size: 2em;
	margin: .67em 0
}

mark {
	background-color: #ff0;
	color: #000
}

small {
	font-size: 80%
}

sub,
sup {
	font-size: 75%;
	line-height: 0;
	position: relative;
	vertical-align: baseline
}

sub {
	bottom: -.25em
}

sup {
	top: -.5em
}

img {
	border-style: none
}

svg:not(:root) {
	overflow: hidden
}


code,
kbd,
pre,
samp {
  font-family: Consolas, Monaco, 'Andale Mono', 'Lucida Console', monospace;
  hyphens: none;
	font-size: 1em
}

figure {
	margin: 1em 40px
}

hr {
	box-sizing: content-box;
	height: 0;
	overflow: visible
}

button,
input,
optgroup,
select,
textarea {
	font: inherit;
	margin: 0
}

optgroup {
	font-weight: 700
}

button,
input {
	overflow: visible
}

button,
select {
	text-transform: none
}

[type=reset],
[type=submit],
button,
html [type=button] {
	-webkit-appearance: button
}

[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner,
button::-moz-focus-inner {
	border-style: none;
	padding: 0
}

[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring,
button:-moz-focusring {
	outline: 1px dotted ButtonText
}

fieldset {
	border: 1px solid silver;
	margin: 0 2px;
	padding: .35em .625em .75em
}

legend {
	box-sizing: border-box;
	color: inherit;
	display: table;
	max-width: 100%;
	padding: 0;
	white-space: normal
}

textarea {
	overflow: auto
}

[type=checkbox],
[type=radio] {
	box-sizing: border-box;
	padding: 0
}

[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
	height: auto
}

[type=search] {
	-webkit-appearance: textfield;
	outline-offset: -2px
}

[type=search]::-webkit-search-cancel-button,
[type=search]::-webkit-search-decoration {
	-webkit-appearance: none
}

::-webkit-input-placeholder {
	color: inherit;
	opacity: .54
}

::-webkit-file-upload-button {
	-webkit-appearance: button;
	font: inherit
}

html {
	font: 100%/1.75 'Merriweather', 'Georgia', serif;
	box-sizing: border-box;
	overflow-y: scroll;
}

* {
	box-sizing: inherit;
	line-height: 18px;
	transition: all ease 100ms;
}

*:before {
	box-sizing: inherit;
}

*:after {
	box-sizing: inherit;
}

body {
	color: hsla(0, 0%, 0%, 0.9);
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 400;
	word-wrap: break-word;
	font-kerning: normal;
	-moz-font-feature-settings: "kern", "liga", "clig", "calt";
	-ms-font-feature-settings: "kern", "liga", "clig", "calt";
	-webkit-font-feature-settings: "kern", "liga", "clig", "calt";
	font-feature-settings: "kern", "liga", "clig", "calt";
}

img {
	max-width: 100%;
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

h1 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: Montserrat, sans-serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 2.5rem;
	line-height: 1.1;
}

h2 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 1.73286rem;
	line-height: 1.1;
}

h3 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 1.4427rem;
	line-height: 1.1;
}

h4 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 1rem;
	line-height: 1.1;
	letter-spacing: 0.140625em;
	text-transform: uppercase;
}

h5 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 0.83255rem;
	line-height: 1.1;
}

h6 {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	color: inherit;
	font-family: 'Merriweather', 'Georgia', serif;
	font-weight: 900;
	text-rendering: optimizeLegibility;
	font-size: 0.75966rem;
	line-height: 1.1;
	font-style: italic;
}

hgroup {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

ul {
	margin: 0 0 0 1.75rem;
	padding: 0;
	list-style-type: circle;
}

ol {
	margin: 0 0 0 1.75rem;
	padding: 0;
	list-style-type: decimal;
}

dl {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

dd {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

p {
	margin: 0;
	padding: 0;
	margin-block-start: 0;
	margin-block-end: 0;

}
}
figure {
	margin: 0;
	padding: 0;
}

pre {
	margin: -0.6rem;
	padding: 1rem 0.6rem;
	border-radius: 5px;
	font-size: 0.85rem;
	line-height: 1.75rem;
	background-color: var(--secondary-bg);
	width: calc(100% + 1.2rem);
	overflow-x: auto;
}

table {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
	font-size: 1rem;
	line-height: 1.75rem;
	border-collapse: collapse;
	width: 100%;
}

fieldset {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

blockquote {
	margin: 0 -1rem 0 -1rem;
	padding: 0 0.66rem 0 1rem;
	font-size: 1.20112rem;
	line-height: 1.75rem;
	color: inherit;
	font-style: italic;
	border-left: 0.32813rem solid hsla(0, 0%, 0%, 0.9);
	border-left-color: inherit;
	opacity: 0.8;
}

form {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

noscript {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

iframe {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

hr {
	margin: .75rem 0;
	padding: 0;
	background: var(--hr);
	border: none;
	height: 1px;
}

address {
	margin: 1.75rem 0 .75rem 0;
	padding: 0;
}

b {
	font-weight: 700;
}

strong {
	font-weight: 700;
}

dt {
	font-weight: 700;
}

th {
	font-weight: 700;
}

li {
  margin: 0;
}

ol li {
	padding-left: 0;
}

ul li {
	padding-left: 0;
}

li>ol {
	margin-left: .75rem;
	margin-bottom: calc(1.75rem / 2);
	margin-top: calc(1.75rem / 2);
}

li>ul {
	margin-left: .75rem;
	margin-bottom: calc(1.75rem / 2);
	margin-top: calc(1.75rem / 2);
}

blockquote *:last-child {
	margin-bottom: 0;
}

li *:last-child {
	margin-bottom: 0;
}

p *:last-child {
	margin-bottom: 0;
}

li>p {
	margin-bottom: calc(1.75rem / 2);
}

code {
	font-size: 0.85rem;
	line-height: 1.75rem;
}

kbd {
	font-size: 0.85rem;
	line-height: 1.75rem;
}

samp {
	font-size: 0.85rem;
	line-height: 1.75rem;
}

abbr {
	border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
	cursor: help;
}

acronym {
	border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
	cursor: help;
}

abbr[title] {
	border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
	cursor: help;
	text-decoration: none;
}

thead {
	text-align: left;
}

td,
th {
	text-align: left;
	border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
	font-feature-settings: "tnum";
	-moz-font-feature-settings: "tnum";
	-ms-font-feature-settings: "tnum";
	-webkit-font-feature-settings: "tnum";
	padding-left: 1.16667rem;
	padding-right: 1.16667rem;
	padding-top: 0.875rem;
	padding-bottom: calc(0.875rem - 1px);
}

th:first-child,
td:first-child {
	padding-left: 0;
}

th:last-child,
td:last-child {
	padding-right: 0;
}

blockquote> :last-child {
	margin-bottom: 0;
}

blockquote cite {
	font-size: 1rem;
	line-height: 1.75rem;
	color: hsla(0, 0%, 0%, 0.9);
	font-weight: 400;
}

blockquote cite:before {
	content: "— ";
}

ul,
ol {
	margin-left: 0.5rem;
}

@media only screen and (max-width:480px) {
	ul,
	ol {
		margin-left: 0;
	}
	blockquote {
		margin-left: -1.3125rem;
		margin-right: 0;
		padding-left: 0.98438rem;
	}
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin-top: 3.5rem;
}

a {
	box-shadow: 0 1px 0 0 currentColor;
	color: var(--textLink);
	text-decoration: none;
}

a:hover,
a:active {
	box-shadow: none;
}

mark,
ins {
	background: #007acc;
	color: white;
	padding: 0.10938rem 0.21875rem;
	text-decoration: none;
}

a.gatsby-resp-image-link {
	box-shadow: none;
}

a.anchor {
	box-shadow: none;
}

a.anchor svg[aria-hidden="true"] {
	stroke: var(--textLink);
}

p code {
	font-size: 1rem;
}

h1 code,
h2 code,
h3 code,
h4 code,
h5 code,
h6 code {
	font-size: inherit;
}

li code {
	font-size: 1rem;
}

blockquote.translation {
	font-size: 1em;
}

span.il-mark {
	display: none;
}

code[class*=language-] {
	border-radius: .3em;
	background: var(--inlineCode-bg);
	color: var(--inlineCode-text);
	padding: .15em .2em .05em;
	white-space: normal;
}


code[class*="language-"],
pre[class*="language-"] {
  color: black;
  background: none;
  text-shadow: 0 1px white;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.token.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #9a6e3a;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}


.token.function,
.token.class-name {
  color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

div.code-toolbar {
  position: relative;
}

div.code-toolbar > .toolbar {
  position: absolute;
  top: .3em;
  right: .2em;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

div.code-toolbar:hover > .toolbar {
  opacity: 1;
}

/* Separate line b/c rules are thrown out if selector is invalid.
   IE11 and old Edge versions don't support :focus-within. */
div.code-toolbar:focus-within > .toolbar {
  opacity: 1;
}

div.code-toolbar > .toolbar .toolbar-item {
  display: inline-block;
}

div.code-toolbar > .toolbar a {
  cursor: pointer;
}

div.code-toolbar > .toolbar button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
}

div.code-toolbar > .toolbar a,
div.code-toolbar > .toolbar button,
div.code-toolbar > .toolbar span {
  color: #bbb;
  font-size: .8em;
  padding: 0 .5em;
  background: #f5f2f0;
  background: rgba(224, 224, 224, 0.2);
  box-shadow: 0 2px 0 0 rgba(0,0,0,0.2);
  border-radius: .5em;
}

div.code-toolbar > .toolbar a:hover,
div.code-toolbar > .toolbar a:focus,
div.code-toolbar > .toolbar button:hover,
div.code-toolbar > .toolbar button:focus,
div.code-toolbar > .toolbar span:hover,
div.code-toolbar > .toolbar span:focus {
  color: inherit;
  text-decoration: none;
}


`