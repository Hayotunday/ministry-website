import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Programs() {
  const programs = [
    {
      title: 'Mentorship & Discipleship',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our-program-page-fbY1WKO8EhDT5B5CRUlsGZHNZVm7gl.png',
      description: 'Focusing on biblical teachings and one-on-one spiritual guidance to build a firm, unshakeable foundation for your faith journey.',
      features: [
        '1-on-1 Personalized Coaching',
        'Deep Scripture Studies',
        'Spiritual Accountability Partnerships'
      ]
    },
    {
      title: 'Moral Instruction',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our-program-page-fbY1WKO8EhDT5B5CRUlsGZHNZVm7gl.png',
      description: 'Building godly character, integrity, and values-based leadership. We help individuals navigate complex ethical and moral landscapes with conviction.',
      features: [
        'Integrity Ethics Workshops',
        'Servant Leadership Training',
        'Character Development Seminars'
      ]
    },
    {
      title: 'Practical Life Skills',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our-program-page-fbY1WKO8EhDT5B5CRUlsGZHNZVm7gl.png',
      description: 'Developing emotional intelligence, financial stewardship, and critical decision-making tools for effective everyday living.',
      features: [
        'Emotional Intelligence Coaching',
        'Financial Stewardship & Budgeting',
        'Conflict Resolution Strategies'
      ]
    },
    {
      title: 'Creative Activities',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our-program-page-fbY1WKO8EhDT5B5CRUlsGZHNZVm7gl.png',
      description: 'Therapeutic expression, recreational fellowship, and community-building activities designed to refresh the soul and build bonds.',
      features: [
        'Creative Arts & Therapeutic Expression',
        'Community Outreach Fellowship',
        'Group Counseling & Support'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase text-sm mb-4">OUR MISSION</p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Holistic Development Rooted in{' '}
              <span className="text-blue-600">Biblical Foundations</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              We provide practical guidance and spiritual restoration for every area of life, rebuilding the foundations of character and community.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  <ul className="space-y-3">
                    {program.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Transforming Lives, One Foundation at a Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our approach is multi-faceted because life is multi-faceted. We don't just address symptoms, we address the root of the breach through faith-based restoration.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With a legacy of impact spanning over a decade, we've touched the lives of hundreds of young people and their families across multiple communities.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-5xl font-bold text-blue-600 mb-2">500+</p>
                  <p className="text-gray-700 font-medium">Lives Helped</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-blue-600 mb-2">24/7</p>
                  <p className="text-gray-700 font-medium">Active Support</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl h-96 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our-program-page-fbY1WKO8EhDT5B5CRUlsGZHNZVm7gl.png"
                alt="Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24 rounded-3xl mx-6 mb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Whether you're looking for mentorship or a way to give back, there's a place for you in our community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold">
                Apply for Mentorship
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-3 font-semibold">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
