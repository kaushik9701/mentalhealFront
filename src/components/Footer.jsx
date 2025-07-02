import React from 'react'

function Footer() {
  return (
    <footer className="bg-white/10 border border-white/20 shadow-lg rounded-t-full mt-24  text-white">
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
      
      {/* Left side: App branding */}
      <div className="text-center md:text-left space-y-2">
        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Cosmic Journal
        </h3>
        <p className="text-sm text-purple-300">Reflect. Record. Rise.</p>
        <p className="text-xs text-purple-500">
          © {new Date().getFullYear()} Kaushik Reddy. All rights reserved.
        </p>
      </div>
  
      {/* Right side: Contact info */}
      <div className="text-sm text-purple-200 text-center md:text-right space-y-1">
        <p>📧 <span className="text-white">bandikaushikreddy@gmail.com</span></p>
        <p>📱 <span className="text-white">+1 (314) 617-4722</span></p>
        <a
          href="https://github.com/kaushik9701"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-pink-400 transition underline"
        >
          🔗 github.com/kaushik9701
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer
