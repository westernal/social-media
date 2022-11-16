import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          location.reload();
        }}
      >
        westernal
      </a>
      <Link href={"/post/new"} id="add-btn">
        <Image
          src={"/Images/add.svg"}
          width={25}
          height={25}
          alt="add button"
        />
      </Link>
    </header>
  );
};

export default Header;
