import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-2xl border border-red-200 shadow-md space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-display font-bold text-charcoal-900">
              Something went wrong
            </h2>
            <p className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg overflow-auto max-h-40 text-left">
              {this.state.error?.message || String(this.state.error)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-maroon-900 text-white font-semibold text-sm hover:bg-maroon-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
