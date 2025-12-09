import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { api as axiosApi } from "@/lib/api"
import type { Blog } from "@/types"
import { Calendar, User, ArrowLeft, Share2, BookOpen } from "lucide-react"

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return

      try {
        const response = await axiosApi.get(`/blogs/${id}`)
        if (response.data.success) {
          setBlog(response.data.data)
          // Fetch related blogs
          fetchRelatedBlogs(response.data.data.category, id)
        } else {
          // Try to find in default blogs
          const defaultBlog = defaultBlogs.find(b => b.id === id)
          if (defaultBlog) {
            setBlog(defaultBlog)
            fetchRelatedBlogs(defaultBlog.category, id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error)
        // Try to find in default blogs
        const defaultBlog = defaultBlogs.find(b => b.id === id)
        if (defaultBlog) {
          setBlog(defaultBlog)
          fetchRelatedBlogs(defaultBlog.category, id)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  const fetchRelatedBlogs = async (category: string, currentId: string) => {
    try {
      const response = await axiosApi.get('/blogs')
      if (response.data.success) {
        const related = response.data.data
          .filter((b: Blog) => b.category === category && b.id !== currentId)
          .slice(0, 3)
        setRelatedBlogs(related.length > 0 ? related : defaultBlogs.filter(b => b.category === category && b.id !== currentId).slice(0, 3))
      } else {
        setRelatedBlogs(defaultBlogs.filter(b => b.category === category && b.id !== currentId).slice(0, 3))
      }
    } catch (error) {
      setRelatedBlogs(defaultBlogs.filter(b => b.category === category && b.id !== currentId).slice(0, 3))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.content.substring(0, 200),
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </section>

      {/* Blog Content */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {blog.category}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                </div>
              </div>
              <Separator />
            </div>

            {/* Blog Content */}
            <Card className="mb-8">
              <CardContent className="pt-8 pb-8">
                <div className="prose prose-lg max-w-none">
                  {blog.content.split('\n\n').map((section, sectionIndex) => {
                    // Check if section is a heading
                    if (section.trim().startsWith('## ')) {
                      return <h2 key={sectionIndex} className="text-2xl font-bold mt-8 mb-4 text-foreground">{section.replace('## ', '').trim()}</h2>
                    }
                    if (section.trim().startsWith('### ')) {
                      return <h3 key={sectionIndex} className="text-xl font-bold mt-6 mb-3 text-foreground">{section.replace('### ', '').trim()}</h3>
                    }
                    // Check if section contains list items
                    if (section.includes('\n- ') || section.includes('\n* ') || section.trim().match(/^\d+\.\s/)) {
                      const lines = section.split('\n')
                      return (
                        <ul key={sectionIndex} className="list-disc list-inside space-y-2 my-4 ml-4">
                          {lines.map((line, lineIndex) => {
                            const cleanLine = line.replace(/^[-*]\s/, '').replace(/^\d+\.\s/, '').trim()
                            if (cleanLine) {
                              return <li key={lineIndex} className="text-foreground leading-relaxed">{cleanLine}</li>
                            }
                            return null
                          })}
                        </ul>
                      )
                    }
                    // Regular paragraph
                    if (section.trim()) {
                      return <p key={sectionIndex} className="mb-6 leading-relaxed text-foreground text-base">{section.trim()}</p>
                    }
                    return null
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <div className="flex items-center justify-between py-6 border-t border-b mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Share this article</p>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Card
                      key={relatedBlog.id}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
                    >
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {relatedBlog.category}
                        </Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {relatedBlog.content.substring(0, 120)}...
                        </p>
                        <Link to={`/blog/${relatedBlog.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

// Default blogs (same as Blog.tsx)
const defaultBlogs: Blog[] = [
  {
    id: "1",
    title: "How to Write a Compelling Research Abstract",
    content: "Writing a compelling research abstract is crucial for getting your paper noticed. An abstract should be concise yet comprehensive, providing readers with a clear understanding of your research objectives, methodology, findings, and conclusions. In this comprehensive guide, we'll explore the key elements of an effective abstract and provide practical tips to help you craft one that stands out.\n\n## Key Elements of a Research Abstract\n\n1. **Background and Objectives**: Start by providing context for your research and clearly state your objectives.\n2. **Methodology**: Briefly describe your research methods and approach.\n3. **Results**: Highlight your key findings without going into excessive detail.\n4. **Conclusions**: Summarize the implications of your research.\n\n## Best Practices\n\n- Keep it concise (typically 150-300 words)\n- Use clear, jargon-free language\n- Focus on what's new and significant\n- Ensure it stands alone without the full paper",
    author: "Dr. Sarah Johnson",
    category: "Writing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Understanding Plagiarism Detection Tools: GPTZero vs Turnitin",
    content: "Plagiarism detection has become increasingly important in academic writing. With the rise of AI-generated content, tools like GPTZero and Turnitin have become essential for maintaining academic integrity.\n\n## GPTZero\n\nGPTZero is specifically designed to detect AI-generated content. It analyzes text patterns, sentence structure, and writing style to identify content created by AI tools like ChatGPT.\n\n## Turnitin\n\nTurnitin is a comprehensive plagiarism detection system that compares your work against a vast database of academic papers, websites, and publications.\n\n## Key Differences\n\n- GPTZero focuses on AI detection\n- Turnitin focuses on content similarity\n- Both are important for academic integrity\n\n## How to Pass Both\n\n- Write original content\n- Properly cite all sources\n- Use human editors for AI-generated content\n- Review your work before submission",
    author: "Prof. Michael Chen",
    category: "Research",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Top 10 Tips for Journal Submission Success",
    content: "Getting your research published in a reputable journal requires more than just good research. Here are the top 10 tips:\n\n1. **Choose the Right Journal**: Match your research scope and impact to the journal's focus.\n2. **Follow Guidelines**: Adhere strictly to the journal's formatting and submission guidelines.\n3. **Write a Strong Cover Letter**: Highlight the significance and novelty of your research.\n4. **Prepare Your Figures**: Ensure all figures are high-quality and properly formatted.\n5. **Get Pre-submission Review**: Have colleagues or experts review your work before submission.\n6. **Address Ethical Requirements**: Ensure all ethical approvals and declarations are in place.\n7. **Write Clear Responses**: When responding to reviewers, be respectful and thorough.\n8. **Be Patient**: The review process can take time.\n9. **Learn from Rejections**: Use feedback to improve your work.\n10. **Persist**: Don't give up after one rejection.",
    author: "Dr. Priya Sharma",
    category: "Publication",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Data Analysis Best Practices for Research Papers",
    content: "Proper data analysis is the backbone of any research paper. This comprehensive guide covers statistical methods, data visualization techniques, and best practices.\n\n## Statistical Methods\n\n- Choose appropriate tests for your data type\n- Ensure assumptions are met\n- Report effect sizes, not just p-values\n- Use multiple methods when appropriate\n\n## Data Visualization\n\n- Use clear, informative graphs\n- Choose appropriate chart types\n- Ensure accessibility (colorblind-friendly)\n- Include proper labels and legends\n\n## Best Practices\n\n- Document your analysis process\n- Use reproducible methods\n- Validate your results\n- Get statistical consultation when needed",
    author: "Dr. Rajesh Kumar",
    category: "Research",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "How to Structure Your Research Paper for Maximum Impact",
    content: "The structure of your research paper plays a crucial role in how it's received by readers and reviewers.\n\n## Standard Structure\n\n1. **Title**: Clear, descriptive, and keyword-rich\n2. **Abstract**: Concise summary of your research\n3. **Introduction**: Context, problem statement, objectives\n4. **Literature Review**: Current state of knowledge\n5. **Methodology**: How you conducted your research\n6. **Results**: Your findings\n7. **Discussion**: Interpretation and implications\n8. **Conclusion**: Summary and future directions\n\n## Tips for Maximum Impact\n\n- Start with a strong hook in the introduction\n- Use clear headings and subheadings\n- Maintain logical flow between sections\n- Use transitions effectively\n- End with a memorable conclusion",
    author: "Prof. Emily Watson",
    category: "Writing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Navigating the Peer Review Process: A Complete Guide",
    content: "The peer review process can be daunting for first-time authors. Here's a complete guide:\n\n## Understanding Peer Review\n\nPeer review is the evaluation of your work by experts in your field. It ensures quality and validity of research.\n\n## Types of Reviews\n\n- **Single-blind**: Reviewers know your identity, but you don't know theirs\n- **Double-blind**: Neither party knows the other's identity\n- **Open review**: Both parties know each other's identity\n\n## Responding to Reviews\n\n1. Read all comments carefully\n2. Address each point systematically\n3. Be respectful and professional\n4. Provide clear explanations for changes\n5. Thank reviewers for their input\n\n## Common Review Outcomes\n\n- **Accept**: Minor or no revisions needed\n- **Minor Revision**: Small changes required\n- **Major Revision**: Significant changes needed\n- **Reject**: Paper not suitable for publication",
    author: "Dr. James Anderson",
    category: "Publication",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
