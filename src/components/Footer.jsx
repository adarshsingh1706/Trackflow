'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
       
        <div className="mb-12">
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Stay informed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-4">
                    Subscribe for product updates and insights.
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                    />
                    <Button variant="outline" className="gap-1 border-gray-700 hover:bg-gray-800">
                      Subscribe <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div className="space-y-4">
            <h2 className="text-xl font-medium tracking-tight">
              TrackFlow <span className="text-gray-300">CRM</span>
            </h2>
            <p className="text-sm text-gray-400">
              Elevating your sales process with modern tools.
            </p>
          </div>

          {/* navigation columns */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-300">Product</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item) => (
                <a 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-300">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {['Documentation', 'Blog', 'Guides', 'API'].map((item) => (
                <a 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-300">Company</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <a 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} TrackFlow CRM. All rights reserved.
          </div>

          {/* social links */}
          <div className="flex gap-2">
            <TooltipProvider>
              {[
                { icon: <Github className="h-4 w-4" />, label: 'GitHub', href: 'https://github.com' },
                { icon: <Twitter className="h-4 w-4" />, label: 'Twitter', href: 'https://twitter.com' },
                { icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: <Mail className="h-4 w-4" />, label: 'Email', href: 'mailto:support@trackflow.com' },
              ].map(({ icon, label, href }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "text-gray-400 hover:text-white",
                        "hover:bg-gray-800/50",
                        "h-8 w-8"
                      )}
                      onClick={() => window.open(href, '_blank')}
                    >
                      {icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-900 border-gray-800 text-xs">
                    {label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
}