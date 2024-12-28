import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="mt-56 border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Features</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Integrations</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Documentation</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Guides</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Help Center</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">About</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Blog</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Careers</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Privacy</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Terms</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {new Date().getFullYear()} Open Note. All rights reserved.
              </p>
            </div>
          </footer>
  )
}