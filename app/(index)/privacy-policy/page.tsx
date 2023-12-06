import "@/styles/common-page.css"
import SimpleButton from "@/components/ui/simpleButton"

export default function IndexPage() {
  return (
    <main className="main-section">
      <SimpleButton />
      <div className="content-box">
        <h1 className="title mt-0">Privacy policy</h1>
        <p className="text text-[rgba(42, 48, 51, 1)]">
          Effective Date: May 16th, 2023
        </p>
        <h2 className="heading">Introduction</h2>
        <p className="paragraph">
          Welcome to SocialTrader! This policy sets out how we handle your
          personal information if you’re a SocialTrader user or visitor to our
          sites. It applies across SocialTrader website and mobile application
          (the «Services»).
        </p>
        <h2 className="heading">The type of personal information we collect</h2>
        <p className="paragraph">
          We collect certain personal information about visitors and users
          of our Services. The most common types of information we collect are
          things like user names, member names, email addresses, other contact
          details, payment information, transactional details, support queries,
          forum comments, and web analytics data.
        </p>
        <h2 className="heading">How we collect personal information</h2>
        <p className="paragraph">
          We collect personal information directly when you provide it to us,
          automatically as you navigate through the Services, or through other
          people when you use services associated with the Services.
        </p>
        <h2 className="heading">How we use personal information</h2>
        <p className="paragraph">
          We will use your personal information to provide you with our
          Services, operate our business, respond to your inquiries, manage your
          account, send you marketing material, and comply with the law.
        </p>
        <h2 className="heading">How we can share your personal information</h2>
        <p className="paragraph">
          We may disclose personal information to our partner service providers
          who help us provide the Services, or when required by law.
        </p>
        <h2 className="heading">Keeping your personal information secure</h2>
        <p className="paragraph">
          We store personal information on secure servers that are managed
          by us and our service providers, and occasionally hard copy files that
          are kept in a secure location.
        </p>
        <h2 className="heading">Cookies and web analytics</h2>
        <p className="paragraph">
          We may disclose personal information to our partner service providers
          who help us provide the Services, or when required by law.
        </p>
        <h2 className="heading">Information about children</h2>
        <p className="paragraph">
          Our Services are not suitable for children under the age of 16,
          so if you are under 16, we ask that you do not use our Services
          or give us your personal information.
        </p>
        <h2 className="heading">Changes to this Policy</h2>
        <p className="paragraph">
          We may revise this Privacy Policy from time to time, and will post the
          most current version on our website.
        </p>
        <hr className="mb-4 mt-10 w-full border-gray-300 dark:border-[#2D3A43] " />
        <h2 className="heading mt-6">Contact Us</h2>
        <p className="paragraph">
          If you have any questions about our privacy practices or the way
          in which we have been managing your personal information, please
          contact us at{" "}
          <a
            href="mailto:recipient@example.com?subject=Hello%20SocialTrader&"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-foreground hover:underline"
          >
            support@socialtrader.ai.
          </a>
        </p>
      </div>
    </main>
  )
}
