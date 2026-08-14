import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Mail, Send, AlertCircle } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import SocialLink from '../ui/SocialLink.jsx'
import AnimatedSection from '../ui/AnimatedSection.jsx'
import { socialLinks } from '../../data/socialLinks.js'
import { siteConfig } from '../../data/siteConfig.js'
import { cn } from '../../utils/cn.js'

const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.'
  if (!values.message.trim()) {
    errors.message = 'Please enter a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }
  return errors
}

function Field({ label, name, type = 'text', value, error, onChange, textarea = false }) {
  const Component = textarea ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs text-muted mb-2">
        {label}
      </label>
      <Component
        id={name}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          'w-full rounded-lg bg-elevated border px-4 py-3 text-sm text-ink placeholder:text-muted/60',
          'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
          error ? 'border-danger' : 'border-border focus:border-accent'
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | success
  const shouldReduceMotion = useReducedMotion()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // NOTE: This is a frontend-only portfolio, so no email is actually sent.
    // To send real messages, wire this handler up to EmailJS, Formspree, or
    // your own backend endpoint — the validated `values` object is ready to
    // send as-is.
    setStatus('success')
    setValues(INITIAL_VALUES)
  }

  return (
    <section id="contact" className="py-28 md:py-40 scroll-mt-28">
      <div className="max-w-wide mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-muted/70">05</span>
            <span className="section-eyebrow uppercase tracking-[0.18em]">// contact</span>
          </div>
          <h2 className="font-display font-semibold tracking-tight text-ink leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
            Let&rsquo;s build
            <br />
            something <span className="text-gradient">useful</span>.
          </h2>
          <p className="mt-6 text-muted text-base sm:text-lg max-w-md">
            Have an idea, an internship, or a project in mind? My inbox is open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <AnimatedSection className="md:col-span-2 flex flex-col gap-6">
            <GlassCard className="p-6">
              <p className="font-mono text-xs text-muted mb-4">// reach me directly</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-ink hover:text-accent transition-colors duration-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={17} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium break-all">{siteConfig.email}</span>
              </a>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="font-mono text-xs text-muted mb-4">// find me elsewhere</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks
                  .filter((link) => link.id !== 'email')
                  .map((link) => (
                    <SocialLink key={link.id} link={link} />
                  ))}
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="md:col-span-3">
            <GlassCard glow className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-10 gap-3"
                  >
                    <CheckCircle2 size={36} className="text-success" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold text-ink">Message ready to send</h3>
                    <p className="text-sm text-muted max-w-sm">
                      Thanks for reaching out! This form isn&rsquo;t wired to a backend yet — email{' '}
                      <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                        {siteConfig.email}
                      </a>{' '}
                      directly for now.
                    </p>
                    <Button variant="outline" onClick={() => setStatus('idle')}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Name" name="name" value={values.name} error={errors.name} onChange={handleChange} />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        error={errors.email}
                        onChange={handleChange}
                      />
                    </div>
                    <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={handleChange} />
                    <Field
                      label="Message"
                      name="message"
                      textarea
                      value={values.message}
                      error={errors.message}
                      onChange={handleChange}
                    />
                    <Button type="submit" variant="primary" icon={Send} className="self-start">
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Contact
