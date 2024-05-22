import Link from "next/link";

const LinksNavigation = ({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) => {
  return (
    <Link className={` text-xs  ${className}`} href={href}>
      {text}
    </Link>
  );
};
export default LinksNavigation;
