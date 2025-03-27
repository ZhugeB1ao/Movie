const Footer = () => {
  return (
    <footer className="bg-[#141414] flex justify-center h-[25vh]">
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-sm text-white">
          &copy; {new Date().getFullYear()} Movie Mania
        </p>
      </div>
    </footer>
  );
};

export default Footer;
