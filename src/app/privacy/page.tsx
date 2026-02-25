import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-6 py-12 grid-bg">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10 space-y-8 text-text-secondary leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Name and email address when you create an account</li>
              <li>
                Payment information processed securely through Stripe (we do not
                store your card details)
              </li>
              <li>Usage data related to your interaction with our products</li>
              <li>Communication data when you contact our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>
                Monitor and analyze trends, usage, and activities in connection
                with our services
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Payment Processing
            </h2>
            <p>
              All payment processing is handled by Stripe, a PCI-DSS compliant
              payment processor. We never store, process, or have access to your
              full credit card information. Stripe&apos;s privacy policy governs the
              handling of your payment data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption of
              data in transit and at rest, regular security assessments, and
              access controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide you services. If you wish to delete
              your account, please contact us and we will delete your personal
              data within 30 days, except where we are required to retain it for
              legal or regulatory purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Third-Party Services
            </h2>
            <p className="mb-3">We may use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Stripe for payment processing</li>
              <li>Supabase for data storage and authentication</li>
              <li>Vercel for hosting</li>
              <li>Discord for community management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Cookies
            </h2>
            <p>
              We use essential cookies for authentication and session management.
              We do not use tracking cookies or third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our data
              practices, please contact us via our Discord server or email us at
              support@zappit.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
