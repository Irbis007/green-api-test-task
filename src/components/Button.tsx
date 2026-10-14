type Props = {
  title: string;
  onClick?: () => void;
};

export const Button = ({ title, onClick }: Props) => {
  return (
    <button
      className="h-10 p-2 px-4 rounded-lg bg-primary hover:bg-primary-hover transition-colors cursor-pointer text-white text-sm"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
