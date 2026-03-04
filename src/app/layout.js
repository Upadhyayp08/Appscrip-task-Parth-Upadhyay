import "./globals.css";

export const metadata = {
  title: "Discover Our Products – Mettā Muse",
  description:
    "Explore our curated collection of premium fashion products at Mettā Muse. Shop clothing, accessories, and more for men, women, and kids with exclusive pricing.",
  keywords:
    "fashion, clothing, accessories, men, women, kids, premium fashion, metta muse",
  openGraph: {
    title: "Discover Our Products – Mettā Muse",
    description:
      "Explore our curated collection of premium fashion products at Mettā Muse.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products",
    description:
      "Explore our curated collection of premium fashion products at Mettā Muse.",
    url: "https://appscrip-task.netlify.app/",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://appscrip-task.netlify.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://appscrip-task.netlify.app/products",
        },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
