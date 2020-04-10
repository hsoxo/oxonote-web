// `code`
export const INLINE_CODE = /(`|``)(((?!\1).)+?)\1$/m

// ![example](http://example.com "Optional title")
export const INLINE_IMAGE = /!\[([^\]]+)\]\((.+[tT][pP]:\/\/.*)\)/

// [example](http://example.com "Optional title")
export const INLINE_LINK = /\[([^\]]+)\]\((.+[tT][pP]:\/\/.*)\)/

// [Bold + Italic] ***[strong + italic]***, ___[strong + italic]___
export const INLINE_BOLD_ITALIC = /(\*\*\*|___)((?!\1).)+?\1$/m

// [Bold] **strong**, __strong__
export const INLINE_BOLD = /(\*\*|__)(((?!\1).)+?)\1$/m

// [Italic] _em_, *em*
export const INLINE_ITALIC = /(\*|_)(((?!\1).)+?)\1$/m
