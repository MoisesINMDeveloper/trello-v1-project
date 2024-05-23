import Link from "next/link";

const LinksUrl = ({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) => {
  return (
    <Link
      className={`w-[80vw] h-12 text-2xl hover:bg-black hover:text-white font-extrabold border-1 rounded-2xl flex items-center justify-center ${className}`}
      href={href}
    >
      {text}
    </Link>
  );
};
export default LinksUrl;
