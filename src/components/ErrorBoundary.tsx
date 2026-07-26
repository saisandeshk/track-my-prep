import { Component, type ErrorInfo, type PropsWithChildren } from "react";

interface ErrorBoundaryState {
  failed: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Track My Prep render failure", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="grid min-h-screen place-items-center bg-paper p-6">
          <div className="surface max-w-lg p-7 text-center">
            <p className="eyebrow">Something went wrong</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">
              The learning map could not render.
            </h1>
            <p className="mt-3 text-sm leading-6 text-black/55">
              Your browser-local progress has not been deleted. Reload first; if the problem
              persists, export local data from a working session before clearing site storage.
            </p>
            <button
              type="button"
              className="button-primary mt-5"
              onClick={() => window.location.reload()}
            >
              Reload application
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
