import type {ReactNode} from "react";

export default function LegalPage({title,updated,children}:{title:string;updated:string;children:ReactNode}){
  return <main className="legal-page" lang="en">
    <header className="legal-header"><a href="/" className="legal-brand"><img src="/app-assets/guru-app-icon.png" alt=""/><span><b>Shri Gurupeeth</b><small>Dindori Pranit Seva Marg</small></span></a><a href="/">Open app</a></header>
    <article className="legal-content"><p className="legal-eyebrow">Shri Gurupeeth app and website</p><h1>{title}</h1><p className="legal-updated">Last updated: {updated}</p>{children}<nav className="legal-nav" aria-label="Legal and support pages"><a href="/privacy-policy">Privacy policy</a><a href="/terms">Terms of use</a><a href="/account-deletion">Account deletion</a><a href="/support">Support</a></nav></article>
    <footer className="legal-footer">Questions? <a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a></footer>
  </main>;
}
