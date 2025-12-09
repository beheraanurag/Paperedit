import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Service {
  id: string
  name: string
  description: string
  category: string
  price: number
  features: string[]
  icon?: string
}

const servicesData: Service[] = [
  // Research Planning Services
  {
    id: "topic-selection",
    name: "Topic Selection",
    description: "Get expert guidance on choosing the right research topic with validated suggestions",
    category: "Research Planning",
    price: 2999,
    features: [
      "2–3 research topics with title suggestions & rationale",
      "Problem statement and key research questions",
      "1-page summary with initial citation"
    ]
  },
  {
    id: "proposal-support",
    name: "Proposal Support",
    description: "Comprehensive proposal writing assistance from introduction to methodology",
    category: "Research Planning",
    price: 4999,
    features: [
      "Drafting introduction, objectives, and methodology (up to 2 pages)",
      "Proper academic structure and citation guidance",
      "Expert Review of Proposal Outline Document"
    ]
  },
  {
    id: "research-design",
    name: "Research Design",
    description: "Professional research design framework tailored to your research scope",
    category: "Research Planning",
    price: 4999,
    features: [
      "Tool and method recommendations based on research scope",
      "Sampling techniques and variable mapping",
      "Conceptual framework outline"
    ]
  },
  {
    id: "ethics-feasibility",
    name: "Ethics & Feasibility",
    description: "Ensure your research meets ethical standards and is practically feasible",
    category: "Research Planning",
    price: 3999,
    features: [
      "Ethical considerations and viability analysis",
      "University ethics form review and suggestions",
      "Timeline and resource feasibility plan"
    ]
  },
  // Data Services
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Professional statistical analysis using SPSS, R, or Python",
    category: "Data Service",
    price: 4999,
    features: [
      "Analyze in SPSS / R / Python",
      "Clean data with visual",
      "Explain results clearly"
    ]
  },
  {
    id: "advanced-data-analysis",
    name: "Advanced Data Analysis",
    description: "Complex statistical modeling and machine learning analysis",
    category: "Data Service",
    price: 7999,
    features: [
      "Advanced statistical modeling",
      "Machine learning implementation",
      "Comprehensive result interpretation"
    ]
  },
  // Editorial Support
  {
    id: "language-editing",
    name: "Language Editing",
    description: "Professional language and grammar editing for academic papers",
    category: "Editorial Support",
    price: 4999,
    features: [
      "Edit language and structure",
      "Format to journal style",
      "Suggest reviewer-style fixes"
    ]
  },
  {
    id: "manuscript-editing",
    name: "Manuscript Editing",
    description: "Complete manuscript editing with track changes and comments",
    category: "Editorial Support",
    price: 6999,
    features: [
      "Full manuscript review and editing",
      "Track changes & comments",
      "Journal formatting compliance"
    ]
  },
  {
    id: "abstract-introduction",
    name: "Abstract & Introduction",
    description: "Expert help with abstract, introduction, and manuscript sections",
    category: "Editorial Support",
    price: 3999,
    features: [
      "Complete guidance by subject",
      "Logical flow presentation",
      "1:1 consult with PhD specialist"
    ]
  },
  // Publication Support
  {
    id: "journal-selection",
    name: "Journal Selection",
    description: "Find the perfect journal match for your research paper",
    category: "Publication Support",
    price: 2999,
    features: [
      "Target suitable journal",
      "Check ethics and policies",
      "Journal impact factor analysis"
    ]
  },
  {
    id: "publication-support",
    name: "Publication Support",
    description: "End-to-end support from journal matching to submission",
    category: "Publication Support",
    price: 8999,
    features: [
      "Target suitable journal",
      "Check ethics and policies",
      "Prepare letters and response"
    ]
  },
  {
    id: "journal-submission",
    name: "Journal Submission",
    description: "Complete journal submission support with all required documents",
    category: "Publication Support",
    price: 5999,
    features: [
      "Submission-ready in <48 hr",
      "Cover letter preparation",
      "Response to reviewers"
    ]
  },
  // Academic Presentation
  {
    id: "academic-presentation",
    name: "Academic Presentation",
    description: "Professional presentation design for conferences and seminars",
    category: "Academic Presentation",
    price: 3999,
    features: [
      "Design slides and poster",
      "Build charts and infographic",
      "Provide speaker notes"
    ]
  },
  {
    id: "graphical-abstracts",
    name: "Graphical Abstracts",
    description: "Scientific figures and graphical abstracts that impress editors",
    category: "Academic Presentation",
    price: 4999,
    features: [
      "Flat Infographic Design",
      "Enhanced Presentation Graphic",
      "Journal & Conference Ready"
    ]
  },
  // Consultation Support
  {
    id: "consultation-support",
    name: "Consultation Support",
    description: "One-on-one expert guidance at every step of your research",
    category: "Consultation Support",
    price: 2499,
    features: [
      "One-on-one project discussion",
      "Clarify methodology doubt",
      "Personalized research advice"
    ]
  },
  // AI & Plagiarism Services
  {
    id: "ai-rewrite",
    name: "AI Content Rewrite",
    description: "Rewrite AI-generated content to pass GPTZero and Turnitin checks",
    category: "AI & Plagiarism",
    price: 1999,
    features: [
      "Rewrite + De-plag in 24 hrs",
      "Human editors, no bot",
      "95%+ success rate"
    ]
  },
  {
    id: "plagiarism-check",
    name: "Plagiarism Check",
    description: "Comprehensive plagiarism checking and removal service",
    category: "AI & Plagiarism",
    price: 500,
    features: [
      "Multiple tool checking",
      "Detailed plagiarism report",
      "Affordable checks start at ₹500"
    ]
  }
]

const categories = [
  "All Services",
  "Research Planning",
  "Data Service",
  "Editorial Support",
  "Publication Support",
  "Academic Presentation",
  "Consultation Support",
  "AI & Plagiarism"
]

export default function Services() {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState("All Services")

  const filteredServices = selectedCategory === "All Services"
    ? servicesData
    : servicesData.filter(service => service.category === selectedCategory)

  const categoryCounts = categories.reduce((acc, category) => {
    if (category === "All Services") {
      acc[category] = servicesData.length
    } else {
      acc[category] = servicesData.filter(s => s.category === category).length
    }
    return acc
  }, {} as Record<string, number>)

  // Handle hash navigation from dropdown menu
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1) // Remove the #
      const categoryMap: Record<string, string> = {
        'research-planning': 'Research Planning',
        'data-service': 'Data Service',
        'editorial-support': 'Editorial Support',
        'publication-support': 'Publication Support',
        'academic-presentation': 'Academic Presentation',
      }

      if (categoryMap[hash]) {
        setSelectedCategory(categoryMap[hash])
        // Scroll to the category section after a brief delay
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
  }, [location.hash])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Research Support
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Expert guidance for researchers and scholars in India, UAE, Australia, UK & beyond.
              From topic selection to publication, we deliver end-to-end, university-compliant support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-4 py-1.5">
                ✓ 1000+ researchers supported globally
              </Badge>
              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-4 py-1.5">
                ✓ Trusted in 25+ countries
              </Badge>
              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-4 py-1.5">
                ✓ High journal acceptance success rate
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="relative"
              >
                {category}
                {categoryCounts[category] > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {categoryCounts[category]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {selectedCategory !== "All Services" && (
            <div className="mb-8 text-center" id={selectedCategory.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-3xl font-bold mb-2">{selectedCategory}</h2>
              <p className="text-muted-foreground">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}

          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No services found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">✓</span>
                          <span className="text-sm flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mb-4 pt-4 border-t">
                      <Badge variant="secondary" className="text-lg px-4 py-2 font-bold w-full justify-center">
                        Start at ₹{service.price.toLocaleString('en-IN')}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/register" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Download Sample
                        </Button>
                      </Link>
                      <Link to="/register" className="flex-1">
                        <Button size="sm" className="w-full">
                          Book Now →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We deliver quality, speed, and expertise that researchers trust worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🌍</div>
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Trusted by researchers in 25+ countries including India, UAE, Australia, UK, USA
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👥</div>
                <CardTitle>Expert Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  PhD specialists and experienced editors with subject expertise
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">✅</div>
                <CardTitle>High Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  High journal acceptance success rate with 1000+ researchers supported
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to advance your research journey?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Ready to start planning your research with us? Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100">
                Book a Free Consultation
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                Submit Your Research Idea
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
