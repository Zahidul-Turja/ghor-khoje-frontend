function Footer() {
  return (
    <footer className="w-full bg-gray-800 py-4 text-center text-gray-100">
      <div className="flex items-center justify-between gap-4 px-64 py-12 text-left">
        <h1 className="text-2xl font-extrabold uppercase text-primary">
          Ghor Khoje
        </h1>

        <div>
          <h2 className="mb-2 text-lg font-bold">Services</h2>
          <ul>
            <li>Buy</li>
            <li>Rent</li>
            <li>Sell</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold">Navigation</h2>
          <ul>
            <li>Places</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm font-light">
        Copyright &copy; 2023 <span className="font-bold">Ghor Khoje</span>
      </p>
    </footer>
  );
}

export default Footer;
