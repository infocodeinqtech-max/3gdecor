import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_SAFE_ERROR } from "../../utils/publicError";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Catches render crashes. Shows a safe message — never raw stack traces.
 */
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Keep details in console for developers only
    console.error("AppErrorBoundary:", error, info.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center rounded-2xl border border-[#E8DFD2] bg-white/90 p-8 shadow-sm">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#c48a1a]">
            Something went wrong
          </p>
          <h1 className="mt-3 text-2xl font-bold text-[#2A211C]">
            Unable to continue
          </h1>
          <p className="mt-3 text-sm text-[#6E655C] leading-relaxed">
            {PUBLIC_SAFE_ERROR}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-5 py-2.5 rounded-xl admin-btn-gold text-sm font-medium"
            >
              Try again
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl border border-[#E0D5C8] text-sm text-[#332C26] hover:bg-[#FAF7F2]"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
