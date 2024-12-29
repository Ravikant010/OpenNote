import React from 'react';

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="mt-20 border-t  h-40 flex flex-col">
      {/* <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Guides</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500 transition-colors">Security</a></li>
            </ul>
          </div>
        </div> */}
        <h1 className='dark:text-white text-black font-semibold font-sans self-center my-10'>Open Note</h1>
        <div className="flex justify-center">
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} Open Note. All rights reserved.
          </p>
        </div>
 
    </footer>
  );
}