import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { api as axiosApi } from "@/lib/api"
import type { Blog } from "@/types"
import { Calendar, User, Search, ArrowRight, Clock } from "lucide-react"

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosApi.get('/blogs')
        if (response.data.success && response.data.data && response.data.data.length > 0) {
          setBlogs(response.data.data)
        } else {
          // Use default blogs if API returns empty or no data
          setBlogs(defaultBlogs)
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        // Set default blogs if API fails
        setBlogs(defaultBlogs)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Get category from URL if present
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const categories = ["all", "Research", "Writing", "Publication", "Tips", "Academic"]

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || blog.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Blog</h1>
            <p className="text-xl md:text-2xl opacity-95 mb-8">
              Insights, tips, and guides to help you succeed in your research journey
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No blogs found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {selectedCategory === "all" ? "All Articles" : `${selectedCategory} Articles`}
                </h2>
                <p className="text-muted-foreground">
                  {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary overflow-hidden flex flex-col"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <div className="text-white text-6xl opacity-20">
                        {blog.category.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {blog.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {truncateContent(blog.content)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="text-xs">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">{Math.ceil(blog.content.length / 1000)} min</span>
                        </div>
                      </div>
                      <Link to={`/blog/${blog.id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// Default blogs if API fails
const defaultBlogs: Blog[] = [
  {
    id: "1",
    title: "How to Write a Compelling Research Abstract",
    content: "Writing a compelling research abstract is crucial for getting your paper noticed. An abstract should be concise yet comprehensive, providing readers with a clear understanding of your research objectives, methodology, findings, and conclusions. In this comprehensive guide, we'll explore the key elements of an effective abstract and provide practical tips to help you craft one that stands out.",
    author: "Dr. Sarah Johnson",
    category: "Writing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Understanding Plagiarism Detection Tools: GPTZero vs Turnitin",
    content: "Plagiarism detection has become increasingly important in academic writing. With the rise of AI-generated content, tools like GPTZero and Turnitin have become essential for maintaining academic integrity. This article compares these two popular tools, explaining how they work, their differences, and how to ensure your content passes their checks.",
    author: "Prof. Michael Chen",
    category: "Research",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Top 10 Tips for Journal Submission Success",
    content: "Getting your research published in a reputable journal requires more than just good research. From choosing the right journal to responding to reviewer comments, this guide covers the top 10 tips that can significantly increase your chances of publication success. Learn from experts who have successfully navigated the publication process.",
    author: "Dr. Priya Sharma",
    category: "Publication",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Data Analysis Best Practices for Research Papers",
    content: "Proper data analysis is the backbone of any research paper. This comprehensive guide covers statistical methods, data visualization techniques, and best practices for presenting your findings. Whether you're using SPSS, R, or Python, learn how to analyze your data effectively and present results that are both accurate and compelling.",
    author: "Dr. Rajesh Kumar",
    category: "Research",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "How to Structure Your Research Paper for Maximum Impact",
    content: "The structure of your research paper plays a crucial role in how it's received by readers and reviewers. This article provides a detailed guide on organizing your paper from introduction to conclusion, ensuring logical flow and maximum impact. Learn the secrets of effective academic writing structure.",
    author: "Prof. Emily Watson",
    category: "Writing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Navigating the Peer Review Process: A Complete Guide",
    content: "The peer review process can be daunting for first-time authors. This guide walks you through what to expect, how to respond to reviewer comments, and strategies for addressing feedback constructively. Learn how to turn reviewer suggestions into opportunities to strengthen your research.",
    author: "Dr. James Anderson",
    category: "Publication",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
