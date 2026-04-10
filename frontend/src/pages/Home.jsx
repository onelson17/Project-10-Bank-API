import FeatureItem from '../components/FeatureItem'
import iconChat from '../assets/icon-chat.webp'
import iconMoney from '../assets/icon-money.webp'
import iconSecurity from '../assets/icon-security.webp'
import banner from '../assets/bank-tree.webp'

const features = [
  {
    id: 1,
    icon: iconChat,
    alt: 'Chat Icon',
    title: 'You are our #1 priority',
    description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
  },
  {
    id: 2,
    icon: iconMoney,
    alt: 'Money Icon',
    title: 'More savings means higher rates',
    description: 'The more you save with us, the higher your interest rate will be!',
  },
  {
    id: 3,
    icon: iconSecurity,
    alt: 'Security Icon',
    title: 'Security you can trust',
    description: 'We use top of the line encryption to make sure your data and money is always safe.',
  },
]

function Home() {
  return (
    <main>
      <div className="hero" style={{ backgroundImage: `url(${banner})` }}>
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => (
          <FeatureItem
            key={feature.id}
            icon={feature.icon}
            alt={feature.alt}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  )
}

export default Home