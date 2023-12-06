import "@/styles/common-page.css"
import SimpleButton from "@/components/ui/simpleButton"

export default function IndexPage() {
  return (
    <main className="main-section">
      <SimpleButton />
      <div className="content-box">
        <h1 className="title mt-0">FAQ</h1>
        <p className="text text-[rgba(42, 48, 51, 1)]">
          Effective Date: May 16th, 2023
        </p>
        <h2 className="heading">What is SocialTrader?</h2>
        <p className="paragraph">
          SocialTrader is an AI-driven platform that allows you to manage your
          finances, invest, and connect with a community of like-minded
          individuals.
        </p>
        <h2 className="heading">How does SocialTrader work?</h2>
        <p className="paragraph">
          SocialTrader uses sophisticated AI tools — RoboAnalyzer and RoboTrader
          — to analyze your financial data, understand your investment
          preferences, and develop a personalized investment strategy. It also
          allows you to manually trade and connect with a community of traders.
        </p>
        <h2 className="heading">How do I start using SocialTrader?</h2>
        <p className="paragraph">
          Getting started is easy.Download the SocialTrader app, create an
          account, and link your bank account. You can then set your investment
          preferences and start investing!
        </p>
        <h2 className="heading">
          How does SocialTrader ensure my data is safe?
        </h2>
        <p className="paragraph">
          We take data security seriously.We use secure protocols and encryption
          to ensure your data is safe. Our practices are compliant with GDPR and
          California privacy laws.
        </p>
        <h2 className="heading">How does RoboAnalyzer work?</h2>
        <p className="paragraph">
          RoboAnalyzer uses AI to analyze your financial data from your linked
          bank accounts. It takes into account your income, spending habits, and
          investment preferences to suggest
        </p>
        <h2 className="heading">How does RoboTrader work?</h2>
        <p className="paragraph">
          RoboTrader uses the strategy provided by RoboAnalyzer to execute
          trades. It constantly learns and improves its strategies based on
          market data.
        </p>
        <h2 className="heading">Can I manually trade with SocialTrader?</h2>
        <p className="paragraph">
          Yes, you can manually execute trades on SocialTrader.You can also
          engage with the community to share insights and strategies.
        </p>
        <h2 className="heading">How much does SocialTrader cost?</h2>
        <p className="paragraph">
          SocialTrader operates on a subscription basis.The cost of the
          subscription will depend on the features you choose to utilize.
        </p>
        <h2 className="heading">
          What is the benefit of using SocialTrader over traditional trading
          platforms?
        </h2>
        <p className="paragraph">
          SocialTrader offers the unique combination of automated and manual
          trading along with a strong community aspect. This blend of technology
          and human interaction can provide a more comprehensive and enjoyable
          trading experience.
        </p>
        <h2 className="heading">
          Does SocialTrader provide any learning resources?
        </h2>
        <p className="paragraph">
          Yes, SocialTrader offers a wealth of resources to help you learn more
          about investing and trading. You can access these resources on the
          «Markets» tab.
        </p>
      </div>
    </main>
  )
}
