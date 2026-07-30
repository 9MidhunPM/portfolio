"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { SOCIAL_SHARE } from "@/lib/data";

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — no-op
    }
  };

  const twitterUrl = SOCIAL_SHARE.twitter(title, url);
  const linkedinUrl = SOCIAL_SHARE.linkedin(url);

  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-muted hover:text-foreground";

  return (
    // role="group" is required for aria-label to apply — on a bare div the
    // label is dropped by assistive tech.
    <div className="flex items-center gap-2" role="group" aria-label="Share this post">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={buttonClass}
      >
        <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" aria-hidden="true">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={buttonClass}
      >
        <LinkedinIcon width={15} height={15} />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link to this post"
        className={buttonClass}
      >
        {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
