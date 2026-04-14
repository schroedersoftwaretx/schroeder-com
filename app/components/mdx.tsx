import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import remarkGfm from 'remark-gfm'
import {
  FantasyOvervaluedBar,
  FantasyPositionScatter,
  FantasyTop50TierScatter,
  FantasyUndervaluedBar,
} from 'app/components/blog/fantasy-football-charts'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 first:mt-0 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-neutral-700 dark:[&_p]:text-neutral-200 [&_p]:font-medium">
      {children}
    </div>
  )
}

function Callout({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <aside className="not-prose my-8 rounded-xl border border-sky-200/80 bg-gradient-to-br from-sky-50/90 via-white to-neutral-50 p-5 shadow-sm dark:border-sky-900/50 dark:from-sky-950/40 dark:via-neutral-950 dark:to-neutral-950">
      {title ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-800 dark:text-sky-300">
          {title}
        </p>
      ) : null}
      <div className="text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300 [&_a]:font-medium [&_a]:text-sky-800 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-sky-400">
        {children}
      </div>
    </aside>
  )
}

function Signature({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose mt-14 border-t border-neutral-200 pt-8 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
      {children}
    </div>
  )
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Lead,
  Callout,
  Signature,
  FantasyTop50TierScatter,
  FantasyUndervaluedBar,
  FantasyOvervaluedBar,
  FantasyPositionScatter,
}

export function CustomMDX(props) {
  const { options: userOptions, components: userComponents, ...rest } = props
  const userMdx = userOptions?.mdxOptions ?? {}
  const userRemark = Array.isArray(userMdx.remarkPlugins)
    ? userMdx.remarkPlugins
    : []
  return (
    <MDXRemote
      {...rest}
      options={{
        ...userOptions,
        mdxOptions: {
          ...userMdx,
          remarkPlugins: [remarkGfm, ...userRemark],
        },
      }}
      components={{ ...components, ...(userComponents || {}) }}
    />
  )
}
