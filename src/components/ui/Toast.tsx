export const Toast = ({ message }: { message: string }) =>
  message ? <div role="status" className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white px-4 py-3 rounded-lg shadow-lg z-30">{message}</div> : null;
