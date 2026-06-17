const DashboardHeader = ({ user }) => {
  return (
    <div
      className="
        relative
        rounded-3xl
        overflow-hidden

        border
        border-gray-200
        dark:border-gray-700

        shadow-xl
        hover:shadow-2xl

        transition-all duration-300

        group
      "
    >
      <img
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        alt="Dashboard"
        className="
          w-full
          h-52 sm:h-60 md:h-72

          object-cover

          transition-transform duration-700
          group-hover:scale-105
        "
      />

      <div
        className="
          absolute inset-0

          bg-gradient-to-r
          from-black/80
          via-black/60
          to-black/40

          flex items-center

          px-6 sm:px-10
        "
      >
        <div>
          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl

              font-bold
              text-white

              tracking-wide
            "
          >
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p
            className="
              mt-3

              text-sm
              sm:text-base

              text-white/80
            "
          >
            Smart insights for your grocery planning
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;