const Footer = () => (
  <footer className="fixed bottom-0 w-screen text-center bg-white border-t-2">
    <div className="flex items-center justify-center flex-1 p-4">
      <p className="text-gray-600">
        &copy; Copyright {new Date().getFullYear()} &mdash;{" "}
        {process.env.NEXT_PUBLIC_CORPORATE_NAME}{" "}
      </p>
    </div>
  </footer>
);

export default Footer;
