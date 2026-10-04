"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  useFocusTrap(isOpen, ref);
  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    firstField.current?.focus();
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", escape);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", escape);
    };
  }, [isOpen, onClose]);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(20000),
      });
      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(
          result.error ||
            "Your message could not be sent. Please try again or email me directly.",
        );
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error && err.name === "TimeoutError"
          ? "The request timed out. Please try again or email me directly."
          : err instanceof Error
            ? err.message
            : "Please try again or email me directly.",
      );
      setStatus("error");
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <div className="modal-heading">
          <h2 id="contact-title">Send a message.</h2>
          <button aria-label="Close contact form" onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        {status === "success" ? (
          <div className="form-success" role="status">
            <CheckCircle size={36} />
            <h3>Message sent.</h3>
            <p>Thanks for getting in touch. I’ll get back to you soon.</p>
            <button className="button primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="form-intro">
              Tell me about the role, your team, or what you have in mind.
            </p>
            <label htmlFor="contact-name">Name</label>
            <input
              ref={firstField}
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              maxLength={5000}
            />
            <div className="form-trap" aria-hidden="true">
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button
              className="button primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <Send size={16} aria-hidden="true" />
            </button>
            <p className="form-alternative">
              Or email{" "}
              <a href="mailto:danielshaulov4@gmail.com">
                danielshaulov4@gmail.com
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
