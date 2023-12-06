import "@/styles/common-page.css"
import SimpleButton from "@/components/ui/simpleButton"

export default function IndexPage() {
  return (
    <main className="main-section">
      <SimpleButton />
      <div className="content-box">
        <h1 className="title mt-0">Legal Disclosures</h1>
        <p className="text text-[rgba(42, 48, 51, 1)]">
          Effective Date: May 16th, 2023
        </p>
        <h2 className="heading">General Information</h2>
        <p className="paragraph">
          This website and the SocialTrader mobile application (collectively,
          the &quot;Services&quot;) are provided by SocialTrader.AI, a Delaware
          C corporation operating out of California. By using the Services, you
          agree to these Important Legal Disclosures and our Terms of Use and
          Privacy Policy.
        </p>
        <h2 className="heading">Investment Risks</h2>
        <p className="paragraph">
          All investments involve risk, including possible loss of principal.
          Past performance does not guarantee future results or returns. While
          diversification may help spread risk it does not assure a profit or
          protect against loss in a down market.
        </p>
        <h2 className="heading">Third-Party Information</h2>
        <p className="paragraph">
          The Services may contain third-party data and information.
          SocialTrader.AI is not responsible for the accuracy of this.
        </p>
        <h2 className="heading">Brokerage Services</h2>
        <p className="paragraph">
          Securities brokerage services are provided byAlpaca Securities LLC, a
          registered broker-dealer and Member FINRA/SIPC. Alpaca Securities LLC
          is a separate entity from SocialTrader.AI.
        </p>
        <h2 className="heading">Cryptocurrency Risks</h2>
        <p className="paragraph">
          Cryptocurrency trading is offered through anaccount with Alpaca.
          Cryptocurrency trading can be extremely risky. Cryptocurrencies are
          not insured by the Federal Deposit Insurance Corporation (FDIC), are
          not deposits or other obligations of a bank and are not guaranteed by
          a bank. They are legal tender backed by a government.
        </p>
        <h2 className="heading">Securities Investor Protection</h2>
        <p className="paragraph">
          Your brokerage account is covered by the Securities Investor
          Protection Corporation (SIPC) for a maximum coverage of $500,000 (with
          a cash sublimit of $250,000) subject to certain conditions and
          limitations. Details can be found on the SIPC website (www.sipc.org).
        </p>
        <h2 className="heading">International Users</h2>
        <p className="paragraph">
          The Services are intended for United States residents only. They shall
          not be considered a solicitation to any person in any jurisdiction
          where such solicitation would be illegal.
        </p>
        <h2 className="heading">Changes to Disclosures</h2>
        <p className="paragraph">
          SocialTrader.AI reserves the right to modify these Important Legal
          Disclosures at any time. It&apos;s your responsibility to review them
          periodically for changes.
        </p>
      </div>
    </main>
  )
}
