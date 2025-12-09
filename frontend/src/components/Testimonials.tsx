import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "PhD Student, Molecular Biology",
      institution: "Stanford University",
      content: "PaperEdit transformed my research paper. Their editors not only corrected grammatical errors but also enhanced the clarity and flow of my arguments. My paper was accepted in Nature Biotechnology on the first submission!",
      rating: 5
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Research Scientist",
      institution: "MIT",
      content: "The graphical abstract service exceeded my expectations. They captured the essence of our complex research in a visually stunning format that perfectly matched journal requirements.",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Postdoctoral Fellow",
      institution: "Oxford University",
      content: "Their journal submission support was invaluable. The team guided us through the entire process, from selecting the right journal to formatting our manuscript according to specific guidelines.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Researchers Worldwide</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from academics who have elevated their research with our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.institution}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;