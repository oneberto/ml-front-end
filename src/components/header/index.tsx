import Link from "next/link";
import { IconSearch } from "../icons/search";
import { IconCart } from "../icons/cart";

const Header = () => {
  return (
    <header data-testid="header" className="w-full bg-mercado-livre pt-2 pb-3 ">
      <div className="container flex items-center gap-4 xl:gap-7">
        <img
          src="/images/logo-small.png"
          alt="Mercado Livre"
          width={44}
          height={32}
          className="block xl:hidden"
        />

        <img
          src="/images/logo.webp"
          alt="Mercado Livre"
          className="hidden xl:block"
          width={134}
          height={34}
        />

        <form className="flex bg-white shadow rounded-xs flex-1 h-[40px] border border-transparent focus-within:border-[#3483fa]">
          <input
            name="search"
            type="text"
            className="flex-1 h-full outline-0 px-3.5"
          />
          <button
            type="submit"
            className="px-2 cursor-pointer border-l border-gray-200 my-2"
          >
            <IconSearch width={20} height={20} className="text-gray-400" />
          </button>
        </form>

        <nav className="flex gap-5 text-sm text-black/90">
          <Link href="/" className="hidden xl:block">
            Crie a sua conta
          </Link>
          <Link href="/" className="hidden xl:block">
            Entre
          </Link>
          <Link href="/" className="hidden xl:block">
            Compras
          </Link>
          <Link href="/">
            <IconCart width={20} height={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
