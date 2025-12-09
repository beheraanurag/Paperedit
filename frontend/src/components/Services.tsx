import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Services: React.FC = () => {
  const serviceCategories = [
    {
      category: "Core Services",
      services: [
        {
          id: 1,
          title: 'Research Paper Editing',
          description: 'Professional editing services to enhance the clarity, coherence, and impact of your research papers.',
          features: [
            'Substantive editing',
            'Language polishing',
            'Plagiarism correction',
            'Formatting (APA, MLA, Chicago, IEEE)',
          ],
        },
        {
          id: 2,
          title: 'Graphical Abstract Creation',
          description: 'Custom vector illustrations designed to visually summarize your research findings.',
          features: [
            'Custom vector illustrations',
            'Journal-style graphical abstracts',
            'Multiple formats: PNG, PDF, SVG',
          ],
        },
        {
          id: 3,
          title: 'Journal Submission Support',
          description: 'Expert guidance through the journal submission process to increase your chances of acceptance.',
          features: [
            'Journal selection',
            'Manuscript formatting',
            'Submission assistance',
            'Cover letter drafting',
          ],
        },
      ]
    },
    {
      category: "Analysis & Checking",
      services: [
        {
          id: 4,
          title: 'AI & Plagiarism Check',
          description: 'Comprehensive AI detection and plagiarism checking with detailed reports.',
          features: [
            'AI detection percentage',
            'Plagiarism score',
            'Rewriting suggestions',
            'Downloadable report',
          ],
        },
      ]
    },
    {
      category: "Writing Support",
      services: [
        {
          id: 5,
          title: 'Thesis Writing Support',
          description: 'Assistance with all aspects of thesis writing from concept to completion.',
          features: [
            'Chapter assistance',
            'Literature review',
            'Methodology drafting',
            'Citations management',
          ],
        },
        {
          id: 6,
          title: 'Project Abstract (PhD/MSc/BTech)',
          description: 'Help crafting compelling abstracts for your academic projects.',
          features: [
            'Concept notes',
            'Abstract writing',
            'Research idea generation',
          ],
        },
      ]
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          Comprehensive academic support services tailored for researchers, PhD scholars, and academic professionals.
        </p>
      </div>

      <div className="space-y-12">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="mb-6">
              <Badge variant="secondary" className="text-lg py-1 px-3">
                {category.category}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <Card key={service.id} className="flex flex-col bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;