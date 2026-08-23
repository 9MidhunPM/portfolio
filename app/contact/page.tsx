import { Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const title = "Contact";
const description =
  "Get in touch with Midhun P M — internships, collaboration, or questions about a project. Email midhun.titan@gmail.com; replies within a day or two.";

export const metadata = createPageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="space-y-14">
        <PageHeader
          eyebrow={title}
          title="Say hello"
          description="Internships in backend or AI systems, a project that needs building, or a question about something I've shipped — my inbox is open and I actually read it."
        />

        <div className="max-w-prose space-y-10">
          <div className="space-y-4">
            <h2 className="font-mono text-[13px] text-muted">Email</h2>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-muted"
              >
                <Mail size={15} className="text-muted" />
                {SITE.email}
              </a>
              <CopyEmailButton email={SITE.email} />
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Based in Kerala, India (IST). Usually replies within a day or
              two.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-mono text-[13px] text-muted">Elsewhere</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <GithubIcon width={15} height={15} />
                  <span>
                    <span className="text-foreground">GitHub</span> — all the
                    code, including the messy repos
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <LinkedinIcon width={15} height={15} />
                  <span>
                    <span className="text-foreground">LinkedIn</span> — the
                    formal version of this site
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
