const TitleApp = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h1 className={`${className} text-7xl`}>{title}</h1>;
};
export default TitleApp;
