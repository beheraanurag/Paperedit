import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Elevate Your Research with <span className="text-primary">Professional</span> Academic Support
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              From paper editing to journal submission, we provide end-to-end support for researchers, PhD scholars, and academic professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                View Services
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-primary/10 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Research Paper Editing</h3>
                    <p className="text-sm text-slate-600">Professional editing to enhance clarity and impact</p>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Plagiarism Check</h3>
                    <p className="text-sm text-slate-600">AI detection and correction</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Journal Submission</h3>
                    <p className="text-sm text-slate-600">Expert guidance for acceptance</p>
                  </div>
                  <div className="col-span-2 bg-primary/10 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Thesis Support</h3>
                    <p className="text-sm text-slate-600">Complete assistance from concept to completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;