import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Reduce Plagiarism in Research Papers",
      excerpt: "Learn effective strategies to ensure your research paper maintains originality and avoids unintentional plagiarism.",
      category: "Academic Integrity",
      date: "2025-11-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Scopus vs SCI Journals: Which Should You Choose?",
      excerpt: "A comprehensive comparison of Scopus and SCI indexed journals to help you select the right publication venue.",
      category: "Journal Selection",
      date: "2025-11-10",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "How to Write a Compelling Research Proposal",
      excerpt: "Essential elements and tips for crafting research proposals that capture reviewers' attention and secure funding.",
      category: "Research Skills",
      date: "2025-11-05",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Best Tools for Statistical Analysis in 2025",
      excerpt: "An overview of the top statistical analysis software and tools for researchers across different disciplines.",
      category: "Data Analysis",
      date: "2025-10-28",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Understanding AI Detection in Academic Writing",
      excerpt: "How modern AI detection tools work and strategies to ensure your writing passes scrutiny while maintaining authenticity.",
      category: "Technology",
      date: "2025-10-20",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Structuring Your Thesis: A Step-by-Step Guide",
      excerpt: "A practical approach to organizing your thesis chapters for maximum clarity and impact.",
      category: "Thesis Writing",
      date: "2025-10-15",
      readTime: "9 min read"
    }
  ];

  const categories = [
    "All Posts",
    "Academic Integrity",
    "Journal Selection",
    "Research Skills",
    "Data Analysis",
    "Technology",
    "Thesis Writing"
  ];

  return (
    <div className="container px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Research Insights & Academic Resources</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Expert advice, industry trends, and practical tips to advance your academic career
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category, index) => (
          <Badge 
            key={index} 
            variant={index === 0 ? "default" : "secondary"}
            className="cursor-pointer py-1 px-3 text-sm"
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="bg-slate-200 border-2 border-dashed rounded-t-lg w-full h-48" />
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-slate-500">{post.readTime}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-slate-700 mb-4">{post.excerpt}</p>
              <Button variant="outline">Read Article</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="px-8">Load More Articles</Button>
      </div>
    </div>
  );
};

export default Blog;