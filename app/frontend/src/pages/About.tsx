import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About ResearchEdit4U
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              ResearchEdit4U was born from late-night hours in labs, libraries, and PhD cubicles.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Who We Are
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are a team of PhD scholars, researchers, and academic editors who understand the struggles
                of academic writing. Born from the frustration of overpriced and impersonal editing services,
                ResearchEdit4U was founded to bring fairness, transparency, and excellence to academic editing.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We've been where you are—burning the midnight oil, wrestling with deadlines, and navigating
                the complex world of academic publishing. Our mission is to support researchers at every stage
                of their journey, from initial research planning to final publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We've Achieved Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              What We've Achieved
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-blue-900">20,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Researchers supported across various disciplines and academic levels
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-blue-900">10,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Visuals and graphical abstracts delivered for publications
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-blue-900">95%+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Success rate in helping content pass AI and plagiarism checks
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Have No Face Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why We Have No Face
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
              <p className="text-lg text-gray-800 leading-relaxed italic">
                "We deliberately stand faceless, because we represent you — the invisible researcher,
                the unheard voice, the resilient scholar. No photos. No titles. Just shared struggle
                and shared triumph."
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Our focus is on your work, your voice, and your success. We believe that academic support
              should be about the research, not about showcasing credentials. Every researcher deserves
              quality support regardless of their institution, field, or background.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Expert Editors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Our team consists of PhD scholars and experienced academic editors who understand
                    the nuances of research writing across disciplines.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Affordable Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We believe quality academic support shouldn't break the bank. Our services start
                    at affordable rates, making professional editing accessible to all researchers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Fast Turnaround
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We understand deadlines. Our services are designed to deliver quality results
                    quickly, with many services available in 24-48 hours.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Confidential & Secure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Your research is confidential. We maintain strict privacy protocols and ensure
                    your work remains secure throughout the editing process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Track Changes & Comments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Learn from every edit. We provide detailed track changes and comments so you can
                    understand improvements and apply them to future work.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300">
                      ✓
                    </Badge>
                    Comprehensive Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    From research planning to publication support, we offer end-to-end services to
                    guide you through every stage of your academic journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Philosophy
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg mb-8">
              <p className="text-xl text-gray-800 leading-relaxed italic text-center">
                "Born from the frustration of overpriced and impersonal editing services, ResearchEdit4U
                was founded to bring fairness, transparency, and excellence to academic editing."
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300 mt-1">
                  ✓
                </Badge>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Empowering Researchers</h3>
                  <p className="text-gray-700">
                    We believe every researcher deserves access to quality academic support, regardless
                    of their background, institution, or financial situation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300 mt-1">
                  ✓
                </Badge>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dignity in the Academic Journey</h3>
                  <p className="text-gray-700">
                    Academic writing is challenging enough. We provide support that respects your work,
                    your voice, and your journey as a researcher.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300 mt-1">
                  ✓
                </Badge>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rebuilding Trust with the System</h3>
                  <p className="text-gray-700">
                    We're committed to ethical practices, transparency, and building trust in academic
                    support services through honest, quality work.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-900 border-blue-300 mt-1">
                  ✓
                </Badge>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Editing with Care</h3>
                  <p className="text-gray-700">
                    We understand that research is more than just papers—it's careers, mental health,
                    and futures. We edit with care, considering the human behind every manuscript.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Movement
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Whether you're polishing a paper, preparing your thesis defence, or just trying to survive
              the next deadline — we're here. Because your research deserves to be heard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
