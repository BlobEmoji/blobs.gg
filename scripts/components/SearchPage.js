import React from 'react'
import classnames from 'classnames'

export default function SearchPage({ className, page, ...rest }) {
  return (
    <button
      type="button"
      className={classnames('button pages', className)}
      {...rest}
    >
      {page}
    </button>
  )
}
