import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  BookOpen,
  Users,
  Lightbulb,
  Target,
  Zap,
  Smile,
  Award,
  Camera,
  Video,
  Share2,
  Clapperboard,
  Palette,
  BarChart3,
  Globe,
  Radio,
  CheckCircle,
  Cpu,
  FileText,
  ShieldCheck,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DevotionalSection } from "@/components/devotional-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 md:h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide mb-4">
                A Better Tomorrow Starts Today
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Ekklesia Elite Network and Evangelical Ministry:
              </h1>
              <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6">
                Repairer of the Breach
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nurturing the next Generation for Christ. Empowering children
                and young people to walk in purpose and become agents of change.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/programs">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg w-full aspect-video max-w-md">
                <Image
                  loading="eager"
                  src="/imgs/asset-1.jpeg"
                  alt="Team"
                  width={500}
                  height={500}
                  className="w-full h-full object-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-purple-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-purple-700 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-white" size={24} />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">
                To raise a generation of children and teenagers who know Christ,
                live by Godly values, fulfill their divine purpose, and
                ultimately make heaven.
              </p>
            </div>
            <div className="bg-purple-500 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-white" size={24} />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">
                Our mission is to nurture, mentor, and disciple children and
                teenagers through the teaching of God’s Word, moral instruction,
                prayer, and practical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            About the Ministry
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Repairer of the Breach is a faith-based outreach dedicated to
            developing confident and purposeful young people with strong
            Biblical foundations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Identity
                </h3>
                <p className="text-gray-600">
                  Helping young people discover their identity in Christ through
                  purposeful discipleship
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Values</h3>
                <p className="text-gray-600">
                  Instilling values, character development, and practical living
                  skills rooted in biblical foundations
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Practical Skills
                </h3>
                <p className="text-gray-600">
                  Equipping youth with leadership and critical decision-making
                  skills for effective everyday living
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Devotional Section */}
      <DevotionalSection />

      {/* Core Pillars */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Our Core Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                icon: Heart,
                title: "Dignity in Christ",
                desc: "Understanding your worth and purpose",
              },
              {
                icon: BookOpen,
                title: "Biblical Life",
                desc: "Building foundation on God's Word",
              },
              {
                icon: Zap,
                title: "Self-Worth",
                desc: "Building confidence and self-esteem",
              },
              {
                icon: Users,
                title: "Active Living",
                desc: "Engaging in meaningful service",
              },
              {
                icon: Smile,
                title: "Spiritual Growth",
                desc: "Deepening faith and spiritual maturity",
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} className="text-center">
                  <CardContent className="pt-8">
                    <Icon className="text-purple-600 mx-auto mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{pillar.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Founder
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start items-center">
              <div className="order-2 md:order-1">
                <div className="bg-linear-to-br from-red-400 to-amber-400 rounded-2xl overflow-hidden shadow-lg h-96">
                  <Image
                    loading="eager"
                    src="/imgs/founder-2.jpeg"
                    alt="Founder"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 mt-5 flex flex-col items-center md:items-start">
                <p className="text-purple-600 font-semibold uppercase text-sm mb-2">
                  Testimonial
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Mojisola Olawale
                </h3>
                <p className="text-gray-600 mb-6 md:leading-relaxed text-center md:text-start">
                  Hi, I am Mojisola olawale a certified emotional intelligence
                  coach I help you communicate with confidence and clarity.
                </p>
                <div className="flex gap-4 flex-col md:flex-row items-center justify-start">
                  <Link
                    href="#"
                    className="text-purple-600 hover:text-purple-700 bg-purple-200 rounded-full flex items-center justify-center w-10 h-10"
                  >
                    <Award size={25} />
                  </Link>
                  <p className="text-gray-900 font-semibold">Certified Coach</p>
                </div>
                <div className="mt-5">
                  <Link
                    href="https://chat.whatsapp.com/JZgbGPKGvyoAkGrxZjXi72?mode=gi_t"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="img"
                        aria-label="WhatsApp icon"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Reach out to me on WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling & Support Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-purple-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-purple-100">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4" /> Support & Guidance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Need Professional Counseling or Spiritual Guidance?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our certified coaches and spiritual mentors are available to
                support you through emotional intelligence coaching, personal
                guidance, and related professional services rooted in Biblical
                foundations.
              </p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg font-semibold rounded-xl">
                  Contact Us for Counseling
                </Button>
              </Link>
            </div>
            <div className="flex-1 hidden md:flex justify-center opacity-20">
              <Heart className="w-64 h-64 text-purple-600" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Ekklesia Elite Team Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ekklesia Elite Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our professional team offers a wide range of digital solutions and
              services to help your brand or business thrive in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Photography", icon: Camera },
              { name: "Videography", icon: Video },
              { name: "Social Media Management", icon: Share2 },
              { name: "Video Editing", icon: Clapperboard },
              { name: "Graphics Design", icon: Palette },
              { name: "Data Analysis", icon: BarChart3 },
              { name: "Web Design", icon: Globe },
              { name: "Live Streaming Service", icon: Radio },
              { name: "Google Verification Service", icon: CheckCircle },
              { name: "Blockchain", icon: Cpu },
              { name: "Business Name Registration", icon: FileText },
              { name: "Trade Marking", icon: ShieldCheck },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {service.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white p-6 md:px-12 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-900 font-bold text-xl">
                Ready to get started?
              </p>
              <Link href="tel:08027815383">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg font-semibold rounded-xl flex items-center gap-3">
                  <Phone size={20} />
                  08027815383
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Ad */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Join Our Prayer & Mentorship Group
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                <strong>Age range:</strong> 13 to 20 years
              </p>
              <p className="text-gray-700 mb-4">
                <strong>When:</strong> 1 hour every Saturday online, 5am
              </p>
              <p className="text-gray-700 mb-6">
                We teach our teenagers the how &amp; importance of prayer. We
                listen to their challenges and provide a suitable solution.
              </p>
              <Link
                href="https://chat.whatsapp.com/JZgbGPKGvyoAkGrxZjXi72?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="img"
                    aria-label="WhatsApp icon"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Join on WhatsApp
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              {/* smaller image container */}
              <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-sm h-64">
                <Image
                  loading="eager"
                  src="/imgs/program.jpeg"
                  alt="Prayer & Mentorship Program"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16 md:py-24 rounded-3xl mx-6 my-16 md:mx-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join our movement
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Be part of a community dedicated to raising the next generation of
            Christian leaders. Whether you are a parent, mentor, or volunteer,
            there is a place for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/programs">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 font-semibold">
                Learn More
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border-white text-white hover:bg-purple-700 px-8 py-3 font-semibold">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
