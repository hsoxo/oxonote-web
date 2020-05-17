/**
 * HEADERS
 * # This is an H1
 * ## This is an H2
 * ###### This is an H6
 */
export const HEADER = /^#{1,6}$/m

/**
 * BLOCKQUOTES
 * > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
 * > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
 * > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
 * >
 * > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
 * > id sem consectetuer libero luctus adipiscing.
 *
 * TODO: Elements in BLOCKQUOTES
 */
export const BLOCKQUOTE = /^>$/m

/**
 * LIST
 * Unordered lists
 * * Red
 * * Green
 * or
 * + Red
 * + Green
 * or
 * - Red
 * - Green
 * Convert to:
 * <ul>
 *   <li>Red</li>
 *   <li>Green</li>
 * </ul>
 *
 * Ordered lists
 * 1. Bird
 * 2. MacHale
 * Convert to:
 * <ol>
 *   <li>Bird</li>
 *   <li>MacHale</li>
 * </ol>
 *
 * TODO: <p> tag in <li>
 */
export const BULLET_LIST = /((?:^\s*)(?:[*+-]))$/m
export const ORDERED_LIST = /((?:^\s*)(?:\d+\.))$/m

/**
 * CODE BLOCKS
 * at least 4 spaces or 1 tab
 * This is a normal paragraph:
 *
 *     This is a code block.
 * or
 * This is a normal paragraph:
 * ```language
 * This is a code block.
 * ```
 */
export const CODE = /^(?: {4}|\t)$/m
export const CODE_ALT = /^\s*```(\w+)?$/m

/**
 * HORIZONTAL RULES
 * * * *
 * ***
 * - - -
 * ---------------------------------------
 */
export const HR = /(^\s*)([*-])(?:[\t ]*\2){2,}$/m
