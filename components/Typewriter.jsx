import React from 'react'
import classNames from 'clsx'
import { IoChevronForwardSharp } from 'react-icons/io5'

const Typewriter = (props) => {
  const {
    children,
    className,
    lineClassName,
    as = 'div',
    lines = [],
    interval = 3000,
    withIcon = true,
    ...rest
  } = props

  // Starts at 0, not null, so the text is in the server-rendered HTML: the
  // reveal is a CSS keyframe clipping the width, not the mount. Gating it on
  // hydration left an empty <h1> for crawlers and shifted layout on arrival.
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (lines.length < 1 && !children) return

    const linesLength = children ? 1 : lines.length

    if (linesLength === 1) {
      setTimeout(() => setIndex(0), 1500)
    }

    if (linesLength > 1) {
      const intervalID = setInterval(() => setIndex((i) => (i + 1) % linesLength), interval)
      return () => clearInterval(intervalID)
    }
  }, [lines, children, interval])

  const Component = as

  return (
    <Component className={classNames('m-0 inline-flex items-baseline font-mono', className)}>
      {withIcon && (
        <IoChevronForwardSharp className="hidden shrink-0 grow-0 self-center text-omega-500 md:block" />
      )}
      <span
        key={index}
        className={classNames(
          'animate-typewriter overflow-hidden whitespace-nowrap',
          lineClassName
        )}
        {...rest}
      >
        {lines[index] || children}
      </span>
      <div aria-hidden="true" className="ml-2 -translate-y-2 animate-blink">
        _
      </div>
    </Component>
  )
}

export default Typewriter
