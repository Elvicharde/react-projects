import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white">
      <nav className="flex flex-wrap justify-between !px-4 !sm:px-10 h-16 items-center">
        <div className="flex h-6 gap-4 items-center font-bold text-lg">
          <img src="./assets/logo.svg" alt="Logo" className="w-5 h-5" />
          <span>Focus Flow</span>
        </div>
        <div className="flex gap-2 sm:gap-8">
          <div className="w-10 h-10 bg-[#F2F2F5] rounded-full flex items-center justify-center">
            <img src="./assets/icons/gear-inactive.svg" alt="Settings" />
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <Separator />
    </header>
  );
};

export default Header;
