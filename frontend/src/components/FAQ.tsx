import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What journals do you support?",
      answer: "We support submissions to all major academic journals across disciplines including Nature, Science, IEEE, Elsevier, Springer, Wiley, and many more. Our editors are familiar with specific journal guidelines and formatting requirements."
    },
    {
      question: "How long does editing take?",
      answer: "Turnaround time depends on the length and complexity of your document. Standard editing takes 3-5 business days for documents up to 3000 words. Express service (24-48 hours) is available for an additional fee."
    },
    {
      question: "Is my manuscript safe and confidential?",
      answer: "Absolutely. We maintain strict confidentiality protocols. Your documents are encrypted, accessible only to assigned editors, and never shared with third parties. We can also sign NDAs upon request."
    },
    {
      question: "What plagiarism tools do you use?",
      answer: "We use industry-standard tools including Turnitin, iThenticate, and Copyscape to ensure originality. Our editors also manually review content to detect any potential issues that automated tools might miss."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 100% satisfaction guarantee. If you're not satisfied with our service, we'll revise it at no additional cost. Refunds are considered on a case-by-case basis for legitimate concerns."
    },
    {
      question: "Can you help with non-English manuscripts?",
      answer: "Yes, we specialize in translating and editing manuscripts from multiple languages into polished English. Our multilingual team includes native English speakers fluent in various languages."
    }
  ];

  return (
    <div className="container px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about our services
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden bg-white shadow-sm">
            <CardHeader 
              className="cursor-pointer flex flex-row items-center justify-between pb-4"
              onClick={() => toggleAccordion(index)}
            >
              <CardTitle className="text-lg font-medium">{faq.question}</CardTitle>
              <Button variant="ghost" size="sm" className="ml-2">
                {openIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            {openIndex === index && (
              <CardContent className="pt-0">
                <p className="text-slate-700">{faq.answer}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-white shadow-sm">
          <CardContent className="py-8">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-4">Our support team is ready to help you</p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;