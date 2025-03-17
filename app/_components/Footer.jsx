import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 py-4 text-center text-gray-100">
      <div className="flex items-start justify-between gap-4 px-64 py-12 text-left">
        <h1 className="my-auto text-2xl font-extrabold uppercase text-primary">
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
        <div>
          <h2 className="mb-2 text-lg font-bold">Contact us</h2>
          <ul>
            <li>Aftabnagar, Dhaka, Bangladesh</li>
            <li>+880 1748052301</li>
            <li>zahidulturja@gmail.com</li>
            <div className="mt-2 flex items-center gap-4">
              <a href="https://github.com/Zahidul-Turja" target="_blank">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/zahidul-turja/"
                target="_black"
              >
                <FaLinkedin />
              </a>
              <a href="https://zahidul-turja.vercel.app/" target="_blank">
                <FaGlobe />
              </a>
            </div>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm font-light">
        Copyright &copy; 2025 <span className="font-bold">Ghor Khoje</span>
      </p>
    </footer>
  );
}

export default Footer;
