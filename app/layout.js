import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";

import { poppins, raleway } from "@/app/_utils/fonts";

export const metadata = {
  title: {
    template: "%s | Ghor Khoje",
    default: "Welcome to Ghor Khoje",
  },
  description: "Ghor Khoje is a website for Renting apartments in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} relative min-h-screen min-w-full bg-gray-50 text-gray-800 antialiased`}
      >
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
