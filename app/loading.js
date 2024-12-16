export default function Loading() {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <img
          src="/linkload-unscreen.gif"
          alt="Loading"
          className="w-24 h-24 animate-spin"
        />
      </div>
    );
  }
  