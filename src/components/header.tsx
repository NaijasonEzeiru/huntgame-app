const Header = () => {
  return (
    <header
      id="head"
      className="flex h-20 justify-between bg-primaryBg text-white items-center px-9 lg:px-[186px] relative z-40"
    >
      <a
        href="https://huntgameshow.com"
        className="flex gap-2 items-center text-lg font-bold"
      >
        <img
          src="/huntlogo.png"
          alt="hunt game logo"
          className="w-11 h-10 lg:w-14 lg:h-12"
        />
        <p>Huntgame</p>
      </a>
    </header>
  );
};

export default Header;
