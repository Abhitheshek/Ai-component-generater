"use client";



import React, { useState } from 'react';
import Editor  from 'react-simple-code-editor'
import GeminiResponse from "../lib/GeminiResponse";
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import prism from 'prismjs'
  ;
import 'prismjs/components/prism-jsx';

import 'prismjs/themes/prism-tomorrow.css'

const AIComponentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000); // Reset after 2 seconds
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  // Function to handle AI component generation
  const generateComponent = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the AI response function
      const rawOutput = await GeminiResponse(prompt);

      const response = rawOutput.replace(/```html|```/g, '').trim();

      // Set the generated code directly
      setGeneratedCode(response || '// No code generated');
      setPreviewMode(false);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle download of generated component
  const downloadComponent = () => {
    if (!generatedCode) return;

    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedComponent.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Preview component (uses Function constructor which is unsafe for production but works for demo)
  const PreviewComponent = () => {
    if (!generatedCode || error) return null;

    try {
      // Create an iframe to safely render the HTML content
      return (
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              </head>
              <body>
                <div class="h-full w-screen flex flex-col items-center justify-center p-5">
                  ${generatedCode}
                </div>
              </body>
            </html>
          `}
          className="w-screen h-full flex p-5 flex-col items-center justify-center"
          title="Component Preview"
        />
      );
    } catch (err) {
      return <div className="text-red-500">Error in preview: {err.message}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Modern abstract shapes */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500 opacity-10 blur-3xl"></div>
      </div>

      {previewMode ? (
        <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
          <div className="bg-zinc-900 text-white p-4 flex justify-between items-center border-b border-zinc-800">
            <h2 className="text-xl font-medium md:block hidden">Component Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode(false)}
                className="bg-blue-700 hover:bg-zinc-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Exit Preview
              </button>
              <button
                onClick={downloadComponent}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Download
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-full">
            <PreviewComponent />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <div className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-white">AI Component Generator</h1>
            <p className="text-zinc-100 mt-2">Generate custom components with AI assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-zinc-700">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="prompt">
                    Component Description
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the component you want to generate..."
                    className="w-full p-3 border border-zinc-600 rounded-md bg-zinc-700 h-40 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-white placeholder-zinc-400"
                  />
                </div>

                <button
                  onClick={generateComponent}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 focus:ring-4 focus:ring-emerald-300/30 text-white py-3 px-4 rounded-md font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : 'Generate Component'}
                </button>

                {error && (
                  <div className="mt-4 bg-red-900/30 border-l-4 border-red-500 p-4 text-red-300">
                    <p className="text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-zinc-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white md:block hidden  ">Generated Component</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewMode(true)}
                      disabled={!generatedCode}
                      className="bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300/30 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50 transition-all"
                    >
                      Full Preview
                    </button>
                    <button
                      onClick={downloadComponent}
                      disabled={!generatedCode}
                      className="bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300/30 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50 transition-all"
                    >
                      Download
                    </button>
                  </div>
                </div>

                {generatedCode ? (
                  <div className="rounded-md overflow-hidden border border-zinc-700">
                    <div className="bg-zinc-900 text-xs text-zinc-400 py-4 px-4 flex justify-between">
                    <button
                        onClick={copyToClipboard}
                        className=" bg-gradient-to-r from-emerald-600 to-sky-600 hover:bg-zinc-600 text-zinc-200 px-3 py-1 rounded-md text-sm font-medium transition-all flex items-center gap-2"
                      >
                        {copyStatus || (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                      <div className="flex space-x-2">
                        <div className="rounded-full w-3 h-3 bg-red-500"></div>
                        <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                        <div className="rounded-full w-3 h-3 bg-green-500"></div>
                      </div>
                    </div>

                    <div className="relative max-h-80 overflow-y-auto">
                      <Editor

                        value={generatedCode}
                        onValueChange={newCode => setGeneratedCode(newCode)}
                        className='editor min-h-80  scrollbar-hide'
                        
                        highlight={code => {
                          if (!Prism.languages.jsx) {
                            // Fallback to javascript if jsx is not available
                            return Prism.highlight(code, Prism.languages.javascript, 'javascript');
                          }
                          return Prism.highlight(code, Prism.languages.jsx, 'jsx');
                        }}

                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          background: '#1e1e1e',
                          color: '#fff',
                          fontSize: 16,
                          height: '100%',
                          width: '100%',
                          overflow: 'auto',
                          borderRadius: '8px',
                          outline: 'none',
                          border: 'none',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                          position: 'relative',
                          zIndex: 1,



                        }}
                      />
                      
                    </div>
                  </div>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center text-zinc-400 bg-zinc-900 rounded-md border-2 border-dashed border-zinc-700">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-10 w-10 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-lg font-medium text-zinc-300">Generating component...</p>
                        <p className="text-sm text-zinc-500 mt-2">This may take a few moments</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <p className="text-lg font-medium text-zinc-300">No component generated yet</p>
                        <p className="text-sm text-zinc-500 mt-2">Enter a description and click Generate</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIComponentGenerator;