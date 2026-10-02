import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { MinecraftCube } from './MinecraftCube';

const CONTACT_EMAIL = 'onamemba@gmail.com';

/* OPTIONAL: to receive messages by email without opening the visitor's mail app,
   create a free form at formspree.io and paste its URL here, e.g.
   'https://formspree.io/f/abcdwxyz'
   If this is left empty, the Send button opens the visitor's email app, pre-filled. */
const FORM_ENDPOINT = '';

type Fields = { name: string; email: string; message: string };
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Fields = { name: '', email: '', message: '' };

function validate(v: Fields) {
  const errors: Partial<Fields> = {};
  if (!v.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = 'Please enter a valid email.';
  if (v.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (FORM_ENDPOINT) {
      setStatus('sending');
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('sent');
        setValues(EMPTY);
      } catch {
        setStatus('error');
      }
    } else {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus('sent');
      setValues(EMPTY);
    }
  };

  return (
    <section id="contact" className="section scroll-section sec-wide">
      <motion.div
        className="cx-grid"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* LEFT: heading, form, links */}
        <div className="cx-left">
          <h2 className="section-title">
            <Mail size={24} className="title-icon" />
            CONTACT
          </h2>
          <p className="cx-intro">Ready to collaborate? Let's discuss your next project.</p>

          <form className="cx-form" onSubmit={onSubmit} noValidate>
            <div className="cx-field">
              <label htmlFor="cx-name">Name</label>
              <input id="cx-name" name="name" type="text" autoComplete="name" value={values.name} onChange={onChange} />
              {errors.name && <span className="err">{errors.name}</span>}
            </div>

            <div className="cx-field">
              <label htmlFor="cx-email">Email</label>
              <input id="cx-email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>

            <div className="cx-field">
              <label htmlFor="cx-message">Message</label>
              <textarea id="cx-message" name="message" rows={5} value={values.message} onChange={onChange} />
              {errors.message && <span className="err">{errors.message}</span>}
            </div>

            <button type="submit" className="btn-primary cx-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'} <ArrowUpRight size={16} />
            </button>

            {status === 'sent' && (
              <p className="cx-status ok">
                {FORM_ENDPOINT ? 'Thanks! Your message was sent.' : 'Your email app should open with the message ready to send.'}
              </p>
            )}
            {status === 'error' && <p className="cx-status bad">Something went wrong. Please try again or email me directly.</p>}
          </form>

          <div className="contact-links">
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">
              <Mail size={16} /> {CONTACT_EMAIL}
            </a>
            <a href="https://linkedin.com/in/francis-tumba-8628b4127" className="contact-link">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="https://github.com/NewSeasonTech" className="contact-link">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* RIGHT: floating cube */}
        <div className="cx-right">
          <MinecraftCube />
        </div>
      </motion.div>
    </section>
  );
}
