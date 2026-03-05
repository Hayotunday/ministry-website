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
  Share2,
  Zap,
  Smile,
  Award,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 md:h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-4">
                A Better Tomorrow Starts Today
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Repairer of the <span className="text-blue-600">Breach</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nurturing the next Generation for Christ. Empowering children
                and young people to walk in purpose and become agents of change.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/programs">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
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
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-700 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-white" size={24} />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                To raise a generation of children and teenagers who know Christ,
                live by Godly values, fulfill their divine purpose, and
                ultimately make heaven.
              </p>
            </div>
            <div className="bg-blue-500 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-white" size={24} />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
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
            <Card className="border-l-4 border-l-blue-600">
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
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Values</h3>
                <p className="text-gray-600">
                  Instilling values, character development, and practical living
                  skills rooted in biblical foundations
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-600">
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
                    <Icon className="text-blue-600 mx-auto mb-4" size={32} />
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
                <p className="text-blue-600 font-semibold uppercase text-sm mb-2">
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
                    className="text-blue-600 hover:text-blue-700 bg-blue-200 rounded-full flex items-center justify-center w-10 h-10"
                  >
                    <Award size={25} />
                  </Link>
                  <p className="text-gray-900 font-semibold">Certified Coach</p>
                </div>
              </div>
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                  Join Group
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
      <section className="bg-blue-600 text-white py-16 md:py-24 rounded-3xl mx-6 my-16 md:mx-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join our movement
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Be part of a community dedicated to raising the next generation of
            Christian leaders. Whether you are a parent, mentor, or volunteer,
            there is a place for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/programs">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold">
                Learn More
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border-white text-white hover:bg-blue-700 px-8 py-3 font-semibold">
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
