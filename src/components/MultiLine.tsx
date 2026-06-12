import { Fragment } from 'react'

/** Render a string containing "\n" as React lines separated by <br />. */
export function multiline(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))
}

/** Render a string containing "\n" as separate <p> elements. */
export function paragraphs(text: string) {
  return text.split('\n').map((line, i) => <p key={i}>{line}</p>)
}
