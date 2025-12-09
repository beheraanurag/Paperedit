import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from ".././components/ui/carousel"
import { api as axiosApi } from "@/lib/api"
import type { FAQ } from "@/types"

const defaultFAQs: FAQ[] = [
  {
    id: "1",
    question: "What services do you offer?",
    answer: "We offer comprehensive research support services including research planning, data analysis, editorial support, publication support, academic presentation design, consultation services, and AI content rewriting with plagiarism removal. Our services cover everything from topic selection to journal submission, ensuring your research meets publication standards.",
    category: "General",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    question: "Who works on my project?",
    answer: "Your project is handled by PhD-qualified editors and subject matter experts with extensive experience in your field. We have over 500 editors across various disciplines including Medicine, Engineering, Social Sciences, and more. Each editor is matched to your specific subject area to ensure specialized expertise and quality work.",
    category: "General",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    question: "Do you support ghostwriting?",
    answer: "We provide academic writing support, editing, and research assistance services. Our team helps you develop, structure, and refine your research work while maintaining academic integrity. We focus on enhancing your existing work and providing guidance rather than complete ghostwriting services. All work is done in collaboration with you to ensure it reflects your research and ideas.",
    category: "Services",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    question: "I don't have data. Can you prepare data and write the paper for me?",
    answer: "We can assist with data analysis, statistical interpretation, and manuscript writing based on data you provide. However, we do not create or fabricate research data, as this would violate academic integrity and ethical research standards. We can help you design research methodologies, analyze existing data, and write papers based on legitimate research data. If you need help with data collection planning, we offer research design and methodology consultation services.",
    category: "Services",
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    question: "I have collected data but need help with analysis and writing. Can you help?",
    answer: "Absolutely! We specialize in data analysis and manuscript writing services. Our team can help you analyze your collected data using appropriate statistical methods (SPSS, R, Python), interpret the results, and write comprehensive research papers. We provide data cleaning, statistical analysis, result interpretation, and complete manuscript writing services based on your research data.",
    category: "Services",
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    question: "How long does it take to complete my project?",
    answer: "Turnaround time depends on the service type and project complexity. AI and plagiarism checks are completed in 24 hours. Standard editing services take 48-72 hours for papers up to 10 pages. Longer manuscripts and complex projects may take 3-5 days. We also offer rush services for urgent deadlines. You'll receive an estimated completion time when you submit your order.",
    category: "General",
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    question: "How is pricing determined for each service?",
    answer: "Pricing is based on several factors including document length, complexity of work required, urgency of deadline, and specific service type. Our base prices start from ₹500 for quick checks and ₹2,499 for comprehensive services. You'll receive a detailed quote after submitting your requirements. We offer transparent pricing with no hidden fees, and you can request a custom quote for complex projects.",
    category: "Pricing",
    createdAt: new Date().toISOString()
  },
  {
    id: "8",
    question: "Do I have to pay the full amount upfront?",
    answer: "No, you don't have to pay the full amount upfront. We offer flexible payment options. For most services, you can pay 50% upfront to secure your order, and the remaining 50% upon completion and delivery. For larger projects, we can discuss a payment plan that works for you. All payment terms are clearly communicated before you confirm your order.",
    category: "Payment",
    createdAt: new Date().toISOString()
  },
  {
    id: "9",
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment methods for your convenience including credit cards, debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and bank transfers. All payments are processed through secure, encrypted payment gateways. We also accept international payments via PayPal and bank transfers for our global clients. Payment receipts are automatically generated and sent to your email.",
    category: "Payment",
    createdAt: new Date().toISOString()
  },
  {
    id: "10",
    question: "Do you guarantee that my paper will pass plagiarism checks?",
    answer: "Yes, we guarantee that our rewritten content will pass GPTZero and Turnitin checks with 95%+ success rate. Our human editors ensure content is original and properly cited. If your paper doesn't pass, we'll revise it at no additional cost. We also provide a plagiarism report with every edited document so you can verify the originality before submission.",
    category: "Plagiarism",
    createdAt: new Date().toISOString()
  },
  {
    id: "11",
    question: "Is my research data kept confidential?",
    answer: "Absolutely. We maintain strict confidentiality and data security protocols. All your research materials are encrypted and stored securely. We never share your work with third parties, and all editors sign non-disclosure agreements. Your intellectual property is fully protected, and we comply with international data protection standards.",
    category: "Security",
    createdAt: new Date().toISOString()
  },
  {
    id: "12",
    question: "Can you help with journal submission?",
    answer: "Yes, we offer comprehensive journal submission support including journal matching based on your research scope, formatting according to journal guidelines, cover letter preparation, and response to reviewer comments. We help you find the best-fit journal for your research and ensure your manuscript meets all submission requirements.",
    category: "Publication",
    createdAt: new Date().toISOString()
  }
]

export default function Home() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs)
  const [loading, setLoading] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axiosApi.get('/faq')
        if (response.data.success && response.data.data && response.data.data.length > 0) {
          // Show all FAQs
          setFaqs(response.data.data)
        } else {
          // Use default FAQs if API returns empty
          setFaqs(defaultFAQs)
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error)
        // Keep default FAQs if API fails
        setFaqs(defaultFAQs)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    setCurrent(carouselApi.selectedScrollSnap() + 1)

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1)
    })
  }, [carouselApi])

  // Auto-play carousel
  useEffect(() => {
    if (!carouselApi) return

    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext()
      } else {
        carouselApi.scrollTo(0)
      }
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [carouselApi])

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {/* Slide 1: Main Hero */}
              <CarouselItem className="pl-0">
                <div className="text-center py-6 md:py-8 px-4 w-full">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="inline-block mb-3">
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1 text-sm font-semibold">
                        🎯 95%+ Success Rate
                      </Badge>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      Pass AI and Plagiarism Checks Confidently Everytime
                    </h1>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                      We rewrite AI-generated or copied content to pass GPTZero and Turnitin—humanised by real editors with 95%+ success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
                      <Link to="/services">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          See Sample
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-xs md:text-sm">
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1.5 hover:bg-yellow-400/30 transition-colors">
                        ✓ Rewrite + De-plag in 24 hrs
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1.5 hover:bg-yellow-400/30 transition-colors">
                        ✓ Human editors, no bot
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1.5 hover:bg-yellow-400/30 transition-colors">
                        ✓ Trusted by 5M+ researchers
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1.5 hover:bg-yellow-400/30 transition-colors">
                        ✓ Affordable checks start at ₹500
                      </Badge>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2: Abstract, Introduction and Manuscript */}
              <CarouselItem className="pl-0">
                <div className="text-center py-6 md:py-8 px-4 w-full">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="inline-block mb-3">
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1 text-sm font-semibold">
                        ✍️ Expert Writing Support
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      Abstract, Introduction and Manuscript Expert Help Anytime
                    </h2>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                      Struggling with writing flow, structure, or clarity? We help you write better without losing your voice expert support only.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
                      <Link to="/services">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          See Sample
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Complete guidance by subject</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Logical flow presentation</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">1:1 consult with PhD specialist</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Track changes & comment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3: Graphical Abstracts */}
              <CarouselItem className="pl-0">
                <div className="text-center py-6 md:py-8 px-4 w-full">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="inline-block mb-3">
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1 text-sm font-semibold">
                        🎨 Visual Excellence
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      Graphical Abstracts and Figures That Impress Editors
                    </h2>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                      Get scientific figures and graphical abstracts that impress editors designed for clarity, impact, and publication success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
                      <Link to="/services">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          See Sample
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Flat Infographic Design</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Enhanced Presentation Graphic</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Journal & Conference Ready</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">10K+ Visuals Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4: Research Paper Editing */}
              <CarouselItem className="pl-0">
                <div className="text-center py-6 md:py-8 px-4 w-full">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="inline-block mb-3">
                      <Badge variant="outline" className="bg-yellow-400/20 text-yellow-300 border-yellow-300/50 px-3 py-1 text-sm font-semibold">
                        📚 Publication Ready
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      Research Paper Editing & Journal Submission Support
                    </h2>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                      From editing to journal submission—get published faster in Scopus/SCI journals with support from PhD experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
                      <Link to="/services">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          See Sample
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Language + formatting by PhD</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Journal matching & submission</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Submission-ready in &lt;48 hr</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                        <span className="text-yellow-300 text-lg md:text-xl">✓</span>
                        <span className="text-base md:text-lg">Supported 20,000+ researchers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300" />
            <CarouselNext className="right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300" />

            {/* Custom Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index - 1)}
                  className={`h-2 rounded-full transition-all duration-300 ${current === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                    }`}
                  aria-label={`Go to slide ${index}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 overflow-hidden">
        <div className="w-full overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mr-8">
                Expert editing ensures clarity, precision, and success in global publications. Upto 50% OFF! 🎉 Book Now!
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mr-8" aria-hidden="true">
                Expert editing ensures clarity, precision, and success in global publications. Upto 50% OFF! 🎉 Book Now!
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mr-8" aria-hidden="true">
                Expert editing ensures clarity, precision, and success in global publications. Upto 50% OFF! 🎉 Book Now!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects We Handle Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Subjects We Handle</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              High-quality academic support across all major fields
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🧪", name: "STEM" },
              { icon: "🌍", name: "Social Science" },
              { icon: "🎨", name: "Arts & Humanities" },
              { icon: "📚", name: "Literature" },
              { icon: "💼", name: "Business & Management" },
              { icon: "⚖️", name: "Law" },
              { icon: "💰", name: "Finance" },
              { icon: "🎓", name: "Education" },
            ].map((subject, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-2">{subject.icon}</div>
                  <p className="font-semibold text-xs sm:text-sm">{subject.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Popular Service</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need from planning to publication fast, ethical, and university-compliant.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Research Planning */}
            <Card>
              <CardHeader>
                <CardTitle>Research Planning</CardTitle>
                <CardDescription>Start right, move faster</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Validate topic and objective</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Outline methodology clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Provide supervisor-ready brief</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹2,999
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Data Service */}
            <Card>
              <CardHeader>
                <CardTitle>Data Service</CardTitle>
                <CardDescription>Stats & ML that hold up</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Analyze in SPSS / R / Python</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Clean data with visual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Explain results clearly</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹4,999
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Editorial Support */}
            <Card>
              <CardHeader>
                <CardTitle>Editorial Support</CardTitle>
                <CardDescription>Polished. Compliant. Clear</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Edit language and structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Format to journal style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Suggest reviewer-style fixes</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹4,999
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Publication Support */}
            <Card>
              <CardHeader>
                <CardTitle>Publication Support</CardTitle>
                <CardDescription>Submit with confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Target suitable journal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Check ethics and policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Prepare letters and response</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹8,999
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Academic Presentation */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Presentation</CardTitle>
                <CardDescription>Impactful visuals that land</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Design slides and poster</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Build charts and infographic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Provide speaker note</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹3,999
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Support */}
            <Card>
              <CardHeader>
                <CardTitle>Consultation Support</CardTitle>
                <CardDescription>Expert guidance at every step</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">One-on-one project discussion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Clarify methodology doubt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Personalized research advice</span>
                  </li>
                </ul>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1.5 font-bold">
                    Start at ₹2,499
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to="/services" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Download Sample</Button>
                  </Link>
                  <Link to="/services" className="flex-1">
                    <Button size="sm" className="w-full">Explore →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Simple Process</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From submission to final delivery, we make it easy
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Submit Requirement",
                description: "Upload your draft, select services",
                icon: "📤"
              },
              {
                step: "2",
                title: "Expert Review",
                description: "PhD expert assesses & gives quote",
                icon: "👨‍🔬"
              },
              {
                step: "3",
                title: "Payment",
                description: "Matched with subject editor",
                icon: "💳"
              },
              {
                step: "4",
                title: "QC & Review",
                description: "Reviewed for quality, originality",
                icon: "✅"
              },
              {
                step: "5",
                title: "Final Delivery",
                description: "Get your polished document",
                icon: "📄"
              },
            ].map((process, index) => (
              <div key={index} className="relative">
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{process.icon}</div>
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                      {process.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.description}</p>
                  </CardContent>
                </Card>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-primary"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Researchers Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Researchers Trust ResearchEdit4U</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="text-5xl mb-4">🎓</div>
                <CardTitle className="text-xl">PhD-Qualified Editors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Native-English editors with PhDs in your field
                </p>
                <p className="text-sm text-muted-foreground">
                  Over 500 editors across Medicine, Engineering, Social Sciences
                </p>
                <Link to="/services" className="mt-4 inline-block">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="text-5xl mb-4">🏆</div>
                <CardTitle className="text-xl">SCI/Scopus Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  High acceptance rate in top-tier journals
                </p>
                <p className="text-sm text-muted-foreground">
                  Proven track record with Q1 and Q2 journal publications
                </p>
                <Link to="/services" className="mt-4 inline-block">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="text-5xl mb-4">⚡</div>
                <CardTitle className="text-xl">Fast Turnaround</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Quick delivery without compromising quality
                </p>
                <p className="text-sm text-muted-foreground">
                  24-48 hours for standard editing, rush options available
                </p>
                <Link to="/services" className="mt-4 inline-block">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Offers Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Offers That Save Time & Rejections</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Fast, focused services ideal before submission. Choose what you need
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>AI + Plagiarism Report</CardTitle>
                <CardDescription>Detect Turnitin + GPTZero flags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xl px-4 py-2 font-bold">
                    ₹500
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">24 hours delivery</p>
                </div>
                <Link to="/services">
                  <Button variant="outline" size="sm" className="w-full">See Sample</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all border-primary">
              <CardHeader>
                <Badge variant="default" className="mb-2">Popular</Badge>
                <CardTitle>Language Editing</CardTitle>
                <CardDescription>Grammar, clarity, and flow improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xl px-4 py-2 font-bold">
                    Start at ₹4,999
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">48 hours delivery</p>
                </div>
                <Link to="/services">
                  <Button size="sm" className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Journal Formatting</CardTitle>
                <CardDescription>Format according to journal guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xl px-4 py-2 font-bold">
                    Start at ₹2,999
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">24 hours delivery</p>
                </div>
                <Link to="/services">
                  <Button variant="outline" size="sm" className="w-full">See Sample</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Box Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Not sure which one to choose?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Talk to an Expert - Get personalized recommendations for your research needs
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100">
                  Book Free Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See what researchers say about our services
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                <CarouselItem>
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">👤</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">Dr. Rajesh Mohapatra</h4>
                            <Badge variant="secondary">Specialist Clinical Research, UAE</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Scientific Editing & Writing</p>
                          <p className="text-muted-foreground italic">
                            "Creating a compelling abstract was a challenge. Their editing process enhanced clarity,
                            reduced word count without losing meaning, and improved the overall impact. The paper was
                            accepted in a Q1 journal within 2 months of submission."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">👤</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">Prof. Sarah Johnson</h4>
                            <Badge variant="secondary">Engineering Researcher, Australia</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Data Analysis & Manuscript Editing</p>
                          <p className="text-muted-foreground italic">
                            "Their statistical analysis service was exceptional. They helped me understand complex
                            results and presented them clearly. The manuscript editing was thorough, and the
                            track changes made it easy to see all improvements."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">👤</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">Dr. Priya Sharma</h4>
                            <Badge variant="secondary">Social Science Researcher, India</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Research Planning & Proposal Support</p>
                          <p className="text-muted-foreground italic">
                            "The research planning service helped me structure my PhD proposal perfectly. Their
                            expert guidance on methodology and research design was invaluable. I received my
                            supervisor's approval on the first submission."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our research support services
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading FAQs...</p>
              </div>
            ) : faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border rounded-lg px-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No FAQs available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            A Simple Process with Powerful Result
          </h2>
          <Link to="/register">
            <Button size="lg" className="bg-blue-900 text-white hover:bg-blue-800">
              Get Started in 2 Minute
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
