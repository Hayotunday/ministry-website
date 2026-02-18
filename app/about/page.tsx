import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the heart and mission behind Repairer of the Breach
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To cultivate holistic development through the teaching of Christ and grounded values. To empower young leaders to be agents of change in their sphere of influence through discipleship and training.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe every young person has the potential to become a leader who impacts their generation. Our approach is multi-faceted because life is multi-faceted. We don't just address symptoms, we address the root of the breach through faith-based restoration.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To raise a generation of children and young people rooted in the knowledge of Christ. Who will grow to become leaders with strong biblical foundations and character that impacts their generation positively.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We envision a world where young leaders are confident, purposeful, and committed to serving others. Leaders who understand their worth in Christ and use their influence to create positive change in their communities.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-y border-gray-200">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">Active Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">10+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Faith',
                description: 'Everything we do is rooted in faith in Jesus Christ and biblical principles.'
              },
              {
                title: 'Integrity',
                description: 'We operate with honesty, transparency, and alignment between our words and actions.'
              },
              {
                title: 'Excellence',
                description: 'We strive for excellence in all our programs and interactions with our community.'
              },
              {
                title: 'Compassion',
                description: 'We serve with genuine care and concern for the holistic well-being of every individual.'
              }
            ].map((value, idx) => (
              <Card key={idx}>
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mojisola Olawale',
                role: 'Founder & Executive Director',
                bio: 'Visionary leader with 10+ years in youth development and spiritual formation'
              },
              {
                name: 'Sarah Johnson',
                role: 'Programs Director',
                bio: 'Passionate about creating transformative experiences for young leaders'
              },
              {
                name: 'David Adeyemi',
                role: 'Community Outreach Manager',
                bio: 'Dedicated to building meaningful relationships within our communities'
              }
            ].map((member, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
