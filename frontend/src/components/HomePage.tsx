import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Hero from './Hero';
import Testimonials from './Testimonials';

const HomePage: React.FC = () => {
  const services = [
    {
      title: "Research Paper Editing",
      description: "Professional editing services for your research papers",
      features: ["Substantive editing", "Language polishing", "Plagiarism correction"]
    },
    {
      title: "Graphical Abstract Creation",
      description: "Custom illustrations for your research publications",
      features: ["Custom vector illustrations", "Journal-style abstracts", "Multiple formats"]
    },
    {
      title: "Journal Submission Support",
      description: "Guidance through the journal submission process",
      features: ["Journal selection", "Manuscript formatting", "Submission assistance"]
    }
  ];

  const trustIndicators = [
    {
      title: "Expert Editors",
      description: "Native English speakers with PhDs in various fields"
    },
    {
      title: "Confidential",
      description: "Your work is never shared with third parties"
    },
    {
      title: "On-Time Delivery",
      description: "Guaranteed delivery within agreed timelines"
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <Hero />
      
      <div className="mt-16 mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Services</h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Professional academic support services tailored to your research needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Testimonials />
      
      <div className="mt-16 text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose PaperEdit?</h2>
        <p className="text-slate-600 max-w-3xl mx-auto mb-12">
          Trusted by researchers worldwide for quality and reliability
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <Card key={index} className="text-center bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{indicator.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{indicator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;