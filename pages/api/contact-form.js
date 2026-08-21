/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and *
 * will be treated as an API endpoint instead of a page.        *
 ****************************************************************/

import nodemailer from 'nodemailer'
import { config } from '../../theme.config'

const port = Number(process.env.SMTP_PORT) || 465

/**
 * A plain cPanel mailbox: 465 is implicit TLS, 587 upgrades over STARTTLS.
 * Built at module scope so warm invocations reuse the connection pool, and
 * given timeouts that expire inside the function's own budget rather than
 * letting the platform kill it mid-connection.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000,
})

const getHtmlBody = (body) => {
  return Object.entries(body).map(([key, value]) => {
    if (typeof value === 'string') {
      return `<b>${key}</b>: ${value}`
    }
    if (typeof value === 'boolean') {
      return value === true ? key : false
    }
    if (typeof value === 'object') {
      return `<b>${key}</b>: ${getHtmlBody(value)?.filter(Boolean).join(', ')}`
    }
    return `<b>${key}</b>: ${value}`
  })
}

const contact = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Request method is not allowed.' })
  }

  const { email } = req.body
  const { recipient, sender, subject } = config.contactForm || {}

  if (!recipient) {
    return res
      .status(400)
      .json({ error: 'Missing [config.contactForm.recipient] property in theme options.' })
  }
  if (!sender) {
    return res
      .status(400)
      .json({ error: 'Missing [config.contactForm.sender] property in theme options.' })
  }
  if (!email) {
    return res
      .status(400)
      .json({ error: 'Missing email address. Please provide a correct email address.' })
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('Contact form: SMTP_HOST, SMTP_USER or SMTP_PASSWORD is not set.')
    return res.status(500).json({ error: 'The contact form is not configured. Please email me.' })
  }

  let html = getHtmlBody(req.body)
  if (Array.isArray(html)) {
    html = html.join('<br />')
  }

  try {
    await transporter.sendMail({
      to: recipient,
      // The mailbox that authenticated - anything else fails SPF and is
      // usually rejected outright by the server. The visitor goes in
      // replyTo, so replying still reaches them.
      from: sender,
      replyTo: email,
      subject: req.body.subject || subject || 'Contact form entry',
      html,
    })
  } catch (error) {
    // Server-side detail only; the response text is shown to the visitor.
    console.error('Contact form send failed:', error)
    return res.status(500).json({ error: 'Could not send your message. Please try again.' })
  }

  return res.status(200).json({ error: '' })
}

export default contact
