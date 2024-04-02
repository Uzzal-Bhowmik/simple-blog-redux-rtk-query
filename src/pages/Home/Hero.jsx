import owner from "../../assets/owner.jpg";

const Hero = () => {
  return (
    <div className="mx-auto mb-10 w-1/2 text-center">
      <img
        src={owner}
        alt="Creator of this blog site"
        className="mx-auto block h-64 w-64 rounded-full object-fill"
      />
      <h1 className="mb-6 mt-8 text-3xl font-normal text-gray-700">
        WELCOME TO MY BLOG
      </h1>
      <p className="text-lg text-gray-600">
        My name is Uzzal Bhowmik. I am a writer, I like to travel and I love to
        photograph beautiful nature places and happy peoples.{" "}
      </p>
    </div>
  );
};

export default Hero;
