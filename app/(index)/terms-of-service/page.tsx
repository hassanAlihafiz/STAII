import "@/styles/common-page.css"
import SimpleButton from "@/components/ui/simpleButton"

export default function IndexPage() {
  return (
    <main className="main-section">
      <SimpleButton />
      <div className="content-box">
        <h1 className="title mt-0">Terms of service</h1>
        <p className="text text-[rgba(42, 48, 51, 1)]">
          Effective Date: May 16th, 2023
        </p>
        <h2 className="heading">Introduction</h2>
        <p className="paragraph">
          Welcome to SocialTrader. By using our Services, you are agreeing
          to these terms. Please read them carefully.
        </p>
        <h2 className="heading">Using our Services</h2>
        <p className="paragraph">
          You must follow any policies made available to you within the
          Services. You may use our Services only as permitted by law.
        </p>
        <h2 className="heading">How we collect personal information</h2>
        <p className="paragraph">
          We collect personal information directly when you provide it to us,
          automatically as you navigate through the Services, or through other
          people when you use services associated with the Services.
        </p>
        <h2 className="heading">Your Account</h2>
        <p className="paragraph">
          You may need a SocialTrader Account in order to use some of our
          Services. You may create your own SocialTrader Account. To protect
          your SocialTrader Account, keep your password confidential.
        </p>
        <h2 className="heading">Privacy and Copyright Protection</h2>
        <p className="paragraph">
          Our privacy policies explain how we treat your personal data and
          protect your privacy when you use our Services. By using our Services,
          you agree that SocialTrader can use such data in accordance with our
          privacy policies.
        </p>
        <h2 className="heading">Software in our Services</h2>
        <p className="paragraph">
          SocialTrader gives you a personal, worldwide, royalty-free,
          non-assignable and non-exclusive license to use the software provided
          to you by SocialTrader as part of the Services.
        </p>
        <h2 className="heading">Modifying and Terminating our Services</h2>
        <p className="paragraph">
          We are constantly changing and improving our Services. We may add
          or remove functionalities or features, and we may suspend or stop
          a Service altogether.
        </p>
        <h2 className="heading">Disputes</h2>
        <p className="paragraph">
          Any disputes arising out of or relating to the Services will
          be governed by the laws of California, except for its conflicts
          of laws principles.
        </p>
        <h2 className="heading">About these Terms</h2>
        <p className="paragraph">
          We may modify these terms or any additional terms that apply
          to a Service to reflect changes to the law or changes to our Services.
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
