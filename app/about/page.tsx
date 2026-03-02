import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-[url(/imgs/asset-14.jpeg)] bg-position-[center_-15rem] bg-cover bg-no-repeat text-white py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-50 max-w-2xl mx-auto">
            Discover the heart and mission behind Repairer of the Breach
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Who We Are
          </h2>
          <div className="text-gray-600 text-lg leading-relaxed space-y-6">
            <p>
              Our ministry is a faith-based outreach dedicated to raising godly,
              confident, and purpose-driven children and teenagers. We believe
              that the foundation of a strong society begins with nurturing
              young hearts and minds with the truth of God’s Word, strong moral
              values, and practical life skills.
            </p>
            <p>
              The ministry focuses on children and teenagers, guiding them
              through the critical stages of growth where character, identity,
              and values are formed. In a world filled with confusion, peer
              pressure, negative media influence, and moral decline, we provide
              a safe, loving, and spiritually enriching environment where young
              people can grow.
            </p>
            <p>
              Through biblical teachings, mentorship, interactive lessons,
              counseling, and creative activities, we help children and
              teenagers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Discover their identity in Christ</li>
              <li>Build strong moral values and godly character</li>
              <li>Develop confidence, discipline, and self-worth</li>
              <li>Learn how to make wise decisions</li>
              <li>Understand respect, responsibility, and love for others</li>
              <li>Grow spiritually, emotionally, and socially</li>
            </ul>
            <p>
              Our ministry also addresses real-life challenges faced by children
              and teenagers today, such as peer pressure, low self-esteem,
              academic struggles, behavioral issues, family challenges, and
              spiritual confusion. We equip them with practical, Bible-based
              solutions that help them navigate life with wisdom and faith.
            </p>
            <p>
              We believe every child and teenager has a God-given purpose, and
              our mission is to nurture them into becoming responsible leaders,
              positive role models, and ambassadors of Christ in their homes,
              schools, and communities.
            </p>
            <p>
              By partnering with parents, guardians, schools, and the church,
              our ministry is committed to shaping the next generation for
              Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Our mission is to nurture, mentor, and disciple children and
                teenagers through the teaching of God’s Word, moral instruction,
                prayer, and practical.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To raise a generation of children and teenagers who know Christ,
                live by Godly values, fulfill their divine purpose, and
                ultimately make heaven.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-y border-gray-200">
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">Active Support</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">10+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Faith",
                description:
                  "Everything we do is rooted in faith in Jesus Christ and biblical principles.",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty, transparency, and alignment between our words and actions.",
              },
              {
                title: "Excellence",
                description:
                  "We strive for excellence in all our programs and interactions with our community.",
              },
              {
                title: "Compassion",
                description:
                  "We serve with genuine care and concern for the holistic well-being of every individual.",
              },
            ].map((value, idx) => (
              <Card key={idx}>
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
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
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Mojisola Olawale",
                role: "Founder & Executive Director",
                bio: "Visionary leader with 10+ years in youth development and spiritual formation",
                src: "/imgs/founder-1.jpeg",
              },
              {
                name: "Femi Olawale",
                role: "Programs Director & Community Outreach Manager",
                bio: `Passionate about creating transformative experiences for young leaders and 
                      dedicated to building meaningful relationships within our communities`,
                src: "/imgs/founder-3.jpeg",
              },
            ].map((member, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-8">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4">
                    <Image
                      loading="eager"
                      src={member.src}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
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
